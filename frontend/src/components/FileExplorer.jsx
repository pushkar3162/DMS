import axios from "axios";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaFolderPlus, FaSort, FaSyncAlt, FaUpload } from "react-icons/fa";
import Folder from "./Folder";

const FileExplorer = () => {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchFolders();
    }, []);

    const fetchFolders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/folders");
            setFolders(res.data.folders);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    const createFolder = async () => {
        const name = prompt("Enter folder name:");
        if (name) {
            try {
                await axios.post("http://localhost:5000/api/folders/create", { name });
                fetchFolders();
            } catch (error) {
                console.error("Error creating folder:", error);
            }
        }
    };

    const handleFileUpload = async (event) => {
        if (!selectedFolder) {
            alert("Please select a folder first.");
            return;
        }

        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderId", selectedFolder);

        try {
            await axios.post("http://localhost:5000/api/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("File uploaded successfully!");
            fetchFolders();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const sortFolders = (criteria) => {
        let sortedFolders = [...folders];
        
        if (criteria === "name") {
            sortedFolders.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === "modifiedDate") {
            sortedFolders.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
        } else if (criteria === "size") {
            sortedFolders.sort((a, b) => a.size - b.size);
        }
        
        setSortBy(criteria);
        setFolders(sortedFolders);
        setIsDropdownOpen(false);
    };
    const handleFileSearch = (searchedValue) => {
        setSearchValue(searchedValue);
    };
      // Filter the folders and files based on the search value
const filteredFolders = folders.filter((folder) => {
    const folderNameMatch = folder.name
    .toLowerCase()
    .includes(searchValue.toLowerCase());
    const fileNamesMatch = folder.files.some((file) =>
    file.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return folderNameMatch || fileNamesMatch;
});
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="file-explorer-container">
        <div className="toolbar">
        <div className="file-search-container">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
            >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>

            <input
            className="file-search-container-input"
            type="text"
            placeholder="Search your documents here..."
            onChange={(e) => handleFileSearch(e.target.value)}
            />
        </div>

        <button className="btn bordered-btn" onClick={createFolder}>
            <FaFolderPlus /> New Folder
        </button>

        <button
            className="btn bordered-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
            <FaSort /> Sort By {sortBy ? `(${sortBy})` : ""}
        </button>
        <button className="btn bordered-btn" onClick={fetchFolders}>
            <FaSyncAlt /> Refresh
        </button>

        {selectedFolder && (
            <>
            <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
            <button
                className="btn bordered-btn"
                onClick={() => document.getElementById("fileUpload").click()}
            >
                <FaUpload /> Upload
            </button>
            </>
        )}
        </div>

        {isDropdownOpen && (
        <div className="dropdown">
            <p onClick={() => sortFolders("name")}>Name</p>
            <p onClick={() => sortFolders("modifiedDate")}>Modified Date</p>
            <p onClick={() => sortFolders("size")}>Size</p>
        </div>
        )}

        <div className="folder-container">
        {filteredFolders.map((folder) => (
            <Folder
            key={folder._id}
            folder={folder}
            fetchFolders={fetchFolders}
            setSelectedFolder={setSelectedFolder}
            />
        ))}
        </div>
    </div>

    <style>
        {`
            .bordered-btn {
            border: 2px solid #ccc;
            padding: 8px 12px;
            border-radius: 5px;
            background-color: #f8f9fa;
            transition: all 0.3s ease;
            }
            .bordered-btn:hover {
            border-color: #007bff;
            background-color: #e9ecef;
            }
            .dropdown {
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            padding: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 10;
            }
            .dropdown p {
            margin: 5px 0;
            cursor: pointer;
            }
            .dropdown p:hover {
            background-color: #f1f1f1;
            }
            .file-search-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 5px 10px;
            width: 30%;
            border: 1px solid rgb(212, 212, 212);
            border-radius: 5px;
            margin: 10px 0px;
            }
            .file-search-container-input {
            margin-left: 10px;
            border: none !important;
            outline: none !important;
            }
        `}
    </style>
    </DndProvider>
);
};

export default FileExplorer;