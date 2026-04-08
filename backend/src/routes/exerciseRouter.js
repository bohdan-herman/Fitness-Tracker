import { Router } from "express";
import { GetAllExercisesController } from "../controllers/exerciseControllers/GetAllExercisesController.js";
import { GetExerciseController } from "../controllers/exerciseControllers/GetExerciseController.js";
import { GetExercisesByMuscleGroupController } from "../controllers/exerciseControllers/GetExersicesByMuscleGroupController.js";

const router = Router();

router.get("/all", GetAllExercisesController);
router.get("/:id", GetExerciseController);
router.get("/muscleGroup/:muscleGroup", GetExercisesByMuscleGroupController);

export default router;
