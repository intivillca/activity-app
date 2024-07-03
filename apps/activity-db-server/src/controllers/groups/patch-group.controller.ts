import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { patchGroupSchema } from "../../schemas/patchGroupSchema";
import { validateAndFilterData } from "../../utils/validateAndFilterData";

export const patchGroupController = async (req: Request, res: Response) => {
  try {
    const ID = res.locals.groupID;
    const userRole = res.locals.groupRole;
    if (userRole !== "ADMIN") {
      return res
        .status(401)
        .json({ message: "User must be admin to edit group" });
    }

    const validData = validateAndFilterData<typeof patchGroupSchema>(
      req.body,
      patchGroupSchema
    );

    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }

    const group = await db.group.update({
      where: { ID },
      data: validData,
    });

    if (!group) {
      return res.status(404).json({ message: "group not found" });
    }
    return res.json(group);
  } catch (e) {
    console.error("Error patching group", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
