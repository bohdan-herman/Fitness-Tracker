import { redirect } from "react-router-dom";

const authRequiredAPI = async () => {
  const res = await fetch("http://localhost:4000/auth/checkAuth", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return redirect("/login");
  }

  const data = await res.json();

  if (data?.data?.id) {
    localStorage.setItem("userId", data.data.id);
  }

  return data;
};

export default authRequiredAPI;
