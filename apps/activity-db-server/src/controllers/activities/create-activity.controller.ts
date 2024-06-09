import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { PostActivity } from "../../interfaces/activity";
import { postActivitySchema } from "../../schemas/createActivitySchema";
import { validateAndFilterData } from "../../utils/validateAndFilterData";

export const createActivityController = async (req: Request, res: Response) => {
  try {
    const userID = res.locals.userID as number;
    const validData = validateAndFilterData(
      req.body,
      postActivitySchema
    ) as PostActivity;

    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }
    const newData = await createActivity(validData);
    if (!newData) {
      return res.status(500).json({ message: "Failed to create activity" });
    }
    const newUser = await createActivityUser(newData.ID, userID);
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }
    return res.json(newData);
  } catch (e) {
    console.error("Error patching activity", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createActivity = async (activity: PostActivity) => {
  try {
    const newData = await db.activity.create({
      data: {
        ...activity,
        tags: activity.tags ?? [],
      },
      include: { avatar: true },
    });
    return newData;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const createActivityUser = async (activityID: number, userID: number) => {
  try {
    const data = await db.activityMember.create({
      data: {
        activityId: activityID,
        userId: userID,
        groupRole: "ADMIN",
      },
    });
    return data;
  } catch (e) {
    return null;
  }
};
