import { Router } from "express";
import { getAllExercisesController } from "../controllers/exerciseControllers/getAllExercisesController.js";
import { getExerciseController } from "../controllers/exerciseControllers/getExerciseController.js";
import { getExercisesByMuscleGroupController } from "../controllers/exerciseControllers/getExersicesByMuscleGroupController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { InvalidMuscleGroupMiddleware } from "../middlewares/InvalidMuscleGroupMiddleware.js";

const router = Router();

router.get("/all", authMiddleware, asyncHandler(getAllExercisesController));
router.get("/:id", authMiddleware, asyncHandler(getExerciseController));
router.get(
  "/muscleGroup/:muscleGroup",
  authMiddleware,
  InvalidMuscleGroupMiddleware,
  asyncHandler(getExercisesByMuscleGroupController),
);

export default router;
