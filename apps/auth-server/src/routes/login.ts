import { Router } from "express";
import loginUserController from "../controllers/login.controller";

const router = Router();
const path = "/login";

router.post(path, loginUserController);

export { router as login };
