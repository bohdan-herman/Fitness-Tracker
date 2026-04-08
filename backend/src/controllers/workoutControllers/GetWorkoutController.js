export const GetWorkoutController = async (req, res) => {
  try {
    const workout = await getWorkoutService(req.params.userId, req.params.id);
    res.status(200).json({
      success: true,
      message: "Workout fetched successfully",
      workout,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error fetching workout";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
