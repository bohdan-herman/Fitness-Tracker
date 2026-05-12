import { getAllWorkoutsService } from "../../services/workoutServices/getAllWorkoutsService.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const getAllWorkoutsController = asyncHandler(async (req, res) => {
  const workouts = await getAllWorkoutsService(req.params.userId);
  res.status(200).json({
    success: true,
    message: "Workouts fetched successfully",
    data: workouts,
  });
});
