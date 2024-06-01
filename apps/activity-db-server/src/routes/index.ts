import { Router } from "express";
import { userActivites } from "./user-activities";
import { activities } from "./activities";

const router = Router();
const path = "/";

router.get(path, (_req, res) => {
  return res.json({ message: "DB server working correctly" });
});
router.use(path, userActivites);
router.use(path, activities);

export { router as routes };
