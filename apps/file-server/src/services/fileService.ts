import path from "path";
import { FILES_DIR } from "../config";
import fs from "fs";

export const handleFile = async (file: Express.Multer.File) => {
  const filePath: string = file.path;
  const fileSize: number = file.size;
  const fileName: string = file.originalname;
  const fileType: string = file.mimetype;
  // Move the non-image file to the "files" directory
  const newFilePath = path.join(FILES_DIR, path.basename(filePath));
  fs.renameSync(filePath, newFilePath);

  const response = {
    type: "file",
    fileName,
    mimeType: fileType,
    fileSize,
    path: `/files/${path.basename(newFilePath)}`,
  };
  return response;
};
