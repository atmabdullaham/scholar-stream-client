import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: reviews = [],

    refetch,
  } = useQuery({
    queryKey: ["reviews"],

    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`);
      return res.data;
    },
  });

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

  console.log(reviews);
  return (
    <div>
      <h3>All Reviews: {reviews.length}</h3>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
      </div>
    </div>
  );
};

export default MyReviews;
