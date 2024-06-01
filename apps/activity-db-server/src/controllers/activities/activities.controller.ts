import { db } from "@activityapp/db";
import { Request, Response } from "express";

export const activityController = async (
  req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
    const activities = await db.activity.findMany({});
    if (!activities) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.json(activities);
  } catch (e) {
    console.error("Error retrieving activities:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
