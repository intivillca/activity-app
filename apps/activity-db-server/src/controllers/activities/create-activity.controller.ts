import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { PostActivity } from "../../interfaces/activity";
import { postActivitySchema } from "../../schemas/createActivitySchema";
import { parseID } from "../../utils/parseID";
import { validateAndFilterData } from "../../utils/validateAndFilterData";
import lodash from "lodash";

export const createActivityController = async (req: Request, res: Response) => {
  try {
    const user = res.locals.userID as number;
    const userIDToNumber = parseID(user);
    if (!userIDToNumber) {
      return res.status(400).json({ message: "ID must be a number" });
    }
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
    const newUser = await createActivityUser(newData.ID, userIDToNumber);
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
