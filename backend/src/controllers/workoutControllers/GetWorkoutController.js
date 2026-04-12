export const getWorkoutController = async (req, res) => {
  const workout = await getWorkoutService(req.params.userId, req.params.id);
  res.status(200).json({
    success: true,
    message: "Workout fetched successfully",
    data: workout,
  });
};
