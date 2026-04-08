import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createSessionController } from "../controllers/sessionControllers/createSessionController.js";
import { endSessionController } from "../controllers/sessionControllers/endSessionController.js";
import { getAllSessionController } from "../controllers/sessionControllers/getAllSessionController.js";
import { getSessionController } from "../controllers/sessionControllers/getSessionController.js";

const router = Router();

router.post("/start/:workoutId", authMiddleware, createSessionController);
router.patch("/end/:sessionId", authMiddleware, endSessionController);
router.get("/:userId", getAllSessionController);
router.get("/:userId/:id", getSessionController);

export default router;
