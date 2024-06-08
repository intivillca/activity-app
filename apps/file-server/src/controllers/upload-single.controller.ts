import { Request, Response } from "express";
import { supportedImageTypes } from "../config";
import { handleImage } from "../services/imageService";
import { handleFile } from "../services/fileService";

export const uploadSingleController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded." });
    }

    const fileType: string = req.file.mimetype;
    const isImage: boolean = supportedImageTypes.includes(fileType);

    if (isImage) {
      const response = await handleImage(req.file);
      return res.json(response);
    }

    const response = await handleFile(req.file);

    return res.json(response);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send({ error: "File upload failed." });
  }
};
