import prisma from "../../config/prisma.js";

export const createSessionService = async (userId, workoutId) => {
  const session = await prisma.session.create({
    data: {
      userId,
      workoutId,
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
