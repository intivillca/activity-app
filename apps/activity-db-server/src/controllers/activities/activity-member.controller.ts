import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";
import { db } from "@activityapp/db";

export const activityMemberController = async (
  _req: Request<{ activityID: string; userID: string }>,
  res: Response
) => {
  try {
    const ID = res.locals.activityID;
    const userId = res.locals.userID;
    const activityMember = await db.activityMember.findUnique({
      where: {
        userId_activityId: { activityId: ID, userId: userId },
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
