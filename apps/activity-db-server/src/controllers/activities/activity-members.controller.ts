import { Request, Response } from "express";
import { db } from "@activityapp/db";

export const activityMembersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const ID = res.locals.activityID;

    const activityMembers = await db.activityMember.findMany({
      where: {
        activityId: ID,
      },
      include: { user: { include: { avatar: true } } },
    });
    if (!activityMembers) {
      return res.status(404).json({ message: "ActivityMembers not found" });
    }
    return res.json({ activityMembers });
  } catch (e) {
    console.error("Error retrieving activity members:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
