import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

export const findUserByName = async (name) => {
  return await prisma.user.findUnique({
    where: { name },
  });
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
