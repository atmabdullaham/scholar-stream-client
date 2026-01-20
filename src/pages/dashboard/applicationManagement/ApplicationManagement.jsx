import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaComment,
  FaEye,
  FaTimesCircle,
} from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import Swal from "sweetalert2";
import EmptyState from "../../../components/EmptyState";
import LogoLoader from "../../../components/LogoLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationManagement = () => {
  const axiosSecure = useAxiosSecure();

  // STATE
  const [currentPage, setCurrentPage] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const detailsModalRef = useRef();
  const [details, setDetails] = useState({});
  const feedbackModalRef = useRef();
  const feedbackRef = useRef();
  const [feedbackId, setFeedbackId] = useState();

  const limit = 10;

  // DATA FETCH
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", currentPage, searchText, applicationStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?limit=${limit}&skip=${
          currentPage * limit
        }&search=${searchText}&applicationStatus=${applicationStatus}`,
      );
      return res.data;
    },
    refetchInterval: 2000,
  });

  const applications = data?.data || [];
  const total = data?.total || 0;
  const totalPage = data?.totalPage || 0;

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
  // handle give feedback
  const handleOpenFeedbackModal = (id) => {
    feedbackModalRef.current.showModal();
    setFeedbackId(id);
  };
  const handleSubmitFeedback = async () => {
    const feedback = feedbackRef.current.value;
    if (!feedback) {
      Swal.fire({
        icon: "warning",
        title: "No feedback added",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    if (feedback) {
      await axiosSecure
        .patch(`/applications/${feedbackId}`, { feedback: feedback })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            feedbackRef.current.value = "";
            refetch();
            Swal.fire({
              icon: "success",
              title: "Feedback added",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Application Management</h1>
            <p className="text-rose-50">
              Review and manage scholarship applications
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{total}</p>
            <p className="text-rose-100">Total Applications</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Pending
                </p>
                <p className="text-3xl font-bold text-amber-700 mt-2">
                  {
                    applications.filter(
                      (a) => a.applicationStatus === "pending",
                    ).length
                  }
                </p>
              </div>
              <FaClock className="text-amber-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-blue-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Processing
                </p>
                <p className="text-3xl font-bold text-blue-700 mt-2">
                  {
                    applications.filter(
                      (a) => a.applicationStatus === "processing",
                    ).length
                  }
                </p>
              </div>
              <MdUpdate className="text-blue-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-green-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-green-600 to-teal-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Completed
                </p>
                <p className="text-3xl font-bold text-green-700 mt-2">
                  {
                    applications.filter(
                      (a) => a.applicationStatus === "completed",
                    ).length
                  }
                </p>
              </div>
              <FaCheckCircle className="text-green-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-red-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-red-600 to-rose-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Rejected
                </p>
                <p className="text-3xl font-bold text-red-700 mt-2">
                  {
                    applications.filter(
                      (a) => a.applicationStatus === "rejected",
                    ).length
                  }
                </p>
              </div>
              <FaTimesCircle className="text-red-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rose-600 rounded"></span>
          Search & Filter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Applications
            </label>
            <input
              type="search"
              placeholder="Search by university, degree, or name..."
              onChange={handleSearch}
              className="input input-bordered w-full focus:border-rose-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              onChange={handleStatusFilter}
              className="select select-bordered w-full focus:border-rose-600 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      {/* LOADING */}
      {isLoading && <LogoLoader></LogoLoader>}

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {!isLoading && applications.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-rose-50 to-pink-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-800 w-10">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[150px]">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[160px]">
                    University
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Feedback
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-gray-800 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className="border-b hover:bg-rose-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-700 w-10">
                      {currentPage * limit + index + 1}
                    </td>
                    <td className="px-4 py-3 min-w-[150px]">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {app.userName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {app.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 min-w-[160px]">
                      <p className="font-medium text-gray-700 text-sm">
                        {app.universityName}
                      </p>
                      <p className="text-xs text-gray-500">{app.degree}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.applicationStatus === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : app.applicationStatus === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : app.applicationStatus === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.applicationStatus === "pending"
                          ? "⏱ Pending"
                          : app.applicationStatus === "processing"
                            ? "⟳ Processing"
                            : app.applicationStatus === "completed"
                              ? "✓ Completed"
                              : "✗ Rejected"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          app.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.paymentStatus === "paid" ? "✓ Paid" : "✗ Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {app.feedback ? (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          ✓ Added
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleShowDetails(app._id)}
                          className="btn btn-sm btn-square bg-rose-600 text-white border-0 hover:bg-rose-700 transition-colors"
                          title="View Details"
                        >
                          <FaEye size={14} />
                        </button>
                        <button
                          onClick={() => handleOpenFeedbackModal(app._id)}
                          className="btn btn-sm btn-square bg-purple-600 text-white border-0 hover:bg-purple-700 transition-colors"
                          title="Add/Edit Feedback"
                        >
                          <FaComment size={14} />
                        </button>
                        <div className="dropdown dropdown-end">
                          <button
                            className="btn btn-sm btn-square bg-teal-600 text-white border-0 hover:bg-teal-700 transition-colors"
                            title="Update Status"
                          >
                            <MdUpdate size={14} />
                          </button>
                          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-gray-200">
                            <li>
                              <a
                                onClick={() =>
                                  handleChangeApplicationStatus(
                                    null,
                                    app._id,
                                    "pending",
                                  )
                                }
                              >
                                ⏱ Pending
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  handleChangeApplicationStatus(
                                    null,
                                    app._id,
                                    "processing",
                                  )
                                }
                              >
                                ⟳ Processing
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  handleChangeApplicationStatus(
                                    null,
                                    app._id,
                                    "completed",
                                  )
                                }
                              >
                                ✓ Completed
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  handleChangeApplicationStatus(
                                    null,
                                    app._id,
                                    "rejected",
                                  )
                                }
                                className="text-red-600"
                              >
                                ✗ Reject
                              </a>
                            </li>
                          </ul>
                        </div>
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
                className="btn btn-sm border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
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
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white border-0"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {num + 1}
              </button>
            ))}

            {currentPage < totalPage - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-sm border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
              >
                Next →
              </button>
            )}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Page {currentPage + 1} of {totalPage} • Showing{" "}
            {applications.length} of {total} applications
          </p>
        </div>
      )}

      {/* Details Modal */}
      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
            Application Details
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-rose-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Applicant Name
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {details?.userName || "—"}
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  University
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {details?.universityName || "—"}
                </p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Degree
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {details?.degree || "—"}
                </p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Category
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {details?.scholarshipCategory || "—"}
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Application Status
                </p>
                <p className="text-lg font-bold text-amber-700 mt-1 capitalize">
                  {details?.applicationStatus || "—"}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Payment Status
                </p>
                <p className="text-lg font-bold text-green-700 mt-1 capitalize">
                  {details?.paymentStatus || "—"}
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Application Fee
                </p>
                <p className="text-lg font-bold text-rose-700 mt-1">
                  ${details?.applicationFees ?? 0}
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Service Charge
                </p>
                <p className="text-lg font-bold text-rose-700 mt-1">
                  ${details?.serviceCharge ?? 0}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Email
              </p>
              <p className="text-gray-800 mt-1">{details?.userEmail || "—"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Application Date
              </p>
              <p className="text-gray-800 mt-1">
                {details?.applicationDate
                  ? new Date(details.applicationDate).toLocaleString()
                  : "—"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Feedback
              </p>
              <p className="text-gray-800 mt-1">
                {details?.feedback || "No feedback provided"}
              </p>
            </div>
          </div>

          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn bg-gradient-to-r from-rose-600 to-pink-600 text-white border-0 hover:from-rose-700 hover:to-pink-700">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Feedback Modal */}
      <dialog
        ref={feedbackModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-xl">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 -m-6 mb-6 rounded-t-lg flex items-center gap-2">
            <FaComment />
            Add Feedback
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Feedback for Applicant
              </label>
              <textarea
                ref={feedbackRef}
                className="textarea w-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none rounded-lg p-3 h-32 resize-none"
                placeholder="Write your feedback, comments, or additional information for the applicant..."
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">
                This feedback will be visible to the applicant
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => feedbackModalRef.current?.close()}
                type="button"
                className="btn bg-gray-100 text-gray-700 border-0 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700"
              >
                <FaCheck size={16} />
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApplicationManagement;
