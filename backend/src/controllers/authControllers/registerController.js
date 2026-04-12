import jwt from "jsonwebtoken";
import { registerUser } from "../../services/authServices/registerService.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const RegisterController = async (req, res) => {
  const user = await registerUser(req.body.name, req.body.password);
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });
  res.status(201).json({
    success: true,
    message: "Пользователь успешно зарегистрирован",
    data: {
      name: user.name,
    },
  });
};
