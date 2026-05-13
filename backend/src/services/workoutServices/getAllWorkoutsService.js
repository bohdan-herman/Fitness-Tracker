import prisma from "../../config/prisma.js";

export const getAllWorkoutsService = async (userId) => {
  const workouts = await prisma.workout.findMany({
    where: {
      authorId: userId,
    },
    include: {
      exercises: true,
      sessions: {
        where: {
          status: "completed",
        },
        orderBy: {
          date: "desc",
        },
        take: 1,
      },
    },
  });

  return workouts;
};
