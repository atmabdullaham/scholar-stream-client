import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { format } from "date-fns";

const ScholarshipReviewCard = ({ review }) => {
  const {
    userImage,
    userName,
    reviewDate,
    ratingPoint,
    reviewComment,
    universityName,
  } = review;

  return (
    <div className="h-full rounded-2xl bg-teal-50 dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={userImage}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">{userName}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(reviewDate), "dd MMM yyyy")}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <Rating style={{ maxWidth: 100 }} value={ratingPoint} readOnly />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">{reviewComment}</p>

      <p className="mt-auto pt-4 text-xs font-medium text-teal-600 dark:text-teal-400">
        {universityName}
      </p>
    </div>
  );
};

export default ScholarshipReviewCard;
