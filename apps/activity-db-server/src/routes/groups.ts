import { Router } from "express";
import { isGroupMember } from "../middleware/is-group-member";
import { groupController } from "../controllers/groups/group.controller";
import { groupMemberController } from "../controllers/groups/group-member.controller";
import { getGroupMessagesController } from "../controllers/groups/get-group-messages.controller";
import { patchGroupController } from "../controllers/groups/patch-group.controller";
import { postGroupMessageController } from "../controllers/groups/post-group-message.controller";
import { createGroupController } from "../controllers/groups/create-group.controller";

const router = Router();
const path = "/groups";

router.post(`${path}`);

// middleware
router.use(`${path}/:groupID`, isGroupMember);
// paths
router.get(`${path}/:groupID`, groupController);
router.get(`${path}/:groupID/groups`);
router.get(`${path}/:groupID/members`, groupMemberController);
router.get(`${path}/:groupID/members/:userID`, groupMemberController);
router.get(`${path}/:groupID/message`, getGroupMessagesController);
router.patch(`${path}/:groupID`, patchGroupController);
router.post(`${path}`, createGroupController);
router.post(`${path}/:groupID/message`, postGroupMessageController);

export { router as groups };
