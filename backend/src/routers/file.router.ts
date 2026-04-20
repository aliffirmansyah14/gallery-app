import { Router } from "express";
import { fileController } from "../controllers/file.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/upload", upload.single("file"), fileController.uploadFile);

export default router;
