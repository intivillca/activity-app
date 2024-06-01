import express from "express";
import path from "path";
import multer from "multer";
import progress from "progress-stream";
import fs from "fs";
import { v4 as uuidv4 } from "uuid"; // Using uuid to generate unique IDs

const app = express();
const port = process.env.SERVICE_PORT ?? 3005;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
  },
  filename: (req, file, cb) => {
    // Generate a unique identifier for the file
    const uniqueFileName = uuidv4();
    // Extract file extension
    const fileExtension = path.extname(file.originalname);
    // Construct the new file name with the unique identifier and original extension
    const newFileName = `${uniqueFileName}${fileExtension}`;
    cb(null, newFileName);
  },
});
const upload = multer({ storage });

// Serve static files from the "public" directory
app.use("/files", express.static(path.join(__dirname, "public")));

// Endpoint to check if server is running
app.get("/", (req, res) => {
  res.send("File server is running!");
});

// File upload endpoint with progress tracking
app.post("/upload", (req, res) => {
  const fileSize = parseInt(req.headers["content-length"] || "0", 10);
  const progressStream = progress({
    length: fileSize,
    time: 100, // interval in ms
  });

  progressStream.on("progress", (progress) => {
    console.log(`Upload progress: ${Math.round(progress.percentage)}%`);
  });

  req.pipe(progressStream);
  progressStream.on("end", () => {
    console.log("Upload complete");
    res.send("File uploaded successfully!");
  });

  const uploadHandler = upload.single("file");
  uploadHandler(req, res, async (err) => {
    if (err) {
      return res.status(500).send("File upload failed");
    }

    // If the file already exists, generate a new unique filename
    if (req.file && fs.existsSync(req.file.path)) {
      const uniqueFileName = uuidv4();
      const newFilePath = path.join(
        __dirname,
        "public",
        `${uniqueFileName}${path.extname(req.file.originalname)}`
      );
      fs.renameSync(req.file.path, newFilePath);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
