import { createSessionService } from "../../services/sessionServices/createSessionService.js";

export const createSessionController = async (req, res) => {
  const session = await createSessionService(req.user.id, req.workout.id);
  return res.status(201).json({
    success: true,
    message: "Session started successfully",
    data: session,
  });
};
