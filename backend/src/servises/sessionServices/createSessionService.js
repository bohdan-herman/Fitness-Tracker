import prisma from "../../config/prisma.js";

export const createSessionService = async (userId, workout) => {
  const session = await prisma.workoutSession.create({
    data: {
      userId,
      workoutId: workout.id,
    },
  });
  return session;
};
