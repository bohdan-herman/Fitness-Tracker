import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const LoginController = async (req, res) => {
  const user = req.user;
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
    data: {
      name: user.name,
    },
  });
};
