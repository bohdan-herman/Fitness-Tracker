export const checkAuthController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};
