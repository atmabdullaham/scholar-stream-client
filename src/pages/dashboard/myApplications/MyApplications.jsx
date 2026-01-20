import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaEdit,
  FaEye,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import EmptyState from "../../../components/EmptyState";
import LogoLoader from "../../../components/LogoLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // STATE

  const detailsModalRef = useRef();
  const [details, setDetails] = useState({});
  const reviewModalRef = useRef(null);
  const editModalRef = useRef(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const email = user?.email;

  // DATA FETCH
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-applications", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-applications/${email}`);
      return res.data;
    },
    refetchInterval: 2000,
  });

  // show details
  const handleShowDetails = (id) => {
    const toShow = applications.find((application) => application._id === id);
    setDetails(toShow);
    detailsModalRef.current.showModal();
  };

  // handle payment if unpaid
  const handlePayment = (app) => {
    const totalPayable = app.applicationFees + app.serviceCharge;

    Swal.fire({
      title: "Are you want to proceed?",
      text: `Application Fee:${app.applicationFees}$ + Service Charge: ${app.serviceCharge}$. So, Total payable is ${totalPayable}$ `,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Pay",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/create-checkout-session", app);
        window.location.assign(res.data.url);
      }
    });
  };
  // handle give review
  const handleOpenReviewModal = (id) => {
    const toShow = applications.find((application) => application._id === id);

    if (!toShow) return;

    setReview(toShow);

    // open modal AFTER state set
    setTimeout(() => {
      reviewModalRef.current?.showModal();
    }, 0);
  };
  const handleReviewModalClose = () => {
    reviewModalRef.current?.close();
  };

  // give feedback
  const handleSubmitReview = async (data) => {
    if (!review || rating === 0) {
      Swal.fire({
        icon: "info",
        position: "top-end",
        title: "Rating Required",
        text: "Please give a rating before submitting your review",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    const reviewInfo = {
      scholarshipId: review.scholarshipId,
      universityName: review.universityName,
      userName: review.userName,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint: rating,
      reviewComment: data.comment,
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewInfo);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Review submitted!", "success");
        reset();
        setRating(0);
        handleReviewModalClose();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire("Already Submitted", error.response.data.message, "info");
        reset();
        setRating(0);
        handleReviewModalClose();
      } else {
        Swal.fire("Error", "Failed to submit review", "error");
      }
    }
  };
  // delete application
  const handleDeleteApplication = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The application will deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-applications/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `application deleted`,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    });
  };
  const handleOpenEditModal = () => {
    editModalRef.current?.showModal();
  };
  const handleEditModalClose = () => {
    editModalRef.current.close();
  };
  if (isLoading) {
    return <LogoLoader></LogoLoader>;
  }

  // Calculate statistics
  const pendingCount = applications.filter(
    (app) => app.applicationStatus === "pending",
  ).length;
  const completedCount = applications.filter(
    (app) => app.applicationStatus === "completed",
  ).length;
  const unpaidCount = applications.filter(
    (app) => app.paymentStatus === "unpaid",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Applications</h1>
            <p className="text-purple-50">
              Track and manage all your scholarship applications
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{applications.length}</p>
            <p className="text-purple-100">Total Applications</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-purple-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-purple-700 mt-2">
                  {applications.length}
                </p>
              </div>
              <FaClock className="text-purple-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Pending Review
                </p>
                <p className="text-3xl font-bold text-amber-700 mt-2">
                  {pendingCount}
                </p>
              </div>
              <FaClock className="text-amber-600 text-4xl opacity-20" />
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
                  {completedCount}
                </p>
              </div>
              <FaCheckCircle className="text-green-600 text-4xl opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {applications.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-800 w-10">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 min-w-[180px]">
                    University
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Scholarship
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800 whitespace-nowrap">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-gray-800 whitespace-nowrap">
                    Fees
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
                    className="border-b hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-700 w-10">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 min-w-[180px]">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {app.universityName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {app.scholarshipDetails?.universityCity},{" "}
                          {app.scholarshipDetails?.universityCountry}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                        {app.scholarshipDetails?.subjectCategory || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          app.applicationStatus === "completed"
                            ? "bg-green-100 text-green-700"
                            : app.applicationStatus === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.applicationStatus === "completed"
                          ? "✓ Completed"
                          : app.applicationStatus === "pending"
                            ? "⏱ Pending"
                            : app.applicationStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          app.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.paymentStatus === "paid" ? "✓ Paid" : "✗ Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-purple-600">
                        ${app.applicationFees}
                      </div>
                      <div className="text-xs text-gray-500">
                        +${app.serviceCharge}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleShowDetails(app._id)}
                          className="btn btn-sm btn-square bg-purple-600 text-white border-0 hover:bg-purple-700 transition-colors"
                          title="View Details"
                        >
                          <FaEye size={14} />
                        </button>
                        {app.applicationStatus === "pending" && (
                          <>
                            <button
                              onClick={() => handleOpenEditModal(app._id)}
                              className="btn btn-sm btn-square bg-teal-600 text-white border-0 hover:bg-teal-700 transition-colors"
                              title="Edit Application"
                            >
                              <FaEdit size={14} />
                            </button>
                            {app.paymentStatus === "unpaid" && (
                              <button
                                onClick={() => handlePayment(app)}
                                className="btn btn-sm btn-square bg-blue-600 text-white border-0 hover:bg-blue-700 transition-colors"
                                title="Make Payment"
                              >
                                <FaCreditCard size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteApplication(app._id)}
                              className="btn btn-sm btn-square bg-red-600 text-white border-0 hover:bg-red-700 transition-colors"
                              title="Delete Application"
                            >
                              <FaTrash size={14} />
                            </button>
                          </>
                        )}
                        {app.applicationStatus === "completed" && (
                          <button
                            onClick={() => handleOpenReviewModal(app._id)}
                            className="btn btn-sm btn-square bg-amber-600 text-white border-0 hover:bg-amber-700 transition-colors"
                            title="Add Review"
                          >
                            <FaStar size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Details Modal */}
      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
            Application Details
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Applicant Name
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {details?.userName || "—"}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  University
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {details?.universityName || "—"}
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Degree
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {details?.degree || "—"}
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
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
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Application Fee
                </p>
                <p className="text-lg font-bold text-purple-700 mt-1">
                  ${details?.applicationFees ?? 0}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Service Charge
                </p>
                <p className="text-lg font-bold text-purple-700 mt-1">
                  ${details?.serviceCharge ?? 0}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Applicant Email
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
              <button className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 hover:from-purple-700 hover:to-indigo-700">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Review Modal */}
      <dialog
        ref={reviewModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-xl">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 -m-6 mb-6 rounded-t-lg flex items-center gap-2">
            <FaStar className="text-yellow-300" />
            Add Your Review
          </h2>
          <form
            onSubmit={handleSubmit(handleSubmitReview)}
            className="space-y-6"
          >
            {review && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">For Scholarship:</p>
                <p className="text-lg font-bold text-purple-700">
                  {review.scholarshipName || "N/A"}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Your Rating
              </label>
              <div className="bg-amber-50 p-4 rounded-lg inline-block">
                <Rating
                  style={{ maxWidth: 200 }}
                  value={rating}
                  onChange={setRating}
                  fractions={10}
                />
              </div>
              {rating > 0 && (
                <p className="text-lg font-bold text-amber-700 mt-2">
                  {rating}/5 ⭐
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Your Review
              </label>
              <textarea
                {...register("comment", { required: true })}
                className="textarea w-full border-2 border-gray-200 focus:border-amber-500 focus:outline-none rounded-lg p-3"
                rows="4"
                placeholder="Share your experience with this scholarship..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleReviewModalClose}
                type="button"
                className="btn bg-gray-100 text-gray-700 border-0 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 hover:from-amber-600 hover:to-orange-700"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </dialog>
      {/* Edit Modal */}
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
            Application Management
          </h2>
          <div className="bg-teal-50 p-6 rounded-lg text-center">
            <p className="text-lg font-semibold text-gray-800">
              ℹ️ Application Information
            </p>
            <p className="text-gray-600 mt-2">
              Once submitted, application details cannot be edited. If you need
              to make changes, please delete this application and submit a new
              one.
            </p>
          </div>

          <div className="modal-action mt-6">
            <button
              onClick={handleEditModalClose}
              type="button"
              className="btn bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0 hover:from-teal-700 hover:to-indigo-700"
            >
              Got it
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
