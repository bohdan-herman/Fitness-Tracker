import prisma from "../../config/prisma.js";

export const getAllWorkoutsService = async (user) => {
  return await prisma.workout.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      exercises: true,
    },
  });
};
