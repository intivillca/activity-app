import { Router } from "express";
import { fileController } from "../controllers/file.controller";
import { imageOriginalController } from "../controllers/image-original.controller";
import { imageSizeController } from "../controllers/image-size.controller";
import { uploadSingleController } from "../controllers/upload-single.controller";
import { uploadMiddleware } from "../middleware/upload-middleware";

const router = Router();

router.post("/upload", uploadMiddleware.single("file"), uploadSingleController);
router.get("/images/:uniqueId/:size", imageSizeController);
router.get("/images/:uniqueId", imageOriginalController);
router.get("/files/:filename", fileController);

export { router as routes };
