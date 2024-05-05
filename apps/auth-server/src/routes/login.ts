import { Router } from "express";

const router = Router();
const path = "/login";

router.use(path);

export { router as login };
