import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ onSearch, onGenreChange, genres }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [searchInput, setSearchInput] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  const handleGenreChange = (e) => {
    onGenreChange(e.target.value);
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="text-white hover:text-indigo-400 transition">🎬 MovieTime</Link>
        </div>

        {/* Middle: Search + Filter (Only on Home) */}
        {location.pathname === "/" && (
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
            {/* Genre Dropdown */}
            <select
              onChange={handleGenreChange}
              className="bg-white text-gray-800 px-3 py-1 rounded-md text-sm focus:outline-none w-full sm:w-auto"
            >
              <option value="">All Genres</option>
              {genres.map((g, idx) => (
                <option key={idx} value={g}>{g}</option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchInput}
                onChange={handleSearchChange}
                className="pl-8 pr-3 py-1 rounded-md w-full text-sm text-gray-900 focus:outline-none"
              />
              <span className="absolute left-2 top-0.5 text-gray-500 text-sm">🔍</span>
            </div>
          </div>
        )}

        {/* Right: Auth/Bookings */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
              <Link to="/my-bookings" className="text-sm hover:underline">My Bookings</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:underline">Login</Link>
              <Link to="/signup" className="text-sm hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
