import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Exercises from "../pages/Exercises";
import Library from "../pages/Library";
import Profile from "../pages/Profile";
import Statistics from "../pages/Statistics";
import Session from "../pages/Session";
import authRequeredAPI from "../api/authRequiredAPI.jsx";
import guestRequeredAPI from "../api/guestRequeredAPI.jsx";
import homePageAPI from "../api/homePageAPI.jsx";
import { exercisesAPI } from "../api/exercisesAPI.jsx";
import { libraryAPI } from "../api/libraryAPI.jsx";
import { profileAPI } from "../api/profileAPI.jsx";
import statisticsAPI from "../api/statisticsAPI.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    id: "root",
    loader: authRequeredAPI,
    children: [
      { index: true, element: <Home />, loader: homePageAPI },
      { path: "exercises", element: <Exercises />, loader: exercisesAPI },
      { path: "library", element: <Library />, loader: libraryAPI },
      { path: "profile", element: <Profile />, loader: profileAPI },
      { path: "statistics", element: <Statistics />, loader: statisticsAPI },
      { path: "session/:sessionId", element: <Session /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: guestRequeredAPI,
  },
]);
