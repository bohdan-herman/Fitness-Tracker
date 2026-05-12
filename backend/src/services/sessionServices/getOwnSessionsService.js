import prisma from "../../config/prisma.js";

export const getOwnSessionsService = async (userId) => {
  const sessions = await prisma.session.findMany({
    where: {
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
  return sessions;
};
