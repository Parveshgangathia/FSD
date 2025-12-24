import { Outlet, NavLink } from "react-router-dom";

function DashboardLayout() {
  const linkClass = ({ isActive }) =>
    isActive ? "font-semibold text-blue-600" : "text-gray-600";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
    <aside className="w-56 p-4 border-r bg-gray-50">
  <nav className="flex flex-col gap-3">
    <NavLink
      to="overview"
      className={({ isActive }) =>
        `block px-3 py-2 rounded ${
          isActive
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      Overview
    </NavLink>

    <NavLink
      to="projects"
      className={({ isActive }) =>
        `block px-3 py-2 rounded ${
          isActive
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      Projects
    </NavLink>

    <NavLink
      to="settings"
      className={({ isActive }) =>
        `block px-3 py-2 rounded ${
          isActive
            ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      Settings
    </NavLink>
  </nav>
</aside>


      {/* Nested content */}
      <main className="p-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
