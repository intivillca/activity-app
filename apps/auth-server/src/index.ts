import express from "express";
import cors from "cors";
import { routes } from "./routes";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const port = process.env.SERVICE_PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.listen(port, () => {
  console.log(
    `Server started and is running on port: http://localhost:${port}`
  );
});
