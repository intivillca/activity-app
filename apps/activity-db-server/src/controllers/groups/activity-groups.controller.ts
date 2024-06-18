import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";

export const activityGroupsController = async (
  _req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
    const ID = res.locals.activityID;

    const groups = await db.group.findMany({
      where: { activityId: ID },
      include: { avatar: true },
    });
    return res.json({ groups });
  } catch (e) {
    console.error("Error retrieving activities:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
