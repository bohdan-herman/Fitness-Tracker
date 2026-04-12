import { AppError } from "../utils/AppError.js";
import { findUserByName } from "../services/authServices/loginService.js";

export const registerMiddleware = async (req, res, next) => {
  const { name, password } = req.body;

  if (!name?.trim() || !password?.trim()) {
    throw new AppError("Name and password are required", 400);
  }

  if (name.trim().length < 3) {
    throw new AppError("Name must be at least 3 characters long", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters long", 400);
  }

  const existingUser = await findUserByName(name.trim());

  if (existingUser) {
    throw new AppError("User with this name already exists", 409);
  }

  req.body.name = name.trim();

  next();
};
