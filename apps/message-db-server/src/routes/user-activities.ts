import { Router } from "express";
import { getUserActivitiesController } from "../controllers/activities/user-activities.controller";

const router = Router();
const path = "/user-activities";

router.get(path, (_rq, rs) => {
  rs.json("Hello");
});
router.get(`${path}/:userId`, getUserActivitiesController);

export { router as userActivites };
