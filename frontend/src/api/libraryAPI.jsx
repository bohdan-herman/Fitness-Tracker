const libraryAPI = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const res = await fetch(`http://localhost:4000/workout/all/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};

const getWorkoutAPI = async (workoutId) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const res = await fetch(
      `http://localhost:4000/workout/${workoutId}/${userId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch workout");
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching workout:", error);
    return null;
  }
};

const createWorkoutAPI = async (workoutName, exercises) => {
  try {
    const res = await fetch("http://localhost:4000/workout/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: workoutName,
        exercises: exercises,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create workout");
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw error;
  }
};

const deleteWorkoutAPI = async (workoutId) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const res = await fetch(
      `http://localhost:4000/workout/delete/${workoutId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to delete workout");
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw error;
  }
};

const updateWorkoutAPI = async (workoutId, workoutName, exercises) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID not found");
    }

    const res = await fetch(
      `http://localhost:4000/workout/update/${workoutId}/${userId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: workoutName,
          exercises: exercises,
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update workout");
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error updating workout:", error);
    throw error;
  }
};

const createSessionAPI = async (workoutId) => {
  try {
    const res = await fetch(
      `http://localhost:4000/session/start/${workoutId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to create session");
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export {
  libraryAPI,
  getWorkoutAPI,
  createWorkoutAPI,
  deleteWorkoutAPI,
  updateWorkoutAPI,
  createSessionAPI,
};
