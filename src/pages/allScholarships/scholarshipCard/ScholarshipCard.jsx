import { Image } from "@imagekit/react";
import { format } from "date-fns";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    scholarshipName,
    scholarshipCategory,
    degree,
    applicationFees,
    imageUrl,
    applicationDeadline,
    universityName,
    universityCountry,
    universityCity,
  } = scholarship;
  const formattedDateTime = format(
    new Date(applicationDeadline),
    "dd MMM yyyy, hh:mm a"
  );
  return (
    <div className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Image */}
        <div className="overflow-hidden">
          <Image
            urlEndpoint="https://ik.imagekit.io/atm"
            src={imageUrl}
            width={800}
            height={600}
            alt={scholarshipName}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Scholarship + University */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
              {scholarshipName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{universityName}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
              {universityCity}, {universityCountry}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-medium">
              {scholarshipCategory}
            </span>
            <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
              {degree}
            </span>
          </div>

          {/* Fees + Deadline */}
          <div className="flex justify-between items-center pt-2 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Application Fee</p>
              <p className="font-semibold text-gray-900 dark:text-white">${applicationFees}</p>
            </div>

            <div className="text-right">
              <p className="text-gray-500 dark:text-gray-400">Deadline</p>
              <p className="font-semibold text-red-600 dark:text-red-400">{formattedDateTime}</p>
            </div>
          </div>

          {/* Button */}
          <Link
            to={`/details/${_id}`}
            className="btn w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm font-medium transition"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
