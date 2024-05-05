import { Router } from "express";
import registerUserController from "../controllers/register.controller";

const router = Router();
const path = "/register";

router.get(path, (_reg, res) => {
  return res.json({ message: "Register path" });
});
router.post(path, registerUserController);

export { router as register };
