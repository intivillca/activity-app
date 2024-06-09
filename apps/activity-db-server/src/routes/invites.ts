import { Router } from "express";
import { createInviteConttroler } from "../controllers/invites/create-invite.controller";
import { handleInviteController } from "../controllers/invites/handle-invite.controller";

const router = Router();
const path = "/invites";

router.post(`${path}`, createInviteConttroler);
router.get(`${path}/:invite`, handleInviteController);

export { router as invites };
