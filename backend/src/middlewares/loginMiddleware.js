import { AppError } from "../utils/AppError.js";
import {
  findUserByName,
  verifyPassword,
} from "../services/authServices/loginService.js";

export const loginMiddleware = async (req, res, next) => {
  const { name, password } = req.body;

  if (!name?.trim() || !password?.trim()) {
    throw new AppError("Name and password are required", 400);
  }

  const user = await findUserByName(name.trim());
  if (!user) {
    throw new AppError("Invalid username or password", 401);
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid username or password", 401);
  }

  req.user = {
    id: user.id,
    name: user.name,
  };

  next();
};
