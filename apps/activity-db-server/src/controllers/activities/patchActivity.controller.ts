import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";
import { validateAndFilterData } from "../../utils/validateAndFilterData";
import { patchActivitySchema } from "../../schemas/patchActivitySchema";

export const patchActivityController = async (
  req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
    const ID = res.locals.activityID;
    const userRole = res.locals.activityRole;
    if (userRole !== "ADMIN") {
      return res
        .status(401)
        .json({ message: "User must be admin to edit activity" });
    }

    const validData = validateAndFilterData(req.body, patchActivitySchema);

    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }

    const activity = await db.activity.update({
      where: { ID },
      data: validData,
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.json(activity);
  } catch (e) {
    console.error("Error patching activity", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
