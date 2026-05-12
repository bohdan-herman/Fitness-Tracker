import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const LoginController = async (req, res) => {
  const token = jwt.sign({ id: req.user.id, name: req.user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: req.user,
  });
};
