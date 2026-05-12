import { deleteWorkoutService } from "../../services/workoutServices/deleteWorkoutService.js";

export const deleteWorkoutController = async (req, res) => {
  await deleteWorkoutService(req.user, req.params.id);
  res.status(200).json({
    success: true,
    message: "Workout deleted successfully",
  });
};
