import { getExerciseService } from "../../servises/exerciseServices/getExerciseServise.js";

export const GetExerciseController = async (req, res) => {
  try {
    const exercise = await getExerciseService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Exercise fetched successfully",
      exercise,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error fetching exercise";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
