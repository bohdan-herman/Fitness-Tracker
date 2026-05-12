import prisma from "../../config/prisma.js";

export const getWorkoutService = async (userId, id) => {
  return await prisma.workout.findFirst({
    where: {
      id,
      authorId: userId,
    },
    include: {
      exercises: true,
    },
  });
};
