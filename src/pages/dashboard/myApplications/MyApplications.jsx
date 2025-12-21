import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">
          My Applications:{applications.length}
        </h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg">
        {applications.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>University Name</th>
                <th>Address</th>
                <th>Feedback</th>
                <th>Subject Category</th>
                <th>Application Fees</th>
                <th>Application Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>{app.universityName}</td>
                  <td>
                    {app.scholarshipDetails.universityCity}
                    {","}
                    {app.scholarshipDetails.universityCountry}
                  </td>
                  <td>{app.feedback || "-"} </td>
                  <td>{app.scholarshipDetails.subjectCategory}</td>
                  <td>{app.applicationFees}</td>

                  <td>{app.applicationStatus}</td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => handleShowDetails(app._id)}
                      className="btn btn-xs btn-outline"
                    >
                      Details
                    </button>
                    {app.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleOpenEditModal(app._id)}
                        className="btn btn-xs btn-outline"
                      >
                        Edit
                      </button>
                    )}
                    {app.paymentStatus === "unpaid" &&
                      app.applicationStatus === "pending" && (
                        <button
                          onClick={() => handlePayment(app)}
                          className="btn btn-xs btn-outline"
                        >
                          pay
                        </button>
                      )}

                    {app.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleDeleteApplication(app._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    )}
                    {app.applicationStatus === "completed" && (
                      <button
                        onClick={() => handleOpenReviewModal(app._id)}
                        className="btn btn-xs btn-success"
                      >
                        Add Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* details modal */}

      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-xl font-semibold text-center pb-4">
            Application Details
          </h3>
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
      <dialog
        ref={reviewModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h2
            id="modalTitle"
            className="text-xl font-bold text-gray-900 dark:text-gray-200 sm:text-2xl"
          >
            Rating and Review
          </h2>
          <form onSubmit={handleSubmit(handleSubmitReview)} className="pt-10">
            <div className="mb-4">
              <h3 className="mb-1">Your Rating:</h3>
              <Rating
                style={{ maxWidth: 150 }}
                value={rating}
                onChange={setRating}
                fractions={10}
              />
            </div>

            <textarea
              {...register("comment", { required: true })}
              className="textarea mt-0.5 w-full resize-none rounded border-gray-300 shadow-sm sm:text-sm"
              rows="4"
              placeholder="Write your review..."
            ></textarea>

            <footer className="mt-6 flex justify-end gap-2">
              <button
                onClick={handleReviewModalClose}
                type="button"
                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Submit Review
              </button>
            </footer>
          </form>
        </div>
      </dialog>
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2
            id="modalTitle"
            className="text-xl font-bold text-gray-900 dark:text-gray-200 sm:text-2xl"
          >
            Nothing Editable
          </h2>

          <footer className="mt-6 flex justify-end gap-2">
            <button
              onClick={handleEditModalClose}
              type="button"
              className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
          </footer>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
