import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCalendarAlt, FaStar, FaTrash, FaUsers } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Swal from "sweetalert2";
import EmptyState from "../../../components/EmptyState";
import LogoLoader from "../../../components/LogoLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();
  const [searchText, setSearchText] = useState("");

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`);
      return res.data;
    },
    refetchInterval: 2000,
  });

  const handleDeleteReview = (id, scholarshipName) => {
    Swal.fire({
      title: "Delete Review?",
      text: `Review for "${scholarshipName}" will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Review Deleted",
              text: `Review for "${scholarshipName}" has been removed.`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  // Filter reviews based on search
  const filteredReviews = reviews.filter(
    (review) =>
      review.scholarshipName
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      review.universityName?.toLowerCase().includes(searchText.toLowerCase()) ||
      review.userName?.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Calculate statistics
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const uniqueUsers = new Set(reviews.map((r) => r.userEmail)).size;

  const thisMonthReviews = reviews.filter((r) => {
    const reviewDate = new Date(r.reviewDate);
    const now = new Date();
    return (
      reviewDate.getMonth() === now.getMonth() &&
      reviewDate.getFullYear() === now.getFullYear()
    );
  }).length;

  if (isLoading || loading) {
    return <LogoLoader></LogoLoader>;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <MdRateReview className="text-yellow-300" />
              All Reviews
            </h1>
            <p className="text-amber-50">
              Manage and moderate all scholarship reviews
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{reviews.length}</p>
            <p className="text-amber-100">Total Reviews</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Total Reviews
                </p>
                <p className="text-3xl font-bold text-amber-700 mt-2">
                  {reviews.length}
                </p>
              </div>
              <MdRateReview className="text-amber-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-yellow-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-yellow-500 to-amber-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Avg Rating
                </p>
                <p className="text-3xl font-bold text-yellow-700 mt-2">
                  {averageRating}/5
                </p>
              </div>
              <FaStar className="text-yellow-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-blue-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Reviewers
                </p>
                <p className="text-3xl font-bold text-blue-700 mt-2">
                  {uniqueUsers}
                </p>
              </div>
              <FaUsers className="text-blue-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-purple-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  This Month
                </p>
                <p className="text-3xl font-bold text-purple-700 mt-2">
                  {thisMonthReviews}
                </p>
              </div>
              <FaCalendarAlt className="text-purple-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-amber-500 rounded"></span>
          Search Reviews
        </h3>
        <input
          type="search"
          placeholder="Search by scholarship name, university, or reviewer name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {filteredReviews.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-800 w-10">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[180px]">
                    Scholarship
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[140px]">
                    University
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[120px]">
                    Reviewer
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[200px]">
                    Review
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-gray-800 whitespace-nowrap">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-gray-800 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredReviews.map((r, i) => (
                  <tr
                    key={r._id}
                    className="border-b hover:bg-amber-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-700 w-10">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 min-w-[180px]">
                      <p className="font-bold text-gray-800 text-sm line-clamp-2">
                        {r.scholarshipName || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 min-w-[140px]">
                      <p className="font-medium text-gray-700 text-sm">
                        {r.universityName || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {r.userName || "—"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {r.userEmail || "—"}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 min-w-[200px]">
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {r.reviewComment || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg inline-flex">
                        <FaStar className="text-yellow-500" size={14} />
                        <span className="font-bold text-yellow-700">
                          {r.ratingPoint || 0}/5
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {r.reviewDate
                          ? new Date(r.reviewDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "2-digit",
                            })
                          : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        onClick={() =>
                          handleDeleteReview(r._id, r.scholarshipName)
                        }
                        className="btn btn-sm btn-square bg-red-600 text-white border-0 hover:bg-red-700 transition-colors"
                        title="Delete Review"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="text-center text-sm text-gray-600">
        Showing {filteredReviews.length} of {reviews.length} reviews
      </div>
    </div>
  );
};

export default AllReviews;
