import { db } from "@activityapp/db";
import { Request, Response } from "express";

export const getActivityImagesController = async (
  req: Request,
  res: Response
) => {
  try {
    const ID = res.locals.activityID;
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string, 15)
      : undefined;
    const limit = 15;

    const totalItems = await db.file.count({
      where: {
        attachedTo: { activityId: ID },
        type: "IMAGE",
      },
    });

    const files = await db.file.findMany({
      where: {
        attachedTo: { activityId: ID },
        type: "IMAGE",
      },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { ID: cursor } : undefined,
      orderBy: {
        createdAt: "asc",
      },
    });

    const nextCursor = files.length > limit ? files.pop()?.ID : null;
    const prevCursor = cursor;
    if (!files) {
      return res
        .status(404)
        .json({ message: "Failed to fetch activity images" });
    }
    return res.json({
      data: files,
      meta: { totalItems, nextCursor, prevCursor },
    });
  } catch (e) {
    console.error("Error retrieving activity images:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
