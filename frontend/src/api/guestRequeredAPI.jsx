import { redirect } from "react-router-dom";

const guestRequeredAPI = async () => {
  const res = await fetch("http://localhost:4000/auth/checkAuth", {
    method: "GET",
    credentials: "include",
  });

  if (res.ok) {
    return redirect("/");
  }

  return null;
};

export default guestRequeredAPI;
