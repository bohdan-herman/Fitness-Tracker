import prisma from "../../config/prisma.js";

export const createSessionService = async (userId, workoutId) => {
  const result = await prisma.$transaction(async (tx) => {
    const lastSession = await tx.session.findFirst({
      where: {
        userId,
        status: "completed",
        workoutId,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        sets: true,
      },
    });

    const session = await tx.session.create({
      data: {
        userId,
        workoutId,
      },
      include: {
        sets: true,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { isWorkoutActive: true },
    });

    return {
      ...session,
      previousSets: lastSession?.sets || [],
    };
  });
  return result;
};
