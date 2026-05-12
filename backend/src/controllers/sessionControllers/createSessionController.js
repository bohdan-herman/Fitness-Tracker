import { createSessionService } from "../../services/sessionServices/createSessionService.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export const createSessionController = asyncHandler(async (req, res) => {
  const session = await createSessionService(req.user.id, req.workout.id);
  return res.status(201).json({
    success: true,
    message: "Session started successfully",
    data: session,
  });
});
