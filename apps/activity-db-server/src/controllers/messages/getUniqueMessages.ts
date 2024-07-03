import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { bigIntToInt } from "../../utils/bigIntToInt";
import { getDistinctCount } from "./get-distincting-count";

export const getUniqueMesseges = async (req: Request, res: Response) => {
  try {
    const userID = res.locals.userID;
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string, 10)
      : undefined;
    const limit = 10;

    const count = await getDistinctCount(userID);

    const countToNum = bigIntToInt(count);
    const messages = await db.message.findMany({
      distinct: ["activityId", "groupId"],
      where: {
        OR: [
          { activity: { members: { some: { userId: userID } } } },
          { group: { users: { some: { userId: userID } } } },
        ],
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
      include: {
        group: { select: { ID: true, name: true, avatar: true } },
        activity: { select: { ID: true, name: true, avatar: true } },
      },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { ID: cursor } : undefined,
    });
    const nextCursor = messages.length > limit ? messages.pop()?.ID : null;
    const prevCursor = cursor;

    if (!messages) {
      return res.status(404).json({ message: "Failed to fetch messages" });
    }
    return res.json({
      data: messages,
      meta: { totalItems: countToNum, nextCursor, prevCursor },
    });
  } catch (e) {
    console.error("Error retrieving global messages:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
