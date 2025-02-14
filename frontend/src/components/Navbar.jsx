import React from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./Searchbar";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <div className="flex items-center bg-gray-700 w-full py-2 px-4">

      {/* Left Section: Admin Icon & Name */}
      <div className="flex items-center">
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md"
          src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
          alt="Admin Avatar"
        />
        <span className="hidden md:block text-white font-semibold">ADMIN</span>
      </div>

      {/* Center: Fully Centered Search Bar */}
      <div className="flex-grow flex justify-center">
        <SearchBar />
      </div>

      {/* Right Section: Add Users, Theme Toggle, and Logout */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/RoleBasedUI")}
          className="bg-white hover:bg-gray-200 text-black py-1 px-4 rounded-md text-sm shadow-md"
        >
          Add Users
        </button>

        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

        <button onClick={handleLogout} className="flex items-center text-white hover:text-gray-200">
          <span className="mr-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
