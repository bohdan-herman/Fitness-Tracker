export const getAllWorkoutsController = async (req, res) => {
  const workouts = await getAllWorkoutsService(req.params.userId);
  res.status(200).json({
    success: true,
    message: "Workouts fetched successfully",
    data: workouts,
  });
};
