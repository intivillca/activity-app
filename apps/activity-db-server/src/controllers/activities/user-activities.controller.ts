import { db } from "@activityapp/db";
import { Request, Response } from "express";

export const getUserActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw Error("Missing userID");
    }
    const userActivites = await db.activity.findMany({
      where: { members: { some: { userId: parseInt(userId, 10) } } },
      include: { img: true },
    });
    return res.json({ activities: userActivites });
  } catch (e) {
    console.error("Error retrieving user activities:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
