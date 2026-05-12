import { getOwnSessionsService } from "../../services/sessionServices/getOwnSessionsService.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const getOwnSessionsController = asyncHandler(async (req, res) => {
  const sessions = await getOwnSessionsService(req.user.id);
  return res.status(200).json({
    success: true,
    message: "Sessions fetched successfully",
    data: sessions,
  });
});
