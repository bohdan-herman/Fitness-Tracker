import { Router } from "express";
import { RegisterController } from "../controllers/authControllers/registerCOntroller.js";
import { LoginController } from "../controllers/authControllers/loginController.js";
import { LogoutController } from "../controllers/authControllers/logoutController.js";
import { guestMiddleware } from "../middlewares/guestMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { loginMiddleware } from "../middlewares/loginMiddleware.js";
import { registerMiddleware } from "../middlewares/registerMiddleware.js";

const router = Router();

router.post(
  "/login",
  guestMiddleware,
  loginMiddleware,
  asyncHandler(LoginController),
);
router.post(
  "/register",
  guestMiddleware,
  registerMiddleware,
  asyncHandler(RegisterController),
);
router.post("/logout", authMiddleware, asyncHandler(LogoutController));

export default router;
