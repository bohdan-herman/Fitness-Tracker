import prisma from "../../config/prisma.js";

export const getExerciseService = async (id) => {
  return await prisma.exercise.findUnique({
    where: {
      id: Number(id),
    },
  });
};
