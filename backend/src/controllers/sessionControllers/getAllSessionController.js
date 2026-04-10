import { getAllSessionService } from "../../servises/sessionServices/getAllSessionService.js";

export const getAllSessionController = async (req, res) => {
  const { userId } = req.params;
  const sessions = await getAllSessionService(userId);
  if (!sessions) {
    return res.status(404).json({
      success: false,
      message: "Sessions not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Sessions fetched successfully",
    sessions,
  });
};
