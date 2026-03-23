import jwt from "jsonwebtoken";
import { findUserByName, verifyPassword } from "../../servises/loginService.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const LoginController = async (req, res) => {
  if (!req.body.name?.trim() || !req.body.password?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Поля name и password не могут быть пустыми строками",
    });
  }

  const user = await findUserByName(req.body.name);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Неверное имя пользователя или пароль",
    });
  }

  const isPasswordValid = await verifyPassword(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Неверное имя пользователя или пароль",
    });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({
    success: true,
    message: "Вход выполнен успешно",
    token,
    name: user.name,
  });
};
