import { CreateWorkoutService } from "../../servises/workoutServices/createWorkoutService.js";

export const CreateWorkoutController = async (req, res) => {
  try {
    const workout = await CreateWorkoutService(req.user, req.body);
    res.status(201).json({
      success: true,
      message: "Workout created successfully",
      workout,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error creating workout";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
