import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes";
import { publicKeyMiddleware } from "./middleware/public-key.middleware";
import { authMiddleware } from "./middleware/auth.middleware";
import { initializeSocket } from "./socket/socket";

dotenv.config({ path: ".env" });

const port = process.env.SERVICE_PORT ?? 3000;
const app = express();
const baseURL = process.env.SOCKET_URL;
console.log(baseURL);

app.use(express.json());
app.use(cors());

app.use(publicKeyMiddleware);
app.use(authMiddleware);
initializeSocket();
app.use(routes);
app.listen(port, () => {
  console.log(
    `Server started and is running on port: http://localhost:${port}`
  );
});
