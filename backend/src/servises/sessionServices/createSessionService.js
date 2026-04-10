import prisma from "../../config/prisma.js";

export const createSessionService = async (userId, workout) => {
  const session = await prisma.workoutSession.create({
    data: {
      userId,
      workoutId: workout.id,
    },
  });
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isWorkoutActive: true,
    },
  });
  return session;
};
