export const endSessionController = async (req, res) => {
  const { sessionId } = req.params;
  const session = await endSessionService(req.user.id, sessionId);
  if (!session) {
    return res.status(404).json({
      success: false,
      message: "Session not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Session ended successfully",
    session,
  });
};
