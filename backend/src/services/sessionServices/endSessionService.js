import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

export const endSessionService = async (session, sets) => {
  const result = await prisma.$transaction(async (tx) => {
    const exercises = await tx.exercise.findMany({
      where: {
        workouts: {
          some: {
            id: session.workoutId,
          },
        },
      },
    });
    const ExerciseIds = exercises.map((exercise) => exercise.id);

    for (const set of sets) {
      if (!ExerciseIds.includes(set.exerciseId)) {
        throw new AppError("Invalid exerciseId", 400);
      }
      await tx.set.create({
        data: {
          weight: set.weight,
          reps: set.reps,
          sessionId: session.id,
          exerciseId: set.exerciseId,
          userId: session.userId,
        },
      });
    }

    const updatedSession = await tx.session.update({
      where: { id: session.id },
      data: { status: "completed" },
    });

    await tx.user.update({
      where: { id: session.userId },
      data: { isWorkoutActive: false },
    });

    return updatedSession;
  });

  return result;
};
