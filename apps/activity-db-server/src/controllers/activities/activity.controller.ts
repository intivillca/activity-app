import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";

export const activityController = async (
  req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
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
      return res
        .status(401)
        .json({ message: "User is not a member of this activity" });
    }

    const activity = await db.activity.findUnique({
      where: { ID: toNumber },
      include: { avatar: true },
    });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.json(activity);
  } catch (e) {
    console.error("Error retrieving user activities:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
