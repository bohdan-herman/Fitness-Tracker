const getOwnProfileController = async (req, res) => {
  const userId = req.user.id;
  const user = await findUserById(userId);
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
};
