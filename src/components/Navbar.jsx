import React from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./Searchbar";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate(); //

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/"); //  Redirect to login page
  };

  return (
    <div className="flex justify-between items-center h-bg-blue-800 dark:bg-red-800 w-full py-2">
      {/* Admin Avatar and Name Section */}
      <div className="flex items-center">
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
          src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
          alt="Admin Avatar"
        />
        <span className="hidden md:block text-white">ADMIN</span>
      </div>

      {/* Search Bar */}
      <SearchBar />

      <ul className="flex items-center">
        <li>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </li>
        <li>
          <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center mr-4 hover:text-blue-100"
          >
            <span className="inline-flex mr-1">
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
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
