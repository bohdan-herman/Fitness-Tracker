export const GetAllWorkoutsController = async (req, res) => {
  try {
    const workouts = await getAllWorkoutsService(req.params.userId);
    res.status(200).json({
      success: true,
      message: "Workouts fetched successfully",
      workouts,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error fetching workouts";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
