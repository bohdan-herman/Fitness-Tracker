import prisma from "../../config/prisma.js";

export const getSessionService = async (userId, sessionId) => {
  return await prisma.session.findFirst({
    where: {
      id: sessionId,
      userId,
    },
    include: {
      sets: true,
      workout: {
        include: {
          exercises: true,
        },
      },
    },
  });
};
