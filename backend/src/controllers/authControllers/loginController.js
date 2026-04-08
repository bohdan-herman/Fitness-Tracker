import jwt from "jsonwebtoken";
import {
  findUserByName,
  verifyPassword,
} from "../../servises/authServices/loginService.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const LoginController = async (req, res) => {
  if (!req.body.name?.trim() || !req.body.password?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Fields name and password cannot be empty strings",
    });
  }

  const user = await findUserByName(req.body.name);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const isPasswordValid = await verifyPassword(
    req.body.password,
    user.password,
  );
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    name: user.name,
  });
};
