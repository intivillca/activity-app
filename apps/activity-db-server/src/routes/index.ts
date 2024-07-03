import { Router } from "express";
import { userActivites } from "./user-activities";
import { activities } from "./activities";
import { files } from "./file";
import { invites } from "./invites";
import { groups } from "./groups";
import { messages } from "./messages";

const router = Router();
const path = "/";

router.get(path, (_req, res) => {
  return res.json({ message: "DB server working correctly" });
});
router.use(path, userActivites);
router.use(path, activities);
router.use(path, files);
router.use(path, invites);
router.use(path, groups);
router.use(path, messages);

export { router as routes };
