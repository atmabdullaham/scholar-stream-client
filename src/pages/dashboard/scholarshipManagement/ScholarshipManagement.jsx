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
        }&search=${searchText}&category=${category}`
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
      <div className="py-3 w-full">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-3xl font-bold">Total Scholarships: {total}</h2>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              <input
                type="search"
                placeholder="Search product..."
                onChange={handleSearch}
                className="input input-bordered w-full max-w-xs"
              />

              <select onClick={handleCategory} className="select outline-0 ">
                <option value="">Select Category</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self fund">Self fund</option>
              </select>
            </div>
          </div>

          {isLoading && <LogoLoader></LogoLoader>}
          <div className="overflow-x-auto">
            {scholarships.length === 0 ? (
              <EmptyState></EmptyState>
            ) : (
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th></th>
                    <th>Scholarship Name</th>
                    <th>University Name</th>
                    <th>Location</th>
                    <th>Degree</th>
                    <th>Category</th>
                    <th>Subject</th>
                    <th>Ranking</th>
                    <th>Deadline</th>
                    <th>Application Fees</th>
                    <th>Charge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((s, i) => (
                    <tr key={s._id}>
                      <th>{i + 1}</th>
                      <td>{s.scholarshipName}</td>
                      <td>{s.universityName}</td>
                      <td>
                        {s.universityCity},{s.universityCountry}
                      </td>
                      <td>{s.degree}</td>
                      <td>{s.scholarshipCategory}</td>
                      <td>{s.subjectCategory}</td>
                      <td>{s.universityWorldRank}</td>
                      <td>
                        {format(new Date(s.applicationDeadline), "dd MMM yyyy")}
                      </td>

                      <td>${s.applicationFees}</td>
                      <td>${s.serviceCharge}</td>
                      <td>
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
            )}
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
