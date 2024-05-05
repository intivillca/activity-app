import express from "express";
import cors from "cors";

const port = process.env.SERVICE_PORT ?? 3000;
console.log(process.env.SERVICE_PORT);
const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(
    `Server started and is running on port: http://localhost:${port}`
  );
});
