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
        updatedReview
      );

      if (res.data.modifiedCount) {
        Swal.fire("Success!", "Review updated successfully", "success");
        refetch();
        handleReviewModalClose();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update review", "error");
    }
  };

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The review will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `review deleted`,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    });
  };
  if (loading || isLoading) {
    <LogoLoader></LogoLoader>;
  }
  return (
    <div>
      <h3>My Reviews: {reviews.length}</h3>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {reviews.length === 0 ? (
          <EmptyState></EmptyState>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Review Comment</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, i) => (
                <tr key={r._id}>
                  <th>{i + 1}</th>
                  <td>{r.scholarshipName}</td>
                  <td>{r.universityName}</td>
                  <td>{r.reviewComment}</td>
                  <td>{r.reviewDate}</td>
                  <td>{r.ratingPoint}</td>
                  <td>
                    <button
                      onClick={() => handleOpenReviewModal(r._id)}
                      className="btn btn-xs btn-success"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(r._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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
                Update Review
              </button>
            </footer>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;
