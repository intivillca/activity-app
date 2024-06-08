import path from "path";
import { IMAGE_DIR } from "../config";
import fs from "fs";
import sharp from "sharp";
import { processImage } from "../utils/processImage";
import { ImageVariants } from "../types/global";

export const handleImage = async (file: Express.Multer.File) => {
  const filePath: string = file.path;
  const fileSize: number = file.size;
  const fileName: string = file.originalname;
  const fileType: string = file.mimetype;

  // Create a unique subfolder for the image
  const uniqueId: string = path.basename(filePath, path.extname(filePath));
  const imageSubfolder: string = path.join(IMAGE_DIR, uniqueId);
  if (!fs.existsSync(imageSubfolder)) {
    fs.mkdirSync(imageSubfolder);
  }

  // Convert the original image to WebP and move to its subfolder
  const originalFilePath: string = path.join(imageSubfolder, `original.webp`);
  await sharp(filePath)
    .webp({ quality: 100 }) // Convert the original image to WebP with quality 100
    .toFile(originalFilePath);

  // Delete the uploaded original file
  fs.unlinkSync(filePath);

  // Process the uploaded image into different sizes
  const imageVariants = await processImage(originalFilePath, imageSubfolder);

  const response = {
    type: "image",
    fileName,
    mimeType: fileType,
    fileSize,
    original: `images/${uniqueId}`,
    variants: imageVariants.reduce((all, current) => {
      return {
        ...all,
        [current.name]: `images/${uniqueId}/${current.name}`,
      };
    }, {} as ImageVariants),
  };
  return response;
};
