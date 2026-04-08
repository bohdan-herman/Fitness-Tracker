import prisma from "../../config/prisma.js";

export const getAllSessionService = async (userId) => {
  const session = await prisma.workoutSession.findMany({
    where: {
      userId,
      status: "inactive",
    },
  });
  return session;
};
