import { db } from "@activityapp/db";
import { Request, Response, NextFunction } from "express";
import { parseID } from "../utils/parseID";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export const isGroupMember = async (
  req: Request<{ groupID: string }>,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.userID as number;
  const groupID = parseID(req.params.groupID);
  const userIDToNumber = parseID(user);

  if (!userIDToNumber || !groupID) {
    return res.status(400).json({ message: "User ID must be a number" });
  }

  const cacheKey = `groupMember:${userIDToNumber}-${groupID}`;

  const cachedResult = cache.get<{ groupRole: string }>(cacheKey);

  if (cachedResult) {
    res.locals.groupID = groupID;
    res.locals.groupRole = cachedResult.groupRole;
    return next();
  }

  try {
    const isMember = await db.groupUser.findUnique({
      where: {
        userId_groupId: { groupId: groupID, userId: userIDToNumber },
      },
      select: { groupRole: true },
    });

    if (!isMember) {
      return res.status(401).json({ message: "User is not in group" });
    }

    cache.set(cacheKey, isMember);

    res.locals.groupID = groupID;
    res.locals.groupRole = isMember.groupRole;
    return next();
  } catch (error) {
    console.error("Database query failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
