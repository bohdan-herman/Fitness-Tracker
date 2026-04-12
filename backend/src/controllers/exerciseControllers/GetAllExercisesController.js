import { getAllExercisesService } from "../../services/exerciseServices/getAllExerciseService.js";

export const getAllExercisesController = async (req, res) => {
  const exercises = await getAllExercisesService();
  res.status(200).json({
    success: true,
    message: "Exercises fetched successfully",
    data: exercises,
  });
};
