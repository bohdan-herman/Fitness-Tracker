import prisma from "../../config/prisma.js";

export const CreateWorkoutService = async (user, body) => {
  return await prisma.workout.create({
    data: {
      authorId: user.id,
      name: body.name,
      workoutExercises: {
        create: body.exercises.map((exercise) => ({
          exerciseId: exercise.id,
        })),
      },
    },
  });
};
