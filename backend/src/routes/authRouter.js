import { Router } from "express";
import { RegisterController } from "../controllers/authControllers/registerController.js";
import { LoginController } from "../controllers/authControllers/loginController.js";
import { LogoutController } from "../controllers/authControllers/logoutController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { loginMiddleware } from "../middlewares/loginMiddleware.js";
import { registerMiddleware } from "../middlewares/registerMiddleware.js";
import { checkAuthController } from "../controllers/authControllers/checkAuthController.js";

const router = Router();

router.post("/login", loginMiddleware, asyncHandler(LoginController));
router.post("/register", registerMiddleware, asyncHandler(RegisterController));
router.post("/logout", authMiddleware, asyncHandler(LogoutController));
router.get("/checkAuth", authMiddleware, asyncHandler(checkAuthController));

export default router;
