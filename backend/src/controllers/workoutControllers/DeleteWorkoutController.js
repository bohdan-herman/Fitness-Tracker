import { deleteWorkoutService } from "../../servises/workoutServices/deleteWorkoutService.js";

export const DeleteWorkoutController = async (req, res) => {
  try {
    await deleteWorkoutService(req.user, req.params.id);
    res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error deleting workout";

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }
    res.status(status).json({
      success: false,
      message,
    });
  }
};
