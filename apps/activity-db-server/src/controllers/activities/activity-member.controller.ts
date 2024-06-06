import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";
import { db } from "@activityapp/db";

export const activityMemberController = async (
  req: Request<{ activityID: string; userID: string }>,
  res: Response
) => {
  try {
    const { activityID, userID } = req.params;
    const activityIDNum = parseID(activityID);
    const userIDnum = parseID(userID);
    if (!activityIDNum || !userIDnum) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const activityMember = await db.activityMember.findUnique({
      where: {
        userId_activityId: { activityId: activityIDNum, userId: userIDnum },
      },
    });
    if (!activityMember) {
      return res.status(404).json({ message: "ActivityMember not found" });
    }
    return res.json(activityMember);
  } catch (e) {
    console.error("Error retrieving activity member:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
