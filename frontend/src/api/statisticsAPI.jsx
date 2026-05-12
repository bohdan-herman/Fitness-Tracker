const statisticsAPI = async () => {
  try {
    // Получаем сессии пользователя
    const sessionsRes = await fetch(
      `http://localhost:4000/session/my-sessions`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!sessionsRes.ok) {
      throw new Error("Failed to fetch sessions");
    }

    const sessionsData = await sessionsRes.json();
    const sessions = sessionsData.data || [];

    // Вычисляем статистику по группам мышц
    const muscleGroupStats = {};

    sessions.forEach((session) => {
      if (session.workout && session.workout.exercises) {
        session.workout.exercises.forEach((exercise) => {
          const muscleGroup = exercise.muscleGroup || "Unknown";
          muscleGroupStats[muscleGroup] =
            (muscleGroupStats[muscleGroup] || 0) + 1;
        });
      }
    });

    return muscleGroupStats;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return {};
  }
};

export default statisticsAPI;
