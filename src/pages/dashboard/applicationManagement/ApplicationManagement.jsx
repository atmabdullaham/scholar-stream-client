import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationManagement = () => {
  const axiosSecure = useAxiosSecure();

  // STATE
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const detailsModalRef = useRef();
  const [details, setDetails] = useState({});

  const limit = 10;

  // DATA FETCH
  const {
    data = {},
    isLoading,
    refetch,
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

  const applications = data?.data || [];
  const total = data?.total || 0;
  const totalPage = data?.totalPage || 0;

  // HANDLERS
  const handleSort = (e) => {
    const [field, ord] = e.target.value.split("-");
    setSort(field);
    setOrder(ord);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0);
  };

  const handleStatusFilter = (e) => {
    setApplicationStatus(e.target.value);
    setCurrentPage(0);
  };

  const handleChangeApplicationStatus = (e, id, defaultStatus) => {
    const status = e?.target?.value || defaultStatus;

    Swal.fire({
      title: "Are you sure?",
      text: `Application will be marked as ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/applications/${id}`, { applicationStatus: status })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Status updated",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          });
      }
    });
  };

  // show details
  const handleShowDetails = (id) => {
    const toShow = applications.find((application) => application._id === id);

    setDetails(toShow);
    detailsModalRef.current.showModal();

    console.log(toShow);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Total Applications: {total}</h2>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            placeholder="Search by university or degree"
            onChange={handleSearch}
            className="input input-bordered input-sm w-64"
          />

          <select
            onChange={handleStatusFilter}
            className="select select-bordered select-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            onChange={handleSort}
            className="select select-bordered select-sm"
          >
            <option disabled selected>
              Sort By
            </option>
            <option value="applicationDate-desc">Newest First</option>
            <option value="applicationDate-asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>University</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>{app.userName}</td>
                  <td>{app.userEmail}</td>
                  <td>{app.universityName}</td>
                  <td>{app.feedback || "-"}</td>
                  <td>
                    <span className="badge badge-outline">
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td>{app.paymentStatus}</td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => handleShowDetails(app._id)}
                      className="btn btn-xs btn-outline"
                    >
                      Details
                    </button>

                    <select
                      onChange={(e) =>
                        handleChangeApplicationStatus(
                          e,
                          app._id,
                          app.applicationStatus
                        )
                      }
                      className="select select-xs"
                    >
                      <option value="">Update</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>

                    <button
                      onClick={() =>
                        handleChangeApplicationStatus(null, app._id, "rejected")
                      }
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center gap-2">
        <button
          disabled={currentPage === 0}
          className="btn btn-sm"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPage).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`btn btn-sm ${num === currentPage ? "btn-primary" : ""}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPage - 1}
          className="btn btn-sm"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-200 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Applicant Name</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {details?.userName || "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Applicant Email</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {details?.userEmail || "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">University Name</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {details?.universityName || "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Degree</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {details?.degree || "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">
                  Scholarship Category
                </dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {details?.scholarshipCategory || "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">
                  Application Status
                </dt>
                <dd className="text-gray-700 sm:col-span-2 capitalize">
                  {details?.applicationStatus || "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Payment Status</dt>
                <dd className="text-gray-700 sm:col-span-2 capitalize">
                  {details?.paymentStatus || "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Application Fees</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  ৳{details?.applicationFees ?? 0}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Service Charge</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  ৳{details?.serviceCharge ?? 0}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Application Date</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {details?.applicationDate
                    ? new Date(details.applicationDate).toLocaleString()
                    : "—"}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Feedback</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {details?.feedback || "No feedback provided"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApplicationManagement;
