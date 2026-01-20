import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";
import EmptyState from "../../../components/EmptyState";
import LogoLoader from "../../../components/LogoLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ScholarshipManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const limit = 15;

  // REACT QUERY CALL
  const {
    refetch,
    data = {},
    isLoading,
  } = useQuery({
    queryKey: ["scholarships", currentPage, searchText, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships?limit=${limit}&skip=${
          currentPage * limit
        }&search=${searchText}&category=${category}`,
      );
      return res.data;
    },
  });

  const scholarships = data?.data || [];
  const total = data?.total || 0;
  const totalPage = data?.totalPage || 0;

  // SEARCH HANDLER
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0);
  };

  // CATEGORY FILTER
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };

  const handleDelete = (id, scholarshipName) => {
    Swal.fire({
      title: "Delete Scholarship?",
      text: `"${scholarshipName}" will be permanently deleted from the database.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Scholarship Deleted",
              text: `"${scholarshipName}" has been removed.`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  if (loading || isLoading) {
    return <LogoLoader></LogoLoader>;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Scholarship Management</h1>
            <p className="text-teal-50">
              Manage all scholarships in your system
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{total}</p>
            <p className="text-teal-100">Total Scholarships</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-teal-600 rounded"></span>
          Search & Filter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Scholarship
            </label>
            <input
              type="search"
              placeholder="Enter scholarship or university name..."
              onChange={handleSearch}
              className="input input-bordered w-full focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              onChange={handleCategory}
              className="select select-bordered w-full focus:border-teal-600 focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="Full fund">Full Fund</option>
              <option value="Partial">Partial</option>
              <option value="Self fund">Self Fund</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchText("");
                setCategory("");
                setCurrentPage(0);
              }}
              className="btn btn-outline w-full text-teal-600 border-teal-600 hover:bg-teal-50 hover:border-teal-600"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {scholarships.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-teal-50 to-indigo-50 border-b-2 border-gray-200">
                  <th className="px-3 py-3 text-left font-bold text-gray-800 w-10">
                    #
                  </th>
                  <th className="px-3 py-3 text-left font-bold text-gray-800 min-w-[200px]">
                    Scholarship
                  </th>
                  <th className="px-3 py-3 text-left font-bold text-gray-800 min-w-[150px]">
                    University
                  </th>
                  <th className="px-3 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Degree
                  </th>
                  <th className="px-3 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Type
                  </th>
                  <th className="px-3 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Deadline
                  </th>
                  <th className="px-3 py-3 text-right font-bold text-gray-800 whitespace-nowrap">
                    Fees
                  </th>
                  <th className="px-3 py-3 text-center font-bold text-gray-800 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((scholarship, index) => (
                  <tr
                    key={scholarship._id}
                    className="border-b hover:bg-teal-50 transition-colors duration-200"
                  >
                    <td className="px-3 py-3 font-semibold text-gray-700 w-10">
                      {currentPage * limit + index + 1}
                    </td>
                    <td className="px-3 py-3 min-w-[200px]">
                      <div>
                        <p className="font-bold text-gray-800 line-clamp-1 text-sm">
                          {scholarship.scholarshipName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {scholarship.universityCity},{" "}
                          {scholarship.universityCountry}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 py-3 min-w-[150px]">
                      <p className="font-medium text-gray-700 line-clamp-1 text-sm">
                        {scholarship.universityName}
                      </p>
                      <p className="text-xs text-gray-500">
                        #{scholarship.universityWorldRank}
                      </p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">
                        {scholarship.degree}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          scholarship.scholarshipCategory === "Full fund"
                            ? "bg-green-100 text-green-700"
                            : scholarship.scholarshipCategory === "Partial"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {scholarship.scholarshipCategory === "Full fund"
                          ? "Full"
                          : scholarship.scholarshipCategory === "Partial"
                            ? "Part"
                            : "Self"}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-700">
                        {format(
                          new Date(scholarship.applicationDeadline),
                          "dd MMM yy",
                        )}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-teal-600">
                        ${scholarship.applicationFees}
                      </div>
                      <div className="text-xs text-gray-500">
                        +${scholarship.serviceCharge}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          to={`/dashboard/update-scholarship/${scholarship._id}`}
                          className="btn btn-sm btn-square bg-teal-600 text-white border-0 hover:bg-teal-700 transition-colors"
                          title="Edit Scholarship"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(
                              scholarship._id,
                              scholarship.scholarshipName,
                            )
                          }
                          className="btn btn-sm btn-square bg-red-600 text-white border-0 hover:bg-red-700 transition-colors"
                          title="Delete Scholarship"
                        >
                          <MdDelete size={14} />
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

      {/* Pagination Section */}
      {totalPage > 1 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-sm border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
              >
                ← Previous
              </button>
            )}

            {[...Array(totalPage).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`btn btn-sm ${
                  num === currentPage
                    ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {num + 1}
              </button>
            ))}

            {currentPage < totalPage - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-sm border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
              >
                Next →
              </button>
            )}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Page {currentPage + 1} of {totalPage} • Showing{" "}
            {scholarships.length} of {total} scholarships
          </p>
        </div>
      )}
    </div>
  );
};

export default ScholarshipManagement;
