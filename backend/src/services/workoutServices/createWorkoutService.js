import prisma from "../../config/prisma.js";

export const CreateWorkoutService = async (user, body) => {
  return await prisma.workout.create({
    data: {
      authorId: user.id,
      name: body.name,
      exercises: {
        connect: body.exercises.map((exercise) => ({
          id: exercise.id,
        })),
      },
    },
  });
};
