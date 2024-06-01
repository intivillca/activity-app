import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";

export const activityController = async (
  req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
    const { activityID } = req.params;
    const toNumber = parseID(activityID);
    if (!toNumber) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const activity = await db.activity.findUnique({
      where: { ID: toNumber },
      include: { img: true },
    });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.json(activity);
  } catch (e) {
    console.error("Error retrieving user activities:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
