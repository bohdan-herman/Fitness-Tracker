import { getExerciseService } from "../../services/exerciseServices/getExerciseServise.js";

export const getExerciseController = async (req, res) => {
  const exercise = await getExerciseService(req.params.id);
  res.status(200).json({
    success: true,
    message: "Exercise fetched successfully",
    data: exercise,
  });
};
