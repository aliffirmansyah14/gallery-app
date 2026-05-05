import { Router } from "express";
import { fileController } from "../controllers/file.controller";
import { upload } from "../middlewares/upload.middleware";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/files", protect, fileController.getAllFiles);
router.get("/file/:id", protect, fileController.getFileById);
router.put("/file/:id", protect, fileController.update);
router.delete("/file/:id", protect, fileController.delete);
router.post("/upload", upload.single("file"), fileController.uploadFile);

export default router;
