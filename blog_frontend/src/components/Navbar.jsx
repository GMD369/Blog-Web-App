import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User2, FileText } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    setOpen(false);
  };

  const linkClasses = ({ isActive }) =>
    `block text-sm font-medium px-4 py-2 rounded-md transition-all ${
      isActive
        ? "text-indigo-600 bg-indigo-100"
        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50 font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/Home"
            className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            InkCraft
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <NavLink to="/Home" className={linkClasses}>
                  Home
                </NavLink>
                <NavLink to="/myposts" className={linkClasses}>
                  <div className="flex items-center gap-1">
                    <FileText size={16} />
                    My Posts
                  </div>
                </NavLink>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User2 size={18} className="text-indigo-600" />
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md shadow-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClasses}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow-sm text-sm transition"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700 hover:text-indigo-600"
            aria-label="menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-4 py-4 space-y-3">
            {user ? (
              <>
                <NavLink
                  to="/Home"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/myposts"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  <div className="flex items-center gap-1">
                    <FileText size={16} />
                    My Posts
                  </div>
                </NavLink>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User2 size={18} className="text-indigo-600" />
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md transition shadow"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
