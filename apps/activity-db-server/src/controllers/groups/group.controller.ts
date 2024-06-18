import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";

export const groupController = async (
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

    if (!isMember) {
      return res
        .status(401)
        .json({ message: "User is not a member of this group" });
    }

    const group = await db.group.findUnique({
      where: { ID: toNumber },
      include: { avatar: true },
    });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.json(group);
  } catch (e) {
    console.error("Error retrieving user group:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
