import path from "path";

export const port = process.env.SERVICE_PORT ?? 3005;

export const IMAGE_DIR = path.join(__dirname, "public/images");
export const FILES_DIR = path.join(__dirname, "public/files");

export const supportedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
];
