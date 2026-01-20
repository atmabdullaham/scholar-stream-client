import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import EmptyState from "../../../components/EmptyState";
import LogoLoader from "../../../components/LogoLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const reviewModalRef = useRef(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset, setValue } = useForm();
  const email = user?.email;
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${email}`);
      return res.data;
    },
  });

  // handle give review
  const handleOpenReviewModal = (id) => {
    const toShow = reviews.find((r) => r._id === id);
    if (!toShow) return;
    setReview(toShow);
    setRating(toShow.ratingPoint);
    setValue("comment", toShow.reviewComment);

    setTimeout(() => {
      reviewModalRef.current?.showModal();
    }, 0);
  };

  const handleReviewModalClose = () => {
    reviewModalRef.current?.close();
    setReview(null);
    setRating(0);
    reset();
  };

  const handleSubmitReview = async (data) => {
    if (!review || rating === 0) {
      Swal.fire({
        icon: "info",
        title: "Rating Required",
        text: "Please give a rating before updating",
      });
      return;
    }

    const isRatingSame = rating === review.ratingPoint;
    const isCommentSame = data.comment === review.reviewComment;

    if (isRatingSame && isCommentSame) {
      Swal.fire({
        icon: "info",
        title: "No Changes Found",
        text: "Did not change anything",
      });
      handleReviewModalClose();
      return;
    }

    const updatedReview = {
      ratingPoint: rating,
      reviewComment: data.comment,
    };

    try {
      const res = await axiosSecure.patch(
        `/reviews/${review._id}`,
        updatedReview,
      );

      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Review updated successfully",
          confirmButtonColor: "#0d9488",
        });
        refetch();
        handleReviewModalClose();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update review",
      });
    }
  };

  const handleDeleteReview = (id, scholarshipName) => {
    Swal.fire({
      title: "Delete Review?",
      text: `Your review for "${scholarshipName}" will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Review Deleted",
              text: "Your review has been removed",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  if (loading || isLoading) {
    return <LogoLoader></LogoLoader>;
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.ratingPoint, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <FaStar className="text-yellow-300" />
              My Reviews
            </h1>
            <p className="text-orange-50">
              Manage your scholarship reviews and ratings
            </p>
          </div>
          <div className="text-right space-y-2">
            <div>
              <p className="text-5xl font-bold">{reviews.length}</p>
              <p className="text-orange-100">Total Reviews</p>
            </div>
            {/* {reviews.length > 0 && (
              <div>
                <p className="text-3xl font-bold text-yellow-300">{averageRating}/5</p>
                <p className="text-orange-100 text-sm">Average Rating</p>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {reviews.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-50 to-orange-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-800">
                    #
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">
                    Scholarship
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">
                    University
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">
                    Comment
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-800">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-gray-800">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr
                    key={review._id}
                    className="border-b hover:bg-amber-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-800 line-clamp-1">
                        {review.scholarshipName}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-700 line-clamp-1">
                        {review.universityName}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 line-clamp-2">
                        {review.reviewComment || "No comment"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {review.reviewDate}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg font-bold text-amber-600">
                          {review.ratingPoint}
                        </span>
                        <FaStar className="text-amber-500" size={16} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenReviewModal(review._id)}
                          className="btn btn-sm btn-square bg-teal-600 text-white border-0 hover:bg-teal-700 transition"
                          title="Edit Review"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteReview(
                              review._id,
                              review.scholarshipName,
                            )
                          }
                          className="btn btn-sm btn-square bg-red-600 text-white border-0 hover:bg-red-700 transition"
                          title="Delete Review"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Review Modal */}
      <dialog
        ref={reviewModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaStar className="text-amber-500" />
            Update Review
          </h2>
          <p className="text-gray-600 mb-6">
            Scholarship:{" "}
            <span className="font-semibold text-teal-700">
              {review?.scholarshipName}
            </span>
          </p>

          <form
            onSubmit={handleSubmit(handleSubmitReview)}
            className="space-y-6"
          >
            {/* Rating Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Your Rating
              </h3>
              <div className="flex items-center gap-4">
                <Rating
                  style={{ maxWidth: 200 }}
                  value={rating}
                  onChange={setRating}
                  fractions={10}
                />
                <span className="text-4xl font-bold text-amber-600">
                  {rating.toFixed(1)}
                </span>
                <span className="text-2xl text-amber-500">/5</span>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label className="block text-lg font-bold text-gray-800">
                Your Review
              </label>
              <textarea
                {...register("comment", { required: "Review is required" })}
                className="textarea textarea-bordered w-full h-32 focus:border-teal-600 focus:outline-none resize-none text-base"
                placeholder="Share your honest review about this scholarship..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={handleReviewModalClose}
                type="button"
                className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0 hover:shadow-lg"
              >
                Update Review
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleReviewModalClose}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyReviews;
