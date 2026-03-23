import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const guestMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Если токен есть, проверяем его на валидность
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, JWT_SECRET);
      // Если токен верный, значит пользователь залогинен — не пускаем дальше
      return res.status(403).json({
        success: false,
        message: "Сначала выйди из аккаунта",
      });
    } catch (error) {
      // Если токен битый или просроченный, игнорируем его и даем залогиниться заново
      next();
    }
  } else {
    // Токена нет — пользователь гость, всё в порядке
    next();
  }
};
