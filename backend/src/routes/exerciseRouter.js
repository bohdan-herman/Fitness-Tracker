import { Router } from "express";
import { GetAllExercisesController } from "../controllers/exerciseControllers/GetAllExercisesController.js";
import { GetExerciseController } from "../controllers/exerciseControllers/GetExerciseController.js";
import { GetExercisesByMuscleGroupController } from "../controllers/exerciseControllers/GetExersicesByMuscleGroupController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/all", authMiddleware, GetAllExercisesController);
router.get("/:id", authMiddleware, GetExerciseController);
router.get(
  "/muscleGroup/:muscleGroup",
  authMiddleware,
  GetExercisesByMuscleGroupController,
);

export default router;
