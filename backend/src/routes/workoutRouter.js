import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createWorkoutController } from "../controllers/workoutControllers/createWorkoutController.js";
import { deleteWorkoutController } from "../controllers/workoutControllers/deleteWorkoutController.js";
import { getAllWorkoutsController } from "../controllers/workoutControllers/getAllWorkoutsController.js";
import { getWorkoutController } from "../controllers/workoutControllers/getWorkoutController.js";
import { updateWorkoutController } from "../controllers/workoutControllers/updateWorkoutController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { workoutNotFoundMiddleware } from "../middlewares/sessionsMiddlewares.js";

const router = Router();

router.post("/create", authMiddleware, asyncHandler(createWorkoutController));
router.delete(
  "/delete/:id",
  authMiddleware,
  asyncHandler(deleteWorkoutController),
);
router.get(
  "/all/:userId",
  authMiddleware,
  asyncHandler(getAllWorkoutsController),
);
router.get(
  "/:id/:userId",
  authMiddleware,
  workoutNotFoundMiddleware,
  asyncHandler(getWorkoutController),
);
router.put(
  "/update/:id/:userId",
  authMiddleware,
  asyncHandler(updateWorkoutController),
);

export default router;
