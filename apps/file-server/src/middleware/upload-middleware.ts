import multer from "multer";
import path from "path";
import { IMAGE_DIR, FILES_DIR } from "../config";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image/");
    const uploadPath = isImage ? IMAGE_DIR : FILES_DIR;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = uuidv4();
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${uniqueFileName}${fileExtension}`;
    cb(null, newFileName);
  },
});
export const uploadMiddleware = multer({ storage });
