import { Router } from "express";
import { fileController } from "../controllers/file.controller";
import { upload } from "../middlewares/upload.middleware";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/files", protect, fileController.getAllFiles);
router.post("/upload", upload.single("file"), fileController.uploadFile);

export default router;
