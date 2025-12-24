import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                : "text-gray-300 hover:text-white transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                : "text-gray-300 hover:text-white transition"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                : "text-gray-300 hover:text-white transition"
            }
          >
            Contact
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard/overview"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        <div>
          {user ? (
            <button
              onClick={() => {
                logout();
                alert("Logged out successfully"); // optional or replace with toast
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
