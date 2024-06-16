import { Router } from "express";
import { activityController } from "../controllers/activities/activity.controller";
import { activityGroupsController } from "../controllers/groups/activity-groups.controller";
import { activityMemberController } from "../controllers/activities/activity-member.controller";
import { activityMembersController } from "../controllers/activities/activity-members.controller";
import { patchActivityController } from "../controllers/activities/patchActivity.controller";
import { createActivityController } from "../controllers/activities/create-activity.controller";
import { postActivitiyMessageController } from "../controllers/activities/post-activity-message.controller";
import { getActivitiyMessagesController } from "../controllers/activities/get-activity-messages.controller";

const router = Router();
const path = "/activities";

router.get(`${path}/:activityID`, activityController);
router.get(`${path}/:activityID/groups`, activityGroupsController);
router.get(`${path}/:activityID/members`, activityMembersController);
router.get(`${path}/:activityID/members/:userID`, activityMemberController);
router.get(`${path}/:activityID/message`, getActivitiyMessagesController);

router.patch(`${path}/:activityID`, patchActivityController);
router.post(`${path}`, createActivityController);
router.post(`${path}/:activityID/message`, postActivitiyMessageController);

export { router as activities };
