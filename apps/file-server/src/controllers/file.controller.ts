import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { FILES_DIR } from "../config";

export const fileController = (
  req: Request<{ filename: string }>,
  res: Response
) => {
  const { filename } = req.params;
  const filePath = path.join(FILES_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "File not found." });
  }
};
