import { getExercisesByMuscleGroupService } from "../../services/exerciseServices/getExercisesByMuscleGroupService.js";

export const getExercisesByMuscleGroupController = async (req, res) => {
  const exercises = await getExercisesByMuscleGroupService(
    req.params.muscleGroup,
  );
  res.status(200).json({
    success: true,
    message: "Exercises fetched successfully",
    data: exercises,
  });
};
