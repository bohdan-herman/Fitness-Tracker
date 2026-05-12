import prisma from "../../config/prisma.js";

export const getAllWorkoutsService = async (userId) => {
  return await prisma.workout.findMany({
    where: {
      authorId: userId,
    },
    include: {
      exercises: true,
    },
  });
};
