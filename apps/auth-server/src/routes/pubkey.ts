import { Router } from "express";
import loginUserController from "../controllers/login.controller";
import pubkeyController from "../controllers/pubkey.controller";

const router = Router();
const path = "/pubkey";

router.get(path, pubkeyController);

export { router as pubkey };
