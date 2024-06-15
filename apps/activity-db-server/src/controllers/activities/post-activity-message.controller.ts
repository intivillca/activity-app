import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { PostActivityMessage } from "../../interfaces/message";
import { postActivityMessageSchema } from "../../schemas/postActivityMessageSchema";
import { sendMessage } from "../../socket/socket-events";
import { parseID } from "../../utils/parseID";
import { validateAndFilterData } from "../../utils/validateAndFilterData";

export const postActivitiyMessageController = async (
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
    const validData = validateAndFilterData(
      { ...req.body, senderId: userIDToNumber, activityId: toNumber },
      postActivityMessageSchema
    ) as PostActivityMessage;
    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }
    const newData = await createMessage(validData, userIDToNumber);
    if (!newData) {
      return res.status(500).json({ message: "Failed to create message" });
    }
    sendMessage({
      roomId: newData.activityId as number,
      roomType: "activity",
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
    console.error("Error posting activity message", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createMessage = async (message: PostActivityMessage, userID: number) => {
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
