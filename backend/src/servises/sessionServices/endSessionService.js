import prisma from "../../config/prisma.js";

export const endSessionService = async (userId, sessionId) => {
  const session = await prisma.workoutSession.update({
    where: {
      id: sessionId,
      userId,
    },
    data: {
      status: "inactive",
    },
  });
  return session;
};
