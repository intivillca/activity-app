import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { CreateInvite } from "../../interfaces/invite";
import { createInviteSchema } from "../../schemas/createInviteSchema";
import { validateAndFilterData } from "../../utils/validateAndFilterData";
export const createInviteConttroler = async (req: Request, res: Response) => {
  try {
    const userID = res.locals.userID as number;
    const validData = validateAndFilterData(
      req.body,
      createInviteSchema
    ) as CreateInvite | null;
    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }
    const activityMember = await db.activityMember.findUnique({
      where: {
        userId_activityId: { userId: userID, activityId: validData.activityID },
      },
    });

    if (
      !activityMember ||
      (activityMember && activityMember.groupRole !== "ADMIN")
    ) {
      return res.status(400).json({
        message: "User is not authorized to create invites for this activity",
      });
    }

    let groupID = undefined;
    if (validData.groupID) {
      const groupMember = await db.groupUser.findUnique({
        where: {
          userId_groupId: { userId: userID, groupId: validData.groupID },
        },
      });
      if (!groupMember || (groupMember && groupMember.groupRole !== "ADMIN")) {
        return res.status(400).json({
          message: "User is not authorized to create invites for this group",
        });
      }
      groupID = validData.groupID;
    }
    const invite = await createInvite(userID, validData.activityID, groupID);
    if (!invite) {
      return res.status(500).json({ message: "Failed to create inviteI" });
    }

    return res.json(invite);
  } catch (e) {
    console.error("Error creating invite", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createInvite = async (
  userID: number,
  activityID: number,
  groupID?: number
) => {
  try {
    const invite = await db.invite.create({
      data: {
        activityID: activityID,
        createdByUserID: userID,
        groupId: groupID,
      },
    });
    return invite;
  } catch (e) {
    console.log(e);
    return null;
  }
};
