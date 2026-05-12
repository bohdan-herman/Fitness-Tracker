import { updateWorkoutService } from "../../services/workoutServices/updateWorkoutService.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const updateWorkoutController = asyncHandler(async (req, res) => {
  const workout = await updateWorkoutService(req.user, req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Workout updated successfully",
    data: workout,
  });
});
