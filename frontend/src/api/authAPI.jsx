const loginAPI = async (name, password) => {
  try {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Login failed");
    }

    const data = await res.json();
    if (data.data.id) {
      localStorage.setItem("userId", data.data.id);
    }
    return data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const registerAPI = async (name, password, confirmPassword) => {
  try {
    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, confirmPassword }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Registration failed");
    }

    const data = await res.json();

    if (data.data.id) {
      localStorage.setItem("userId", data.data.id);
    }
    return data.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

const logoutAPI = async () => {
  try {
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("userId");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export { loginAPI, registerAPI, logoutAPI };
