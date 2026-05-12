const profileAPI = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("User ID not found");
    }

    const res = await fetch(`http://localhost:4000/profile/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

const updateProfileNameAPI = async (newName) => {
  try {
    const res = await fetch(`http://localhost:4000/profile/update/name`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error updating profile:", error);
    return null;
  }
};

export { profileAPI, updateProfileNameAPI };
