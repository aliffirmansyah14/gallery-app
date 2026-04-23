import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", userController.login);
router.get("/me", protect, userController.getMe);

export default router;
