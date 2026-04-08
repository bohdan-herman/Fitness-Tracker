import prisma from "../../config/prisma.js";

export const getAllExercisesService = async () => {
  return await prisma.exercise.findMany();
};
