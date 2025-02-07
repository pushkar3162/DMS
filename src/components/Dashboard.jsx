import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  const toggleTheme = () => {
    setIsDark((prevState) => !prevState); // Toggle theme
  };

  useEffect(() => {
    const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");

    const handleFileChange = () => {
      const file = fileInput.files[0];
      if (!file) return;

      const fileType = file.type;
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target.result;

        // Clear the output container
        output.innerHTML = "";

        // Handle display based on file type
        if (fileType.startsWith("image/")) {
          // Display image
          const img = document.createElement("img");
          img.src = result;
          img.style.maxWidth = "100%";
          output.appendChild(img);
        } else if (fileType === "application/pdf") {
          // Display PDF using iframe
          const iframe = document.createElement("iframe");
          iframe.src = result;
          iframe.style.width = "100%";
          iframe.style.height = "500px";
          output.appendChild(iframe);
        } else if (fileType === "text/plain") {
          // Display plain text
          const pre = document.createElement("pre");
          pre.textContent = result;
          output.appendChild(pre);
        } else {
          // Unsupported file type
          output.innerHTML = `<p>Unsupported file type: ${fileType}</p>`;
        }
      };

      // Read file as data URL (works for most file types)
      if (fileType.startsWith("image/") || fileType === "application/pdf") {
        reader.readAsDataURL(file);
      } else if (fileType === "text/plain") {
        reader.readAsText(file);
      } else {
        output.innerHTML =
          "<p>Unsupported file type. Please upload a PDF, image, or text file.</p>";
      }
    };

    fileInput.addEventListener("change", handleFileChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      fileInput.removeEventListener("change", handleFileChange);
    };
  }, []);

  return (
    <div
      className={`min-h-screen  flex flex-col antialiased ${
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
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        {/* File Upload */}
        <div className="mt-4">
          <label className="block text-lg font-medium mb-2">Upload File</label>
          <input
            type="file"
            id="fileInput"
            className="border p-2 rounded-md w-full sm:w-3/4 md:w-1/2"
          />
          <div id="output" className="mt-4"></div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
