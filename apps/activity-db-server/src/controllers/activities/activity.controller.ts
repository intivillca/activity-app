import { db } from "@activityapp/db";
import { Request, Response } from "express";

export const activityController = async (_req: Request, res: Response) => {
  const ID = res.locals.activityID;
  try {
    const activity = await db.activity.findUnique({
      where: { ID },
      include: { avatar: true },
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
