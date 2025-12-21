import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
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
        `/users?filter=${filter}&searchText=${searchText}`
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
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName}'s accont has been deleted`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  if (isLoading) {
    return <LogoLoader></LogoLoader>;
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-secondary">
          Manage Users: {users.length}
        </h2>
        <div className="flex flex-wrap gap-3">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              className="grow"
              placeholder="Search"
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="select"
          >
            <option value="">Pick a role</option>
            <option value="student">Student</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>

              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button>
                    <select
                      value={user.role}
                      onChange={(e) => handleAdminControl(user, e.target.value)}
                      className="select"
                    >
                      <option value="">Pick a role</option>
                      <option value="student">Student</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </button>

                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn bg-transparent border-none shadow-none"
                  >
                    <MdDelete className="text-red-500" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
