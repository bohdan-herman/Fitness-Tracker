const getActiveSessionAPI = async () => {
  try {
    const res = await fetch(`http://localhost:4000/session/my-sessions`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sessions");
    }

    const data = await res.json();
    const sessions = data.data || [];
    const activeSession = sessions.find((s) => s.status === "active");
    return activeSession || null;
  } catch (error) {
    console.error("Error fetching active session:", error);
    return null;
  }
};

const getSessionAPI = async (sessionId) => {
  try {
    // Сначала получим все сессии текущего пользователя
    const res = await fetch(`http://localhost:4000/session/my-sessions`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sessions");
    }

    const data = await res.json();
    const sessions = data.data || [];
    const session = sessions.find((s) => s.id === sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Возвращаем всю информацию о сессии с упражнениями
    return {
      ...session,
      sets: session.sets || [],
      workout: {
        ...session.workout,
        exercises: session.workout?.exercises || [],
      },
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

const endSessionAPI = async (sessionId, sets = []) => {
  const res = await fetch(`http://localhost:4000/session/end/${sessionId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sets }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Failed to end session");
  }

  const data = await res.json();
  return data.data;
};

export { endSessionAPI, getActiveSessionAPI, getSessionAPI };
