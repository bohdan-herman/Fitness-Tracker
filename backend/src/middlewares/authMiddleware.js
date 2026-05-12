import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not provided. Please login",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Keep request user shape consistent across app
    req.user = { id: decoded.id, name: decoded.name };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
