import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FaShieldAlt,
  FaTrash,
  FaUserCog,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import Swal from "sweetalert2";
import EmptyState from "../../../components/EmptyState";
import LogoLoader from "../../../components/LogoLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const {
    isLoading,
    refetch,
    data: users = [],
  } = useQuery({
    queryKey: ["users", searchText, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?filter=${filter}&searchText=${searchText}`,
      );
      return res.data;
    },
  });

  const handleAdminControl = (user, role) => {
    if (!role) return;

    axiosSecure.patch(`/users/${user._id}/role`, { role }).then((res) => {
      refetch();

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as ${role}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: `"${user.displayName}" will be permanently deleted from the system.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Deleted",
              text: `"${user.displayName}" account has been deleted.`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };
  if (isLoading) {
    return <LogoLoader></LogoLoader>;
  }

  // Calculate statistics
  const studentCount = users.filter((u) => u.role === "student").length;
  const moderatorCount = users.filter((u) => u.role === "moderator").length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <FaUsers className="text-teal-200" />
              Users Management
            </h1>
            <p className="text-teal-50">Manage user roles and permissions</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{users.length}</p>
            <p className="text-teal-100">Total Users</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-teal-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-teal-600 to-indigo-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-teal-700 mt-2">
                  {users.length}
                </p>
              </div>
              <FaUsers className="text-teal-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-blue-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Students
                </p>
                <p className="text-3xl font-bold text-blue-700 mt-2">
                  {studentCount}
                </p>
              </div>
              <FaUserCog className="text-blue-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-purple-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Moderators
                </p>
                <p className="text-3xl font-bold text-purple-700 mt-2">
                  {moderatorCount}
                </p>
              </div>
              <FaShieldAlt className="text-purple-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-indigo-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-indigo-600 to-violet-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Admins
                </p>
                <p className="text-3xl font-bold text-indigo-700 mt-2">
                  {adminCount}
                </p>
              </div>
              <FaUserTie className="text-indigo-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-teal-600 rounded"></span>
          Search & Filter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Users
            </label>
            <input
              type="search"
              placeholder="Search by name or email..."
              onChange={(e) => setSearchText(e.target.value)}
              className="input input-bordered w-full focus:border-teal-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Role
            </label>
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="select select-bordered w-full focus:border-teal-600 focus:outline-none"
            >
              <option value="">All Roles</option>
              <option value="student">Student</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {users.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-teal-50 to-indigo-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-800 w-10">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[200px]">
                    User
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[180px]">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Current Role
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-gray-800 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-teal-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-700 w-10">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 min-w-[200px]">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-circle h-10 w-10">
                            <img
                              src={user?.photoURL}
                              referrerPolicy="no-referrer"
                              alt={user.displayName}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            {user.displayName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 min-w-[180px]">
                      <p className="text-sm text-gray-700 truncate">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : user.role === "moderator"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleAdminControl(user, e.target.value)
                          }
                          className="select select-sm select-bordered focus:border-teal-600 focus:outline-none"
                        >
                          <option disabled>Change Role</option>
                          <option value="student">Student</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="btn btn-sm btn-square bg-red-600 text-white border-0 hover:bg-red-700 transition-colors"
                          title="Delete User"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
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

export default UsersManagement;
