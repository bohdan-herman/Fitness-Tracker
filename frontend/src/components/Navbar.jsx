import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../api/authAPI.jsx";

const links = [
  { label: "Home", href: "/" },
  { label: "Exercises", href: "/exercises" },
  { label: "Library", href: "/library" },
  { label: "Statistics", href: "/statistics" },
  { label: "Profile", href: "/profile" },
];

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAPI();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <div className="navbar__brand-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 4v16M18 4v16M3 9h18M3 15h18"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="navbar__brand-text">
          FIT<span>TRACK</span>
        </span>
      </div>

      <ul className="navbar__list">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
              end={link.href === "/"}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        {user?.name && (
          <span className="text-small navbar__user">Hi, {user.name}</span>
        )}
        <button
          className="btn btn-secondary btn-sm"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
