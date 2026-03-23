export const LogoutController = (req, res) => {
  // JWT является stateless — сервер не хранит сессию.
  // Клиент должен удалить токен на своей стороне.
  res.status(200).json({
    success: true,
    message: "Вы успешно вышли из аккаунта",
  });
};
