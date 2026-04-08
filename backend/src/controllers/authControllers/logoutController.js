export const LogoutController = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "You logged out successfully",
  });
};
