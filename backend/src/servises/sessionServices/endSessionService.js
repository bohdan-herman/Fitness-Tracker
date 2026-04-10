import prisma from "../../config/prisma.js";

export const endSessionService = async (session, sets) => {
  const result = await prisma.$transaction(async (tx) => {
    const workoutExersises = await tx.workoutExercise.findMany({
      where: {
        workoutId: session.workoutId,
      },
    });
    const workoutExerciseIds = workoutExersises.map(
      (exercise) => exercise.exerciseId,
    );
    for (const set of sets) {
      if (!workoutExerciseIds.includes(set.exerciseId)) {
        throw new Error("Invalid exerciseId");
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
