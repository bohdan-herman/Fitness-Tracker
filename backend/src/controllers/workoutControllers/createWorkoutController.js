import { CreateWorkoutService } from "../../services/workoutServices/createWorkoutService.js";

export const createWorkoutController = async (req, res) => {
  const workout = await CreateWorkoutService(req.user, req.body);
  res.status(201).json({
    success: true,
    message: "Workout created successfully",
    data: workout,
  });
};
