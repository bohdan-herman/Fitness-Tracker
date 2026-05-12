import AppError from "../utils/AppError.js";

export const InvalidMuscleGroupMiddleware = (req, res, next) => {
  const { muscleGroup } = req.params;
  const AvaliableMuscleGroups = [
    "chest",
    "back",
    "legs",
    "shoulders",
    "hands",
    "abs",
  ];
  if (!AvaliableMuscleGroups.includes(muscleGroup)) {
    throw new AppError("Invalid muscle group", 400);
  }
  next();
};
