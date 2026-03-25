import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";

export const existingUser = async (name) => {
  return await prisma.user.findUnique({
    where: { name },
  });
};

export const registerUser = async (name, password) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
    },
  });
};
