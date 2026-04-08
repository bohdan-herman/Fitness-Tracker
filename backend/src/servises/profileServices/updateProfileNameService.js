import prisma from "../../config/prisma.js";

export const updateProfileNameService = async (id, newName) => {
  const profile = await prisma.user.update({
    where: {
      id,
    },
    data: { name: newName },
  });
  return profile;
};
