import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createSessionController } from "../controllers/sessionControllers/createSessionController.js";
import { endSessionController } from "../controllers/sessionControllers/endSessionController.js";
import { getAllSessionController } from "../controllers/sessionControllers/getAllSessionController.js";
import { getSessionController } from "../controllers/sessionControllers/getSessionController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getOwnSessionsController } from "../controllers/sessionControllers/getOwnSessionsController.js";
import {
  sessionAlreadyCompletedMiddleware,
  sessionNotFoundMiddleware,
  workoutNotFoundMiddleware,
} from "../middlewares/sessionsMiddlewares.js";

const router = Router();

router.post(
  "/start/:workoutId",
  authMiddleware,
  asyncHandler(workoutNotFoundMiddleware),
  asyncHandler(createSessionController),
);
router.patch(
  "/end/:sessionId",
  authMiddleware,
  asyncHandler(sessionNotFoundMiddleware),
  asyncHandler(sessionAlreadyCompletedMiddleware),
  asyncHandler(endSessionController),
);
router.get(
  "/my-sessions",
  authMiddleware,
  asyncHandler(getOwnSessionsController),
);

router.get("/:userId", authMiddleware, asyncHandler(getAllSessionController));

router.get(
  "/:userId/:id",
  authMiddleware,
  asyncHandler(sessionNotFoundMiddleware),
  asyncHandler(getSessionController),
);

export default router;
