import { db } from "@activityapp/db";
import { Request, Response, NextFunction } from "express";
import { parseID } from "../utils/parseID";

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
  const isMember = await db.activityMember.findUnique({
    where: {
      userId_activityId: { activityId: toNumber, userId: userIDToNumber },
    },
  });

  if (!isMember) {
    return res.status(401).json({ message: "User is not in activity" });
  }
  res.locals.activityID = toNumber;
  res.locals.activityRole = isMember.groupRole;
  return next();
};
