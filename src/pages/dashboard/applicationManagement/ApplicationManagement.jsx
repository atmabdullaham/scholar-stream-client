import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");

  const limit = 10;

  // REACT QUERY CALL
  const {
    refetch,
    data = {},
    isLoading,
  } = useQuery({
    queryKey: [
      "applications",
      currentPage,
      sort,
      order,
      searchText,
      applicationStatus,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?limit=${limit}&skip=${
          currentPage * limit
        }&sort=${sort}&order=${order}&search=${searchText}&applicationStatus=${applicationStatus}`
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
  const handleApplicationStatusFilter = (e) => {
    setApplicationStatus(e.target.value);
    console.log(e.target.value);
    setCurrentPage(0);
  };
  //
  const handleShowDetails = (id) => {
    console.log(id);
  };
  //
  const handleGiveFeedback = (id) => {
    console.log(id);
  };

  const handleChangeApplicationStatus = (e, id, status) => {
    if (e.target.value) {
      console.log(e.target.value);
      status = e.target.value;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `The application will marked as ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        const statusInfo = { applicationStatus: status };
        axiosSecure.patch(`/applications/${id}`, statusInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Application Status Changed  to ${status}`,
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
      <h2 className="text-3xl font-bold">Total Applications: {total}</h2>
      <div className="py-3 w-full">
        <div className="">
          {/* FILTERS */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10">
            {/* SEARCH */}
            <div>
              <label> Search Application by University Name, or Degree</label>
              <input
                type="search"
                placeholder="Search Application by University name or Degree..."
                onChange={handleSearch}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div>
              {/*1. item type */}
              <fieldset className="fieldset">
                <label> Filter by Application Status</label>
                <select
                  onChange={handleApplicationStatusFilter}
                  className="select outline-0 "
                >
                  <option value="">Status Update</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </fieldset>
            </div>

            {/* SORT */}
            <div>
              <label> Sort By Date</label>
              <select onChange={handleSort} className="select select-bordered">
                <option disabled selected>
                  Sort by
                </option>
                <option value="applicationDate-desc">Newest First</option>
                <option value="applicationDate-asc">Oldest First</option>
              </select>
            </div>
          </div>

          {isLoading && <p className="text-center py-10">Loading...</p>}

          <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
            <table class="min-w-full divide-y-2 divide-gray-200">
              <thead class="ltr:text-left rtl:text-right">
                <tr class="*:font-medium *:text-gray-900">
                  <th>#</th>
                  <th>Applicant Name</th>
                  <th>Applicant Email</th>
                  <th>University Name</th>
                  <th>Application Feedback</th>
                  <th>Application Status</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                {scholarships.map((s, i) => (
                  <tr class="*:text-gray-900 *:first:font-medium" key={s._id}>
                    <td class="px-1 py-2 whitespace-nowrap">{i + 1}</td>
                    <td class="px-1 py-2 whitespace-nowrap">{s.userName}</td>

                    <td class="px-1 py-2 whitespace-nowrap">{s.userEmail}</td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.universityName}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">{s.feedback}</td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.applicationStatus}
                    </td>
                    <td class="px-1 py-2 whitespace-nowrap">
                      {s.paymentStatus}
                    </td>

                    <td class="px-1 py-2 whitespace-nowrap">
                      <button
                        onClick={() => handleShowDetails(s._id)}
                        className="btn "
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleGiveFeedback(s._id)}
                        className="btn "
                      >
                        Feedback
                      </button>

                      <button>
                        {/*application status */}
                        <fieldset className="fieldset">
                          <select
                            onChange={(e) =>
                              handleChangeApplicationStatus(e, s._id, "nothing")
                            }
                            className="select outline-0 "
                          >
                            <option value="">Status Update</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </fieldset>
                      </button>
                      <button
                        onClick={(e) =>
                          handleChangeApplicationStatus(e, s._id, "rejected")
                        }
                        className="btn "
                      >
                        Cancel
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
      <div>
        <div className="overflow-x-auto"></div>
      </div>
    </div>
  );
};

export default ApplicationManagement;
