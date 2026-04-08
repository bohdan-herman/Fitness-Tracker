import { getWorkoutService } from "../../servises/workoutServices/getWorkoutService.js";
import { createWorkoutSessionService } from "../../servises/sessionServices/createWorkoutSessionService.js";

export const createSessionController = async (req, res) => {
  const { workoutId } = req.params;
  const workout = await getWorkoutService(req.user.id, workoutId);
  if (!workout) {
    return res.status(404).json({
      success: false,
      message: "Workout not found",
    });
  }
  const session = await createWorkoutSessionService(req.user.id, workout);
  return res.status(201).json({
    success: true,
    message: "Session started successfully",
    session,
  });
};
