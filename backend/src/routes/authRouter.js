import { Router } from "express";
import { RegisterController } from "../controllers/authControllers/registerCOntroller.js";
import { LoginController } from "../controllers/authControllers/loginController.js";
import { LogoutController } from "../controllers/authControllers/logoutController.js";
import { guestMiddleware } from "../middlewares/guestMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", guestMiddleware, LoginController);
router.post("/register", guestMiddleware, RegisterController);
router.post("/logout", authMiddleware, LogoutController);

export default router;

