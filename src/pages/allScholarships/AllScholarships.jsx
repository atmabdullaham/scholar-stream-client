import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EmptyState from "../../components/EmptyState";
import LogoLoader from "../../components/LogoLoader";
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

  const limit = 9;

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
        <h2 className="text-3xl font-bold text-gray-800">All Scholarships</h2>
        <p className="text-gray-600 mt-1">
          Total Available Scholarships: {total}
        </p>
      </div>

      <div className="bg-teal-100 rounded-xl  shadow-sm p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-gray-700">Search</label>
            <input
              type="search"
              placeholder="Scholarship / University"
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(0);
              }}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="select select-bordered w-full"
            >
              <option value="">All</option>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self fund">Self fund</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Degree</label>
            <select
              onChange={(e) => {
                setDegree(e.target.value);
                setCurrentPage(0);
              }}
              className="select select-bordered w-full"
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
            <label className="text-sm font-medium text-gray-700">Sort By</label>
            <select
              onChange={handleSort}
              className="select select-bordered w-full"
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
      {isLoading && <LogoLoader></LogoLoader>}
      {!isLoading && scholarships.length === 0 ? (
        <EmptyState></EmptyState>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-outline"
            >
              Prev
            </button>
          )}

          {[...Array(totalPage).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`btn ${
                num === currentPage ? "bg-teal-600 text-white" : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-outline"
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
