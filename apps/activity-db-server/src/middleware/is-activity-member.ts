import { db } from "@activityapp/db";
import { Request, Response, NextFunction } from "express";
import { parseID } from "../utils/parseID";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export const isActivityMember = async (
  req: Request<{ activityID: string }>,
  res: Response,
  next: NextFunction
) => {
  const { activityID } = req.params;
  const user = res.locals.userID as number;

  const toNumber = parseID(activityID);
  const userIDToNumber = parseID(user);

  if (!toNumber || !userIDToNumber) {
    return res.status(400).json({ message: "ID must be a number" });
  }

  const cacheKey = `activityMember:${userIDToNumber}-${toNumber}`;

  const cachedResult = cache.get<{ groupRole: string }>(cacheKey);

  if (cachedResult) {
    res.locals.activityID = toNumber;
    res.locals.activityRole = cachedResult.groupRole;
    return next();
  }

  try {
    const isMember = await db.activityMember.findUnique({
      where: {
        userId_activityId: { activityId: toNumber, userId: userIDToNumber },
      },
      select: { groupRole: true },
    });

    if (!isMember) {
      return res.status(401).json({ message: "User is not in activity" });
    }

    cache.set(cacheKey, isMember);

    res.locals.activityID = toNumber;
    res.locals.activityRole = isMember.groupRole;
    return next();
  } catch (error) {
    console.error("Database query failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
