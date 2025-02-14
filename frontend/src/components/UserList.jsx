import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/user_roles");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/user_roles", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user.");
      }

      setUsers(users.filter((user) => user.user_email !== email));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">User List</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Permission</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.user_email} className="border-b">
                  <td className="border p-2">{user.user_email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">{user.sub_role}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => deleteUser(user.user_email)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4 text-center">
          <Link
            to="/RoleBasedUI"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserList;
