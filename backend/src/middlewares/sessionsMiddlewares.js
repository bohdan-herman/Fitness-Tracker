import { AppError } from "../utils/AppError.js";
import { getSessionService } from "../services/sessionServices/getSessionService.js";
import { getWorkoutService } from "../services/workoutServices/getWorkoutService.js";

export const sessionNotFoundMiddleware = (req, res, next) => {
  const { sessionId } = req.params;
  const session = getSessionService(req.user.id, sessionId);
  if (!session) {
    throw new AppError("Session not found", 404);
  }
  req.session = session;
  next();
};

export const workoutNotFoundMiddleware = (req, res, next) => {
  const { workoutId } = req.params;
  const workout = getWorkoutService(req.user.id, workoutId);
  if (!workout) {
    throw new AppError("Workout not found", 404);
  }
  req.workout = workout;
  next();
};

export const sessionAlreadyCompletedMiddleware = (req, res, next) => {
  const { sessionId } = req.params;
  const session = getSessionService(req.user.id, sessionId);
  if (session.status === "completed") {
    throw new AppError("Session is already completed", 400);
  }
  req.session = session;
  next();
};

export const sessionNotCompletedMiddleware = (req, res, next) => {
  const { sessionId } = req.params;
  const session = getSessionService(req.user.id, sessionId);
  if (session.status === "active") {
    throw new AppError("Session is not completed", 400);
  }
  req.session = session;
  next();
};
