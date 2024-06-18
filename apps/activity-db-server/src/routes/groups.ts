import { Router } from "express";
import { isGroupMember } from "../middleware/is-group-member";
import { groupController } from "../controllers/groups/group.controller";

const router = Router();
const path = "/groups";

router.post(`${path}`);

// middleware
router.use(`${path}/:groupID`, isGroupMember);
// paths
router.get(`${path}/:groupID`, groupController);
router.get(`${path}/:groupID/groups`);
router.get(`${path}/:groupID/members`);
router.get(`${path}/:groupID/members/:userID`);
router.get(`${path}/:groupID/message`);
router.patch(`${path}/:groupID`);
router.post(`${path}/:groupID/message`);

export { router as groups };
