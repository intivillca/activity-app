import { Request, Response } from "express";
import { db } from "@activityapp/db";

export const groupMemberController = async (_req: Request, res: Response) => {
  try {
    const userID = res.locals.userID;
    const groupID = res.locals.groupID;
    const groupMember = await db.groupUser.findUnique({
      where: {
        userId_groupId: { groupId: groupID, userId: userID },
      },
    });
    if (!groupMember) {
      return res.status(404).json({ message: "GroupMember not found" });
    }
    return res.json(groupMember);
  } catch (e) {
    console.error("Error retrieving group member:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
