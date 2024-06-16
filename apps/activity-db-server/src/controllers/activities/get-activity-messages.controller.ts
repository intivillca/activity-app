import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";

export const getActivitiyMessagesController = async (
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
    const isMember = await db.activityMember.findUnique({
      where: {
        userId_activityId: { activityId: toNumber, userId: userIDToNumber },
      },
    });

    if (!isMember) {
      return res
        .status(401)
        .json({ message: "User is not a member of this activity" });
    }

    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string, 10)
      : undefined;
    const limit = 10;

    const totalItems = await db.message.count({
      where: {
        activityId: toNumber,
      },
    });

    const messages = await db.message.findMany({
      where: {
        activityId: toNumber,
      },
      include: { attachments: true, sender: true },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { ID: cursor } : undefined,
      orderBy: {
        createdAt: "asc",
      },
    });

    const nextCursor = messages.length > limit ? messages.pop()?.ID : null;
    const prevCursor = cursor;
    if (!messages) {
      return res.status(404).json({ message: "Failed to fetch messages" });
    }
    return res.json({
      data: messages,
      meta: { totalItems, nextCursor, prevCursor },
    });
  } catch (e) {
    console.error("Error retrieving activity messages:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
