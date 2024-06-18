import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";
import { db } from "@activityapp/db";

export const groupMembersController = async (
  req: Request<{ groupID: string }>,
  res: Response
) => {
  try {
    const { groupID } = req.params;
    const user = res.locals.userID as number;
    const toNumber = parseID(groupID);
    const userIDToNumber = parseID(user);
    if (!toNumber || !userIDToNumber) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const isMember = await db.groupUser.findUnique({
      where: {
        userId_groupId: { groupId: toNumber, userId: userIDToNumber },
      },
    });

    const groupMembers = await db.groupUser.findMany({
      where: {
        groupId: toNumber,
      },
      include: { user: { include: { avatar: true } } },
    });
    if (!groupMembers) {
      return res.status(404).json({ message: "groupMembers not found" });
    }
    return res.json({ groupMembers });
  } catch (e) {
    console.error("Error retrieving group members:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
