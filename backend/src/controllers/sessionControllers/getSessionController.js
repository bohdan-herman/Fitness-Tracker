import { getSessionService } from "../../services/sessionServices/getSessionService.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const getSessionController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const session = await getSessionService(req.user.id, id);
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
});
