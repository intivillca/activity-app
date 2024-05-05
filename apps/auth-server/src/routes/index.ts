import { Router } from "express";
import { login } from "./login";
import { register } from "./register";
import { pubkey } from "./pubkey";

const router = Router();
const path = "/";

router.get(path, (_req, res) => {
  return res.json({ message: "Authserver working correctly" });
});
router.use(path, login, register, pubkey);

export { router as routes };
