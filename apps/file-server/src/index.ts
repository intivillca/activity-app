import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const app = express();
const port = process.env.SERVICE_PORT ?? 3005;

// Define directories for storing files
const IMAGE_DIR = path.join(__dirname, "public/images");
const FILES_DIR = path.join(__dirname, "public/files");

// Ensure directories exist
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
if (!fs.existsSync(FILES_DIR)) fs.mkdirSync(FILES_DIR, { recursive: true });

// Increase the body size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Set up multer for file uploads
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
const upload = multer({ storage });

// Serve static files from the "public" directory
app.use("/files", express.static(path.join(__dirname, "public")));

// Function to process images: resize and convert to WebP
const processImage = async (
  filePath: string,
  folderPath: string
): Promise<{ name: string; path: string }[]> => {
  const sizes = [
    { name: "thumbnail", width: 50, height: 50 },
    { name: "small", width: 100, height: 100 },
    { name: "medium", width: 300, height: 300 },
    { name: "large", width: 800, height: 800 },
    { name: "extra-large", width: 1600, height: 1600 },
  ];

  try {
    const imagePaths = await Promise.all(
      sizes.map(async (size) => {
        const resizedImagePath = path.join(folderPath, `${size.name}.webp`);
        await sharp(filePath)
          .resize(size.width, size.height, { fit: "inside" })
          .webp({ quality: 80 }) // Convert to WebP with quality 80
          .toFile(resizedImagePath);

        return {
          name: size.name,
          path: resizedImagePath,
        };
      })
    );
    console.log("Image processing completed.");
    return imagePaths;
  } catch (error) {
    console.error("Error processing image:", error);
    return [];
  }
};

// Supported image MIME types
const supportedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
];

// File upload endpoint for multi-file upload
app.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ error: "No files uploaded." });
    }

    const uploadedFiles = req.files as Express.Multer.File[];

    // Process each uploaded file
    const responses = await Promise.all(
      uploadedFiles.map(async (file) => {
        const filePath: string = file.path;
        const fileType: string = file.mimetype;
        const fileSize: number = file.size;
        const fileName: string = file.originalname;
        const isImage: boolean = supportedImageTypes.includes(fileType);

        if (isImage) {
          // Create a unique subfolder for the image
          const uniqueId: string = path.basename(
            filePath,
            path.extname(filePath)
          );
          const imageSubfolder: string = path.join(IMAGE_DIR, uniqueId);
          if (!fs.existsSync(imageSubfolder)) fs.mkdirSync(imageSubfolder);

          // Convert the original image to WebP and move to its subfolder
          const originalFilePath: string = path.join(
            imageSubfolder,
            `original.webp`
          );
          await sharp(filePath)
            .webp({ quality: 100 }) // Convert the original image to WebP with quality 100
            .toFile(originalFilePath);

          // Delete the uploaded original file
          fs.unlinkSync(filePath);

          // Process the uploaded image into different sizes
          const imageVariants = await processImage(
            originalFilePath,
            imageSubfolder
          );

          const response = {
            type: "image",
            fileName,
            mimeType: fileType,
            fileSize,
            original: `/files/images/${uniqueId}/original.webp`,
            variants: imageVariants.map((variant) => ({
              name: variant.name,
              path: `/files/images/${uniqueId}/${variant.name}.webp`,
            })),
          };

          return response;
        } else {
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
        }
      })
    );

    res.json(responses);
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send({ error: "File upload failed." });
  }
});

// Serve images by unique ID and size
app.get("/images/:uniqueId/:size", (req, res) => {
  const { uniqueId, size } = req.params;
  const filePath = path.join(IMAGE_DIR, uniqueId, `${size}.webp`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "Image not found." });
  }
});

// Serve original image by unique ID
app.get("/images/:uniqueId/original", (req, res) => {
  const { uniqueId } = req.params;
  const filePath = path.join(IMAGE_DIR, uniqueId, "original.webp");

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "Image not found." });
  }
});

// Serve other files by filename
app.get("/files/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(FILES_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "File not found." });
  }
});

// Endpoint to check if server is running
app.get("/", (req, res) => {
  res.send("File server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
