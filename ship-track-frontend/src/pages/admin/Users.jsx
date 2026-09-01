import { useState } from "react";
import {
  Search,
  UsersRound,
  Shield,
  MoreVertical,
} from "lucide-react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");

  // Temporary static data
  const users = [
    {
      id: 1,
      name: "Raju Kumar",
      email: "raju@gmail.com",
      role: "CUSTOMER",
    },
    {
      id: 2,
      name: "ABC Logistics",
      email: "abc@logistics.com",
      role: "BUSINESS_CLIENT",
    },
    {
      id: 3,
      name: "Suresh Kumar",
      email: "suresh@gmail.com",
      role: "LOGISTICS_OPERATOR",
    },
    {
      id: 4,
      name: "Anjali Sharma",
      email: "anjali@gmail.com",
      role: "SUPPORT_AGENT",
    },
    {
      id: 5,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      role: "CUSTOMER",
    },
  ];

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

  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">
          Users Management
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          View and manage all registered users.
        </p>
      </div>

      {/* Summary Cards */}
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




      {/* Users Table */}
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
                <option value="ALL">All Roles</option>

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


        {/* Table */}
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


                    {/* Action */}
                    <td className="px-5 py-4 text-center">

                      <button
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                        title="User options"
                      >
                        <MoreVertical size={18} />
                      </button>

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

    </div>
  );
};

export default Users;