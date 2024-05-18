import { configDotenv } from "dotenv";
import express from "express";
import { createServer } from "node:http";
import { io } from "./server/io";
import { messageServer } from "./server/server";

configDotenv({ path: ".env" });

const port = process.env.SERVICE_PORT ?? 3000;
const app = express();
const server = createServer(app);

io.attach(server);
messageServer(io);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
