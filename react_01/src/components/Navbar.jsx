import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
      : "text-gray-300 hover:text-white transition";

  return (
    <nav className="bg-gray-900 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Left links */}
        <div className="flex gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>

          {user && (
            <NavLink to="/dashboard/overview" className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 text-sm rounded border border-gray-600 text-gray-300 hover:text-white hover:border-white transition"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          {/* Auth */}
          {user ? (
            <button
              onClick={() => {
                logout();
                alert("Logged out successfully");
              }}
              className="text-gray-300 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
