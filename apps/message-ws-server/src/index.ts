import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { createServer } from "node:http";
import { authMiddleware } from "./middleware/auth.middleware";
import { publicKeyMiddleware } from "./middleware/public-key.middleware";
import { io } from "./server/io";
import { messageServer } from "./server/server";

configDotenv({ path: ".env" });

const port = process.env.SERVICE_PORT ?? 3000;
const app = express();
app.use(cors());

const server = createServer(app);

app.use(publicKeyMiddleware);
app.use(authMiddleware);

io.attach(server);
messageServer(io);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
