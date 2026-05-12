import prisma from "../../config/prisma.js";

export const updateWorkoutService = async (user, id, body) => {
  return await prisma.workout.update({
    where: {
      id,
      authorId: user.id,
    },
    data: {
      name: body.name,
      exercises: {
        set: body.exercises.map((exercise) => ({
          id: exercise.id,
        })),
      },
    },
    include: {
      exercises: true,
    },
  });
};
