import prisma from "../../config/prisma.js";

export const getAllSessionService = async (userId) => {
  const session = await prisma.session.findMany({
    where: {
      userId,
      status: "completed",
    },
    include: {
      sets: true,
    },
  });
  return session;
};
