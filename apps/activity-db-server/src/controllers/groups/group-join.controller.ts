import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";

export const groupJoinController = async (
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

    const group = await db.group.findUnique({ where: { ID: toNumber } });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    if (group.type === "PRIVATE" || group.type === "LOCKED") {
      return res
        .status(403)
        .json({ message: "Cannot join private or locked groups" });
    }

    const addMember = await db.groupUser.upsert({
      create: { userId: user, groupId: toNumber },
      update: {},
      where: { userId_groupId: { groupId: toNumber, userId: user } },
    });

    if (!addMember) {
      return res.status(401).json({ message: "Can't join group" });
    }
    return res.json(addMember);
  } catch (e) {
    console.error("Error retrieving user group:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
