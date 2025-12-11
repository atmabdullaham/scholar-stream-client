import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

  const limit = 8;

  // REACT QUERY CALL
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
  console.log(data.data);

  const scholarships = data?.data || [];
  const total = data?.total || 0;
  const totalPage = data?.totalPage || 0;

  // SORT HANDLER
  const handleSort = (e) => {
    const [field, ord] = e.target.value.split("-");
    setSort(field);
    setOrder(ord);
  };

  // SEARCH HANDLER
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0);
  };

  //Scholarship CATEGORY FILTER
  const handleScholarshipCategory = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };
  // Degree Filter
  const handleDegree = (e) => {
    setDegree(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div className="md:w-11/12 mx-auto">
      <h2 className="text-3xl font-bold">Total Scholarships: {total}</h2>
      <div className="py-3 w-full">
        <div className="">
          {/* FILTERS */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10">
            {/* SEARCH */}
            <input
              type="search"
              placeholder="Search product..."
              onChange={handleSearch}
              className="input input-bordered w-full max-w-xs"
            />
            <div>
              {/*1. item type filter*/}
              <fieldset className="fieldset">
                <label> Scholarship Category</label>
                <select
                  onClick={handleScholarshipCategory}
                  className="select outline-0 "
                >
                  <option value="">Select Category</option>
                  <option value="Full fund">Full fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self fund">Self fund</option>
                </select>
              </fieldset>
            </div>
            <div>
              {/*2. degree type filter*/}
              <fieldset className="fieldset">
                <label> Degree</label>
                <select onClick={handleDegree} className="select outline-0 ">
                  <option value="">Select degree</option>
                  <option value="Deploma">Deploma</option>
                  <option value="Bechelor">Bechelor</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Post Doctoral">Post Doctoral</option>
                </select>
              </fieldset>
            </div>

            {/* SORT */}
            <select onChange={handleSort} className="select select-bordered">
              <option disabled selected>
                Sort by
              </option>
              <option value="applicationFees-asc">
                Application Fee: Low to High
              </option>
              <option value="applicationFees-desc">
                Application Fee: High to Low
              </option>
              <option value="applicationDeadline-desc">
                Closest Deadline First
              </option>
              <option value="applicationDeadline-asc">
                Farthest Deadline First
              </option>
            </select>
          </div>

          {isLoading && <p className="text-center py-10">Loading...</p>}

          <div class="overflow-x-auto rounded border border-gray-300 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              ></ScholarshipCard>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 py-10">
            {currentPage > 0 && (
              <button
                className="btn"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
            )}

            {[...Array(totalPage).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`btn ${
                  num === currentPage ? "bg-teal-600 text-white" : ""
                }`}
              >
                {num + 1}
              </button>
            ))}

            {currentPage < totalPage - 1 && (
              <button
                className="btn"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto"></div>
      </div>
    </div>
  );
};

export default AllScholarships;
