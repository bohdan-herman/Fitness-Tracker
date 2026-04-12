import prisma from "../../config/prisma.js";

export const getSessionService = async (userId, sessionId) => {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
      userId,
      status: "completed",
    },
    include: {
      sets: true,
    },
  });
  return session;
};
