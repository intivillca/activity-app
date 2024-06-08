import { db } from "@activityapp/db";
import { Request, Response } from "express";
import { parseID } from "../../utils/parseID";
import { validateAndFilterData } from "../../utils/validateAndFilterData";
import { File } from "../../interfaces/file";
import { postFileSchema } from "../../schemas/postFileSchema";

export const fileCreateController = async (req: Request, res: Response) => {
  try {
    const user = res.locals.userID as number;
    const userIDToNumber = parseID(user);
    if (!userIDToNumber) {
      return res.status(400).json({ message: "ID must be a number" });
    }
    const validData = validateAndFilterData(req.body, postFileSchema) as File;

    if (!validData) {
      return res.status(400).json({ message: "Data is invalid" });
    }

    const file = await db.file.create({
      data: {
        checksum: validData.checksum,
        mime: validData.mimeType,
        size: validData.fileSize,
        src: validData.original,
        uploadedById: userIDToNumber,
      },
    });
    if (!file) {
      res.status(500).json({ message: "Failed to create file" });
    }
    return res.json({ fileId: file.ID });
  } catch (e) {
    console.error("Error patching activity", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
