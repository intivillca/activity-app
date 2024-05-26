import { Router } from "express";
import { userActivites } from "./user-activities";

const router = Router();
const path = "/";

router.get(path, (_req, res) => {
  return res.json({ message: "DB server working correctly" });
});
router.use(path, userActivites);

export { router as routes };
