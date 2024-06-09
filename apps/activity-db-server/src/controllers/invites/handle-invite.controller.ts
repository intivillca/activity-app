import { db } from "@activityapp/db";
import { Request, Response } from "express";

export const handleInviteController = async (
  req: Request<{ invite: string }>,
  res: Response
) => {
  const userID = res.locals.userID as number;

  const invite = await db.invite.findUnique({
    where: { ID: req.params.invite },
  });

  if (!invite) {
    return res.status(404).json({ message: "Invite was not foud" });
  }
  const activityMember = createActivityMember(userID, invite.activityID);
  if (!activityMember) {
    return res
      .status(500)
      .json({ message: "Failed to create activity member" });
  }
  let groupMember:
    | undefined
    | {
        ID: number;
        userId: number;
        groupId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        groupRole: "ADMIN" | "MEMBER" | "MODERATOR";
      } = undefined;
  if (invite.groupId) {
    const groupMemberf = await createGroupMember(userID, invite.groupId);
    if (!groupMemberf) {
      return res.status(500).json({ message: "Failed to create group member" });
    }
    groupMember = groupMemberf;
  }
  return res.json({ activityMember, groupMember });
};

const createActivityMember = async (userID: number, activityID: number) => {
  try {
    const activityMember = await db.activityMember.create({
      data: { activityId: activityID, userId: userID },
    });
    return activityMember;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const createGroupMember = async (userID: number, groupID: number) => {
  try {
    const groupMember = await db.groupUser.create({
      data: { userId: userID, groupId: groupID },
    });
    return groupMember;
  } catch (e) {
    console.log(e);
    return null;
  }
};
