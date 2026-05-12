const homePageAPI = async () => {
  try {
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
    return sessionsData.data || [];
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
};

export default homePageAPI;
