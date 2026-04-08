import { getExercisesByMuscleGroupService } from "../../servises/exerciseServices/getExercisesByMuscleGroupService.js";

export const GetExercisesByMuscleGroupController = async (req, res) => {
  const AvaliableMuscleGroups = [
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
  ];

  if (!AvaliableMuscleGroups.includes(req.params.muscleGroup)) {
    throw new Error("Invalid muscle group");
  }

  try {
    const exercises = await getExercisesByMuscleGroupService(
      req.params.muscleGroup,
    );
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
