import { NavLink, useNavigate } from "react-router-dom";
import { logoutAPI } from "../api/authAPI.jsx";

const links = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 12l9-9 9 9v2H4v-2z" fill="currentColor" />
        <path d="M9 12h6v8H9z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Exercises",
    href: "/exercises",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 4h4v16H6V4z" fill="currentColor" />
        <path d="M14 4h4v16h-4V4z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Library",
    href: "/library",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 2h5v20H4V2z" fill="currentColor" />
        <path d="M10 2h5v20h-5V2z" fill="currentColor" />
        <path d="M16 2h4v20h-4V2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Statistics",
    href: "/statistics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 20h18v2H3z" fill="currentColor" />
        <path d="M5 18h2v-8H5v8z" fill="currentColor" />
        <path d="M11 18h2v-14h-2v14z" fill="currentColor" />
        <path d="M17 18h2v-4h-2v4z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
          fill="currentColor"
        />
      </svg>
    ),
  },
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
              title={link.label}
            >
              <span className="nav-link__icon">{link.icon}</span>
              <span className="nav-link__label">{link.label}</span>
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
