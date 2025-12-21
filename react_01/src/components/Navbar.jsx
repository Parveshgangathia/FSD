import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? "text-blue-400" : "hover:text-gray-300";

  return (
    <nav className="sticky top-0 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto flex gap-6 p-4">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
