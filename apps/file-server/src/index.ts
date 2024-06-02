import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const app = express();
const port = process.env.SERVICE_PORT ?? 3005;

// Increase the body size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
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
const processImage = async (filePath: string) => {
  const sizes = [
    { width: 50, height: 50 },
    { width: 100, height: 100 },
    { width: 300, height: 300 },
    { width: 800, height: 800 },
    { width: 1600, height: 1600 },
  ];

  const fileName = path.basename(filePath, path.extname(filePath));

  try {
    await Promise.all(
      sizes.map(async (size) => {
        const resizedImagePath = path.join(
          __dirname,
          "public",
          `${fileName}-${size.width}x${size.height}.webp`
        );
        await sharp(filePath)
          .resize(size.width, size.height, { fit: "inside" })
          .webp({ quality: 80 }) // Set quality to 80 (range 0-100, where 100 is the best quality)
          .toFile(resizedImagePath);
      })
    );
    console.log("Image processing completed.");
  } catch (error) {
    console.error("Error processing image:", error);
  }
};

// File upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = req.file.path;

    // Process the uploaded image
    await processImage(filePath);

    // If the file already exists, generate a new unique filename
    if (fs.existsSync(filePath)) {
      const uniqueFileName = uuidv4();
      const newFilePath = path.join(
        __dirname,
        "public",
        `${uniqueFileName}${path.extname(req.file.originalname)}`
      );
      fs.renameSync(filePath, newFilePath);
    }

    res.send("File uploaded and processed successfully!");
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("File upload failed.");
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
