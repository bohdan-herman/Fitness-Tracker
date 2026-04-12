import prisma from "../../config/prisma.js";

export const getWorkoutService = async (userId, id) => {
  return await prisma.workout.findUnique({
    where: {
      id,
      authorId: userId,
    },
    include: {
      exercises: true,
    },
  });
};
