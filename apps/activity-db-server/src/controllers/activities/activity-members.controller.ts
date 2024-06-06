import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";
import { db } from "@activityapp/db";

export const activityMembersController = async (
  req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
    const { activityID } = req.params;
    const activityIDNum = parseID(activityID);
    if (!activityIDNum) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const activityMembers = await db.activityMember.findMany({
      where: {
        activityId: activityIDNum,
      },
      include: { user: { include: { img: true } } },
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
