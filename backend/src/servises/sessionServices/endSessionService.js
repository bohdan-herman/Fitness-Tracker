import prisma from "../../config/prisma.js";

export const endSessionService = async (session, updatedWorkoutExercises) => {
  const result = await prisma.$transaction(async (tx) => {
    for (const exercise of updatedWorkoutExercises) {
      await tx.workoutExercise.update({
        where: {
          workoutId_exerciseId: {
            workoutId: session.workoutId,
            exerciseId: exercise.id,
          },
        },
        data: {
          weight: exercise.weight,
          reps: exercise.reps,
        },
      });
    }

    const updatedSession = await tx.workoutSession.update({
      where: { id: session.id },
      data: { status: "inactive" },
    });

    await tx.user.update({
      where: { id: session.userId },
      data: { isWorkoutActive: false },
    });

    return updatedSession;
  });

  return result;
};
