import { Router } from "express";
import { getUniqueMesseges } from "../controllers/messages/getUniqueMessages";

const router = Router();
const path = "/messages";

router.get(`${path}`, getUniqueMesseges);

export { router as messages };
