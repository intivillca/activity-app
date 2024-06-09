import { Router } from "express";
import { userActivites } from "./user-activities";
import { activities } from "./activities";
import { files } from "./file";
import { invites } from "./invites";

const router = Router();
const path = "/";

router.get(path, (_req, res) => {
  return res.json({ message: "DB server working correctly" });
});
router.use(path, userActivites);
router.use(path, activities);
router.use(path, files);
router.use(path, invites);

export { router as routes };
