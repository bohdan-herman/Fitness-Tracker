import prisma from "../../config/prisma.js";

export const getSessionService = async (userId, sessionId) => {
  const session = await prisma.workoutSession.findUnique({
    where: {
      id: sessionId,
      userId,
      status: "inactive",
    },
  });
  return session;
};
