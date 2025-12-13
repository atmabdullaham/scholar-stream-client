import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ScholarshipManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const limit = 8;

  // REACT QUERY CALL
  const {
    refetch,
    data = {},
    isLoading,
  } = useQuery({
    queryKey: ["scholarships", currentPage, sort, order, searchText, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships?limit=${limit}&skip=${
          currentPage * limit
        }&sort=${sort}&order=${order}&search=${searchText}&category=${category}`
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
    setCurrentPage(0); // reset pagination
  };

  // CATEGORY FILTER
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The product will deleted from database permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Product deleted from database permanently`,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    });
  };

  return (
    <div>
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
              {/*1. item type */}
              <fieldset className="fieldset">
                <select onClick={handleCategory} className="select outline-0 ">
                  <option value="">Select Category</option>
                  <option value="Full fund">Full fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self fund">Self fund</option>
                </select>
              </fieldset>
            </div>

            {/* SORT */}
            <select onChange={handleSort} className="select select-bordered">
              <option disabled selected>
                Sort by
              </option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="weight-asc">Weight: Low → High</option>
              <option value="weight-desc">Weight: High → Low</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
            </select>
          </div>

          {isLoading && <p className="text-center py-10">Loading...</p>}

          <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
            <table class="min-w-full divide-y-2 divide-gray-200">
              <thead class="ltr:text-left rtl:text-right">
                <tr class="*:font-medium *:text-gray-900">
                  <th>#</th>
                  <th>
                    Scholarship Name
                    <br />
                    University Name
                  </th>
                  <th>Location</th>
                  <th>Degree</th>
                  <th>Scholarship Category </th>
                  <th>Subject Category</th>
                  <th>Ranking</th>
                  <th>Tution Fees</th>
                  <th>Deadline</th>
                  <th>Application Fees</th>
                  <th>Service Charge</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                {scholarships.map((s, i) => (
                  <tr class="*:text-gray-900 *:first:font-medium" key={s._id}>
                    <td class="px-1 py-2 whitespace-nowrap">{i + 1}</td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      <div>
                        <div className="font-bold">{s.scholarshipName}</div>
                        <div className="text-sm opacity-60">
                          {s.universityName}
                        </div>
                      </div>
                    </td>

                    <td class="px-1 py-2 whitespace-nowrap">
                      <div>
                        <div className="font-bold">{s.universityCountry}</div>
                        <div className="text-sm opacity-60">
                          {s.universityCity}
                        </div>
                      </div>
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">{s.degree}</td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.scholarshipCategory}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.subjectCategory}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.universityWorldRank}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">{s.tuitionFees}</td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.applicationDeadline}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.applicationFees}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.serviceCharge}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      <Link
                        to={`/dashboard/update-scholarship/${s._id}`}
                        className="btn btn-square"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(s._id)}
                        className="btn btn-square"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </div>
  );
};

export default ScholarshipManagement;
