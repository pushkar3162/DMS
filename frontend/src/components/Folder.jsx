import React, { useState } from "react";
import axios from "axios";
import { useDrag, useDrop } from "react-dnd";

const Folder = ({ folder, fetchFolders, moveFolder, setSelectedFolder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);

    const deleteFolder = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/folders/${folder._id}`);
            fetchFolders();
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "FOLDER",
        item: { id: folder._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop({
        accept: "FOLDER",
        drop: (draggedItem) => {
            if (draggedItem.id !== folder._id) {
                moveFolder(draggedItem.id, folder._id);
            }
        },
    });

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({
            x: e.pageX,
            y: e.pageY
        });
    };

    const renameFolder = async () => {
        const newName = prompt("Enter new folder name:");
        if (newName) {
            await axios.put(`http://localhost:5000/api/folders/${folder._id}`, { name: newName });
            fetchFolders();
        }
        setContextMenu(null);
    };

    const moveFolderPrompt = async () => {
        const newParentId = prompt("Enter the ID of the new parent folder:");
        if (newParentId) {
            await moveFolder(folder._id, newParentId);
        }
        setContextMenu(null);
    };

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{
                paddingLeft: "20px",
                border: "1px solid #ccc",
                margin: "5px",
                padding: "10px",
                opacity: isDragging ? 0.5 : 1,
                cursor: "pointer",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px"
            }}
            onClick={() => {
                setIsOpen(!isOpen);
                setSelectedFolder(folder._id);
            }}
            onContextMenu={handleContextMenu}
        >
            📁 {folder.name}

            {isOpen && folder.files && folder.files.length > 0 && (
                <ul style={{ marginLeft: "20px", listStyleType: "none" }}>
                    {folder.files.map((file) => (
                        <li key={file._id} style={{ padding: "2px 5px", background: "#eef", margin: "2px 0", borderRadius: "3px" }}>
                            📄 {file.name}
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && folder.children && folder.children.length > 0 && (
                <div style={{ marginLeft: "20px" }}>
                    {folder.children.map((child) => (
                        <Folder key={child._id} folder={child} fetchFolders={fetchFolders} moveFolder={moveFolder} setSelectedFolder={setSelectedFolder} />
                    ))}
                </div>
            )}

            {contextMenu && (
                <div
                    style={{
                        position: "absolute",
                        top: contextMenu.y,
                        left: contextMenu.x,
                        background: "white",
                        border: "1px solid #ccc",
                        padding: "5px",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px"
                    }}
                >
                    <button style={buttonStyle} onClick={renameFolder}>Rename</button>
                    <button style={buttonStyle} onClick={moveFolderPrompt}>Move</button>
                    <button style={buttonStyle} onClick={deleteFolder}>Delete</button>
                </div>
            )}
        </div>
    );
};

const buttonStyle = {
    border: "2px solid #ccc",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    minWidth: "80px",
};

export default Folder;
