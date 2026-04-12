import prisma from "../../config/prisma.js";

export const deleteWorkoutService = async (user, workoutId) => {
  return await prisma.workout.delete({
    where: {
      id: workoutId,
      authorId: user.id,
    },
  });
};
