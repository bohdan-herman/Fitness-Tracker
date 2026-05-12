import { Outlet, useRouteLoaderData } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

const Layout = () => {
  const rootData = useRouteLoaderData("root");
  const user = rootData?.data;

  return (
    <div className="layout">
      <Navbar user={user} />
      <Outlet />
    </div>
  );
};

export default Layout;
