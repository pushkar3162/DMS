import React, { useState } from "react";
import Navbar from "../../frontend/src/components/Navbar";
import Sidebar from "../../frontend/src/components/Sidebar";
import FileExplorer from "./components/FileExplorer"; // Importing FileExplorer

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prevState) => !prevState); // Toggle theme
  };

  return (
    <div
      className={`min-h-screen flex flex-col antialiased ${
        isDark ? "dark" : ""
      }`}
    >
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Sidebar isDark={isDark} />

      <main
        className={`p-6 transition-all duration-300 ml-[250px] h-screen ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-2xl font-semibold mb-6">📂 File Manager</h1>
        <FileExplorer /> {/* Adding FileExplorer component */}
      </main>
    </div>
  );
};

export default Dashboard;
