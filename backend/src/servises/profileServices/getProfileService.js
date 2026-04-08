import prisma from "../../config/prisma.js";

export const getProfileService = async (id) => {
  const profile = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return profile;
};
