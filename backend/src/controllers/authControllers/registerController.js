import jwt from "jsonwebtoken";
import {
  existingUser,
  registerUser,
} from "../../servises/authServices/registerService.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const RegisterController = async (req, res) => {
  if (!req.body.name.trim() || !req.body.password.trim()) {
    return res.status(400).json({
      success: false,
      message: "Fields name and password cannot be empty strings",
    });
  }
  if (await existingUser(req.body.name)) {
    return res.status(409).json({
      success: false,
      message: "User with this name is already registered",
    });
  }

  const user = await registerUser(req.body.name, req.body.password);
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({
    success: true,
    message: "Пользователь успешно зарегистрирован",
    token,
    name: user.name,
  });
};
