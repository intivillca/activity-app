import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { IMAGE_DIR } from "../config";

export const imageSizeController = (
  req: Request<{
    uniqueId: string;
    size: string;
  }>,
  res: Response
) => {
  const { uniqueId, size } = req.params;
  const filePath = path.join(IMAGE_DIR, uniqueId, `${size}.webp`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "Image not found." });
  }
};
