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
    const omitFileId = lodash.omit(validData, ["fileId"]);
    const newData = await db.activity.create({
      data: {
        ...omitFileId,
        tags: validData.tags ?? [],
        avatarId: validData.fileId,
      },
    });
    if (!newData) {
      return res.status(500).json({ message: "Failed to create new activity" });
    }
    const newMember = await db.activityMember.create({
      data: {
        activityId: newData.ID,
        userId: userIDToNumber,
        groupRole: "ADMIN",
      },
    });
    if (!newMember) {
      return res
        .status(500)
        .json({ message: "Failed to create new activity member" });
    }
    return res.json({ activity: newData });
  } catch (e) {
    console.error("Error patching activity", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
