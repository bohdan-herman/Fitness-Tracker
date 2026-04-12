import { getSessionService } from "../../services/sessionServices/getSessionService.js";

export const getSessionController = async (req, res) => {
  const { sessionId } = req.params;
  const session = await getSessionService(req.user.id, sessionId);
  if (!session) {
    return res.status(404).json({
      success: false,
      message: "Session not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Session fetched successfully",
    data: session,
  });
};
