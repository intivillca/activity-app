import { db } from "@activityapp/db";
import { Request, Response } from "express";

export const getActivitiyMessagesController = async (
  req: Request<{ activityID: string }>,
  res: Response
) => {
  try {
    const ID = res.locals.activityID;
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string, 10)
      : undefined;
    const limit = 10;

    const totalItems = await db.message.count({
      where: {
        activityId: ID,
      },
    });

    const messages = await db.message.findMany({
      where: {
        activityId: ID,
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
