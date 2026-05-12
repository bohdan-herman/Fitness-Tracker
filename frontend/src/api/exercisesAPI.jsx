const exercisesAPI = async () => {
  try {
    const exercisesRes = await fetch(`http://localhost:4000/exercise/all`, {
      method: "GET",
      credentials: "include",
    });

    if (!exercisesRes.ok) {
      throw new Error("Failed to fetch exercises");
    }

    const exercisesData = await exercisesRes.json();
    return exercisesData.data || [];
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

const exercisesByMuscleGroupAPI = async (muscleGroup) => {
  try {
    const res = await fetch(
      `http://localhost:4000/exercise/muscleGroup/${muscleGroup}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch exercises by muscle group");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching exercises by muscle group:", error);
    return [];
  }
};

export { exercisesAPI, exercisesByMuscleGroupAPI };
