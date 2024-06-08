import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { IMAGE_DIR } from "../config";

export const imageOriginalController = (
  req: Request<{ uniqueId: string }>,
  res: Response
) => {
  const { uniqueId } = req.params;
  const filePath = path.join(IMAGE_DIR, uniqueId, "original.webp");

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "Image not found." });
  }
};
