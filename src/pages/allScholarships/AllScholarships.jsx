import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EmptyState from "../../components/EmptyState";
import SkeletonLoader from "../../components/SkeletonLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "./scholarshipCard/ScholarshipCard";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("applicationDeadline");
  const [order, setOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [degree, setDegree] = useState("");

  const limit = 12;

  const { data = {}, isLoading } = useQuery({
    queryKey: [
      "scholarships",
      currentPage,
      sort,
      order,
      searchText,
      category,
      degree,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships?limit=${limit}&skip=${
          currentPage * limit
        }&sort=${sort}&order=${order}&search=${searchText}&category=${category}&degree=${degree}`
      );
      return res.data;
    },
  });

  const scholarships = data?.data || [];
  const total = data?.total || 0;
  const totalPage = data?.totalPage || 0;

  const handleSort = (e) => {
    const [field, ord] = e.target.value.split("-");
    setSort(field);
    setOrder(ord);
    setCurrentPage(0);
  };

  return (
    <section className="w-11/12 md:w-10/12 mx-auto py-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          All Scholarships
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Total Available Scholarships: {total}
        </p>
      </div>

      <div className="bg-teal-50 dark:bg-gray-800 rounded-xl shadow-sm p-5 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Search
            </label>
            <input
              type="search"
              placeholder="Scholarship / University"
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(0);
              }}
              className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All</option>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self fund">Self fund</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Degree
            </label>
            <select
              onChange={(e) => {
                setDegree(e.target.value);
                setCurrentPage(0);
              }}
              className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All</option>
              <option value="Deploma">Diploma</option>
              <option value="Bechelor">Bachelor</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Post Doctoral">Post Doctoral</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort By
            </label>
            <select
              onChange={handleSort}
              className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option disabled selected>
                Select option
              </option>
              <option value="applicationFees-asc">
                Application Fee: Low → High
              </option>
              <option value="applicationFees-desc">
                Application Fee: High → Low
              </option>
              <option value="applicationDeadline-desc">Closest Deadline</option>
              <option value="applicationDeadline-asc">Farthest Deadline</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonLoader count={12} variant="card" />
        </div>
      ) : scholarships.length === 0 ? (
        <EmptyState></EmptyState>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Prev
            </button>
          )}

          {[...Array(totalPage).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`btn ${
                num === currentPage
                  ? "bg-teal-600 text-white dark:bg-teal-700"
                  : "btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {num + 1}
            </button>
          ))}

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Next
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default AllScholarships;
