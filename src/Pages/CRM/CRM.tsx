import { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  isBusiness: boolean;
  isAdmin: boolean;
}

const CRM = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
          {
            headers: { "x-auth-token": token }
          }
        );
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (user?.role !== "admin") {
    return <Navigate to="/signin" />;
  }

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        { isBusiness: !currentStatus },
        {
          headers: { "x-auth-token": token }
        }
      );
      setUsers(users.map(u => u._id === userId ? { ...u, isBusiness: !currentStatus } : u));
      toast.success("User status updated");
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const deleteUser = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      toast.error("Cannot delete admin user");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        {
          headers: { "x-auth-token": token }
        }
      );
      setUsers(users.filter(u => u._id !== userId));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold dark:text-white mb-6">CRM - User Management</h1>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3">{u.name.first} {u.name.last}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">
                      {u.isAdmin ? "Admin" : u.isBusiness ? "Business" : "Regular"}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      {!u.isAdmin && (
                        <>
                          <button
                            onClick={() => toggleUserStatus(u._id, u.isBusiness)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            {u.isBusiness ? "Make Regular" : "Make Business"}
                          </button>
                          <button
                            onClick={() => deleteUser(u._id, u.isAdmin)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRM;
