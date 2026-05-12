export const errorHandler = (err, req, res, next) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? "Internal Server Error";

  if (res.headersSent) return next(err);

  return res.status(status).json({
    success: false,
    message,
  });
};

