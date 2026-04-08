import { getAllExercisesService } from "../../servises/exerciseServices/getAllExerciseService.js";

export const GetAllExercisesController = async (req, res) => {
  try {
    const exercises = await getAllExercisesService();
    res.status(200).json({
      success: true,
      message: "Exercises fetched successfully",
      exercises,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error fetching exercises";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
