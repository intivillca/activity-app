import express from "express";
import fs from "fs";
import { routes } from "./routes/routes";
import { IMAGE_DIR, FILES_DIR, port } from "./config";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: ".env" });

const app = express();
app.use(cors());
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
if (!fs.existsSync(FILES_DIR)) fs.mkdirSync(FILES_DIR, { recursive: true });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(routes);
// Endpoint to check if server is running
app.get("/", (req, res) => {
  res.send("File server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
