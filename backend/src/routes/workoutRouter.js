import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CreateWorkoutController } from "../controllers/workoutControllers/CreateWorkoutController.js";
import { DeleteWorkoutController } from "../controllers/workoutControllers/DeleteWorkoutController.js";

const router = Router();

router.post("/create", authMiddleware, CreateWorkoutController);
router.delete("/delete/:id", authMiddleware, DeleteWorkoutController);

export default router;
