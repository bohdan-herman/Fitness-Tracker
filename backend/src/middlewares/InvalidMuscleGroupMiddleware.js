import { AppError } from "../utils/AppError.js";

export const InvalidMuscleGroupMiddleware = (req, res, next) => {
  const { muscleGroup } = req.params;
  const AvaliableMuscleGroups = [
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
  ];
  if (!AvaliableMuscleGroups.includes(muscleGroup)) {
    throw new AppError("Invalid muscle group", 400);
  }
  next();
};
