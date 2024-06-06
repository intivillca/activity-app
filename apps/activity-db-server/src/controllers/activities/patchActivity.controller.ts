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
    const { activityID } = req.params;
    const user = res.locals.userID as number;
    const toNumber = parseID(activityID);
    const userIDToNumber = parseID(user);
    if (!toNumber || !userIDToNumber) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const member = await db.activityMember.findUnique({
      where: {
        userId_activityId: { activityId: toNumber, userId: userIDToNumber },
      },
    });

    console.log(member);

    if (!member || (member && member?.groupRole !== "ADMIN")) {
      return res
        .status(401)
        .json({ message: "User must be admin to edit activity" });
    }

    const validData = validateAndFilterData(req.body, patchActivitySchema);

    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }
    console.log(validData);

    const activity = await db.activity.update({
      where: { ID: toNumber },
      data: validData,
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
