import path from "path";
import { FILES_DIR } from "../config";
import fs from "fs";
import { calculateChecksum } from "../utils/checksum";

export const handleFile = async (file: Express.Multer.File) => {
  const filePath: string = file.path;
  const fileSize: number = file.size;
  const fileName: string = file.originalname;
  const fileType: string = file.mimetype;

  const fileBuffer = fs.readFileSync(filePath);
  const checksum = calculateChecksum(fileBuffer);
  // Move the non-image file to the "files" directory
  const newFilePath = path.join(FILES_DIR, path.basename(filePath));
  fs.renameSync(filePath, newFilePath);

  const response = {
    type: "file",
    fileName,
    mimeType: fileType,
    fileSize,
    original: `/files/${path.basename(newFilePath)}`,
    checksum,
  };
  return response;
};
