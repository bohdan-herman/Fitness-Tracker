export const endSessionController = async (req, res) => {
  const { sessionId } = req.params;
  const { updatedWorkoutExercises } = req.body;
  const session = await getSessionService(req.user.id, sessionId);
  if (!session) {
    return res.status(404).json({
      success: false,
      message: "Session not found",
    });
  }
  if (session.status === "completed") {
    return res.status(400).json({
      success: false,
      message: "Session is already completed",
    });
  }

  const endedSession = await endSessionService(
    session,
    updatedWorkoutExercises,
  );

  return res.status(200).json({
    success: true,
    message: "Session ended successfully",
    session: endedSession,
  });
};
