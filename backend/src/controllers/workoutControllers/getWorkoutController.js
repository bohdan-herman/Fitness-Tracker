import { getWorkoutService } from "../../services/workoutServices/getWorkoutService.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const getWorkoutController = asyncHandler(async (req, res) => {
  const workout = await getWorkoutService(req.params.userId, req.params.id);
  res.status(200).json({
    success: true,
    message: "Workout fetched successfully",
    data: workout,
  });
});
