export const UpdateWorkoutController = async (req, res) => {
  try {
    const workout = await updateWorkoutService(
      req.user,
      req.params.id,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      workout,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error updating workout";
    res.status(status).json({
      success: false,
      message,
    });
  }
};
