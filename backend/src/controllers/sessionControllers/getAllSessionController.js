import { getAllSessionService } from "../../services/sessionServices/getAllSessionService.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const getAllSessionController = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const sessions = await getAllSessionService(userId);
  return res.status(200).json({
    success: true,
    message: "Sessions fetched successfully",
    data: sessions,
  });
});
