import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CreateWorkoutController } from "../controllers/workoutControllers/CreateWorkoutController.js";
import { DeleteWorkoutController } from "../controllers/workoutControllers/DeleteWorkoutController.js";
import { GetAllWorkoutsController } from "../controllers/workoutControllers/GetAllWorkoutsController.js";
import { GetWorkoutController } from "../controllers/workoutControllers/GetWorkoutController.js";
import { UpdateWorkoutController } from "../controllers/workoutControllers/UpdateWorkoutController.js";

const router = Router();

router.post("/create", authMiddleware, CreateWorkoutController);
router.delete("/delete/:id", authMiddleware, DeleteWorkoutController);
router.get("/all/:userId", authMiddleware, GetAllWorkoutsController);
router.get("/:id/:userId", authMiddleware, GetWorkoutController);
router.put("/update/:id/:userId", authMiddleware, UpdateWorkoutController);

export default router;
