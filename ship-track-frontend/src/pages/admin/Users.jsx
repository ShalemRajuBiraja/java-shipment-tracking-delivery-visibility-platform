import { useState, useEffect } from "react";
import {
  Search,
  UsersRound,
  Shield,
  MoreVertical,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";
import { adminDeleteUserApi, getUsersApi } from "../../services/adminService";

const Users = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {

  const fetchUsers = async () => {

    try {

      const response = await getUsersApi();

      if (response.data.success === true) {

        setUsers(response.data.data);
        console.log( "Users fetched:", response.data.data );
      } else {

        console.error("Failed to fetch users:",  response.data.message );
      }

    } catch (error) {
        console.error( "Error fetching users:", error );
    }

  };

  fetchUsers();

}, []);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      selectedRole === "ALL" ||
      user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  // Role badge styling
  const getRoleStyle = (role) => {
    switch (role) {
      case "CUSTOMER":
        return "bg-blue-50 text-blue-700";

      case "BUSINESS_CLIENT":
        return "bg-amber-50 text-amber-700";

      case "LOGISTICS_OPERATOR":
        return "bg-emerald-50 text-emerald-700";

      case "SUPPORT_AGENT":
        return "bg-purple-50 text-purple-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setActiveMenu(null);
  };

  // Delete user
 const confirmDeleteUser = async () => {

  if (!selectedUser) return;

  try {

    const response = await adminDeleteUserApi(
      selectedUser.id
    );

    if (response.data.success === true) {

      // Remove deleted user from table
      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.id !== selectedUser.id
        )
      );

      // Show success message
      toast.success(
        `${selectedUser.name} deleted successfully`
      );

      // Close delete confirmation modal
      setSelectedUser(null);

    } else {

      toast.error(
        response.data.message || "Failed to delete user"
      );

    }

  } catch (error) {

    console.error(
      "Error deleting user:",
      error
    );

    toast.error(
      "Failed to delete user. Please try again."
    );

  }

};

  return (
    <div className="space-y-5">

      {/* ================= PAGE HEADER ================= */}

      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Users Management
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          View and manage all registered users.
        </p>
      </div>


      {/* ================= SUMMARY CARDS ================= */}

      <div className="flex flex-wrap gap-3">

        {/* Total Users */}

        <div className="w-full sm:w-64 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center">

              <UsersRound
                size={16}
                className="text-emerald-600"
              />

            </div>

            <div>

              <p className="text-xs text-slate-500">
                Total Users
              </p>

              <h3 className="text-base font-bold text-slate-800">
                {users.length}
              </h3>

            </div>

          </div>

        </div>


        {/* User Roles */}

        <div className="w-full sm:w-64 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center">

              <Shield
                size={16}
                className="text-emerald-600"
              />

            </div>

            <div>

              <p className="text-xs text-slate-500">
                User Roles
              </p>

              <h3 className="text-base font-bold text-slate-800">
                4
              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* ================= USERS TABLE ================= */}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

        {/* Table Header */}

        <div className="p-4 border-b border-slate-200">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div>

              <h2 className="text-base font-bold text-slate-800">
                All Users
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Manage registered users and their roles.
              </p>

            </div>


            {/* Search and Filter */}

            <div className="flex flex-col sm:flex-row gap-3">

              {/* Search */}

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  className="w-full sm:w-56 pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />

              </div>


              {/* Role Filter */}

              <select
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(event.target.value)
                }
                className="px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >

                <option value="ALL">
                  All Roles
                </option>

                <option value="CUSTOMER">
                  Customer
                </option>

                <option value="BUSINESS_CLIENT">
                  Business Client
                </option>

                <option value="LOGISTICS_OPERATOR">
                  Logistics Operator
                </option>

                <option value="SUPPORT_AGENT">
                  Support Agent
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  USER
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  EMAIL
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  ROLE
                </th>

                <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500">
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.length > 0 ? (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >

                    {/* User */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold text-sm">

                          {user.name.charAt(0).toUpperCase()}

                        </div>

                        <span className="font-medium text-slate-800">
                          {user.name}
                        </span>

                      </div>

                    </td>


                    {/* Email */}

                    <td className="px-5 py-4 text-slate-600">
                      {user.email}
                    </td>


                    {/* Role */}

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${getRoleStyle(
                          user.role
                        )}`}
                      >
                        {user.role.replaceAll("_", " ")}
                      </span>

                    </td>


                    {/* ================= ACTION MENU ================= */}

                    <td className="px-5 py-4 text-center">

                      <div className="relative inline-block">

                        {/* Three Dot Button */}

                        <button
                          onClick={() =>
                            setActiveMenu(
                              activeMenu === user.id
                                ? null
                                : user.id
                            )
                          }
                          className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                          title="User options"
                        >

                          <MoreVertical size={18} />

                        </button>


                        {/* Dropdown */}

                        {activeMenu === user.id && (

                          <div className="absolute right-0 top-10 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">

                            <button
                              onClick={() =>
                                handleDeleteClick(user)
                              }
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                            >

                              <Trash2 size={16} />

                              Delete User

                            </button>

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-10 text-sm text-slate-500"
                  >
                    No users found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* Bottom Info */}

        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200">

          <p className="text-xs text-slate-500">
            Showing {filteredUsers.length} of {users.length} users
          </p>

        </div>

      </div>


      {/* ================= DELETE CONFIRMATION MODAL ================= */}

      {selectedUser && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedUser(null)}
          />


          {/* Modal */}

          <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6">

            {/* Close Button */}

            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
            >

              <X size={20} />

            </button>


            {/* Warning Icon */}

            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">

              <AlertTriangle
                size={24}
                className="text-red-600"
              />

            </div>


            <h2 className="text-lg font-bold text-slate-800">
              Delete User?
            </h2>


            <p className="text-sm text-slate-500 mt-2">

              Are you sure you want to delete{" "}

              <span className="font-semibold text-slate-700">
                {selectedUser.name}
              </span>

              ? This action cannot be undone.

            </p>


            {/* Buttons */}

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2.5 text-sm font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>


              <button
                onClick={confirmDeleteUser}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >

                <Trash2 size={17} />

                Delete User

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Users;