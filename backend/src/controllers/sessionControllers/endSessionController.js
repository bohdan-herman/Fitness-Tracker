import { getSessionService } from "../../services/sessionServices/getSessionService.js";
import { endSessionService } from "../../services/sessionServices/endSessionService.js";

export const endSessionController = async (req, res) => {
  const { sessionId } = req.params;
  const { sets } = req.body;
  const session = await getSessionService(req.user.id, sessionId);
  const endedSession = await endSessionService(session, sets);

  return res.status(200).json({
    success: true,
    message: "Session ended successfully",
    data: endedSession,
  });
};
