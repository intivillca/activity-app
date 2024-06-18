import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { PostGroup, postGroupSchema } from "../../schemas/postGroupSchema";
import { validateAndFilterData } from "../../utils/validateAndFilterData";

export const createGroupController = async (req: Request, res: Response) => {
  try {
    const userID = res.locals.userID as number;
    const validData = validateAndFilterData<typeof postGroupSchema>(
      req.body,
      postGroupSchema
    );

    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }
    const newData = await createGroup(validData);
    if (!newData) {
      return res.status(500).json({ message: "Failed to create Group" });
    }
    const newUser = await createGroupUser(newData.ID, userID);
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }
    return res.json(newData);
  } catch (e) {
    console.error("Error patching Group", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createGroup = async (group: PostGroup) => {
  try {
    const newData = await db.group.create({
      data: {
        ...group,
        tags: group.tags ?? [],
      },
      include: { avatar: true },
    });
    return newData;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const createGroupUser = async (groupID: number, userID: number) => {
  try {
    const data = await db.groupUser.create({
      data: {
        groupId: groupID,
        userId: userID,
        groupRole: "ADMIN",
      },
    });
    return data;
  } catch (e) {
    return null;
  }
};
