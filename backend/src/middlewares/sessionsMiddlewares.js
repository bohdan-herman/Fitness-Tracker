import AppError from "../utils/AppError.js";
import { getSessionService } from "../services/sessionServices/getSessionService.js";
import { getWorkoutService } from "../services/workoutServices/getWorkoutService.js";

export const sessionNotFoundMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId ?? req.params.id;
    const session = await getSessionService(req.user.id, sessionId);
    if (!session) {
      throw new AppError("Session not found", 404);
    }
    req.session = session;
    next();
  } catch (error) {
    next(error);
  }
};

export const workoutNotFoundMiddleware = async (req, res, next) => {
  try {
    const workoutId = req.params.workoutId ?? req.params.id;
    const workout = await getWorkoutService(req.user.id, workoutId);
    if (!workout) {
      throw new AppError("Workout not found", 404);
    }
    req.workout = workout;
    next();
  } catch (error) {
    next(error);
  }
};

export const sessionAlreadyCompletedMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId ?? req.params.id;
    const session = await getSessionService(req.user.id, sessionId);
    if (session.status === "completed") {
      throw new AppError("Session is already completed", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const sessionNotCompletedMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId ?? req.params.id;
    const session = await getSessionService(req.user.id, sessionId);
    if (session.status === "active") {
      throw new AppError("Session is not completed", 400);
    }
    req.session = session;
    next();
  } catch (error) {
    next(error);
  }
};
