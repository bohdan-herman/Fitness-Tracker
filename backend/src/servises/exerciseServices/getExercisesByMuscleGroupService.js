import prisma from "../../config/prisma.js";

export const getExercisesByMuscleGroupService = async (muscleGroup) => {
  return await prisma.exercise.findMany({
    where: {
      muscleGroup,
    },
  });
};
