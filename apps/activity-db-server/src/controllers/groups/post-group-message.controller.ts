import { db } from "@activityapp/db";
import { Request, Response } from "express";
import {
  PostMessage,
  postMessageSchema,
} from "../../schemas/postMessageSchema";
import { sendMessage } from "../../socket/socket-events";
import { validateAndFilterData } from "../../utils/validateAndFilterData";

export const postGroupMessageController = async (
  req: Request,
  res: Response
) => {
  try {
    const ID = res.locals.groupID;
    const userId = res.locals.userID;

    const validData = validateAndFilterData<typeof postMessageSchema>(
      { ...req.body, senderId: userId, GroupId: ID },
      postMessageSchema
    );
    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }
    const newData = await createMessage(validData, userId);
    if (!newData) {
      return res.status(500).json({ message: "Failed to create message" });
    }
    sendMessage({
      roomId: newData.groupId as number,
      roomType: "group",
      message: {
        sender: newData.sender,
        content: newData.content,
        attachments: newData.attachments.map((item) => ({
          ...item,
          mime: item.mimeType,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
          deletedAt: item.deletedAt ? item.deletedAt.toISOString() : null,
        })),
      },
    });
    res.json({ status: "ok" });
  } catch (e) {
    console.error("Error posting Group message", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createMessage = async (message: PostMessage, userID: number) => {
  try {
    const newData = await db.message.create({
      data: {
        ...message,
        attachments: {
          createMany: {
            data: message.attachments.map((item) => ({
              checksum: item.checksum,
              mimeType: item.mimeType,
              size: item.fileSize,
              src: item.original,
              uploadedById: userID,
              fileName: item.fileName,
              type: item.type === "image" ? "IMAGE" : "FILE",
            })),
          },
        },
      },
      include: { sender: true, attachments: true },
    });
    return newData;
  } catch (e) {
    console.log(e);
    return null;
  }
};
