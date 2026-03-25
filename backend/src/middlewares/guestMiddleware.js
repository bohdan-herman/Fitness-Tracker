import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const guestMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, JWT_SECRET);
      return res.status(403).json({
        success: false,
        message: "Logout from account first",
      });
    } catch (error) {
      next();
    }
  } else {
    next();
  }
};
