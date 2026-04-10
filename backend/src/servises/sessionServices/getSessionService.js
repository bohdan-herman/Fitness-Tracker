import prisma from "../../config/prisma.js";

export const getSessionService = async (userId, sessionId) => {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
      userId,
    },
  });
  return session;
};
