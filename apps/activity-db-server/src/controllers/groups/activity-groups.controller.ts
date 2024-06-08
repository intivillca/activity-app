import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";

export const activityGroupsController = async (
  req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
    const { activityID } = req.params;
    const toNumber = parseID(activityID);
    if (!toNumber) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const groups = await db.group.findMany({
      where: { activityId: toNumber },
      include: { avatar: true },
    });
    return res.json({ groups });
  } catch (e) {
    console.error("Error retrieving activities:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
