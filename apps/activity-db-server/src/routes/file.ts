import { Router } from "express";
import { fileCreateController } from "../controllers/file/fileCreate.controller";

const router = Router();
const path = "/files";

router.post(`${path}`, fileCreateController);

export { router as files };
