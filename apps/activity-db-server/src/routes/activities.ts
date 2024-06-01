import { Router } from "express";
import { activityController } from "../controllers/activities/activity.controller";
import { activityGroupsController } from "../controllers/groups/activity-groups.controller";

const router = Router();
const path = "/activities";

router.get(`${path}/:activityID`, activityController);
router.get(`${path}/:activityID/groups`, activityGroupsController);

export { router as activities };
