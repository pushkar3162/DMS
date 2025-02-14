import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RoleBasedUI = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [permission, setPermission] = useState("Commentor");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);

  const rolePermissions = {
    Admin: ["Editor"],
    User: ["Viewer", "Commentor"],
  };

  useEffect(() => {
    setPermission(rolePermissions[role][0]);
  }, [role]);

  const addUser = async () => {
    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Invalid email format.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user_roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          role,
          sub_role: permission,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add user");
      }

      setSuccess("User added successfully!");
      setUsers([...users, { email, role, permission }]);
      setEmail("");
      setRole("User");
      setPermission("Commentor");
    } catch (err) {
      console.error("Error adding user:", err);
      setError(err.message || "Failed to add user. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-bold mb-4">Manage Users & Roles</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3"
        >
          {rolePermissions[role].map((perm) => (
            <option key={perm} value={perm}>{perm}</option>
          ))}
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
{/* Centered Add User button */}
<div className="text-center">
  <button
    onClick={addUser}
    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Add User
  </button>
</div>


        <div className="mt-4 text-center">
          {/* Styled View User List button to match Add User button */}
          <Link
            to="/user-list"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedUI;