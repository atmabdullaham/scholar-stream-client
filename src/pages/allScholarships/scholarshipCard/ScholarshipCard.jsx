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
    "dd MMM yyyy, hh:mm a",
  );
  return (
    <div className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image */}
        <div className="overflow-hidden bg-gradient-to-br from-teal-200 to-indigo-200 h-56">
          {typeof imageUrl === "string" && imageUrl.trim() ? (
            <Image
              urlEndpoint="https://ik.imagekit.io/atm"
              src={imageUrl}
              width={800}
              height={600}
              alt={scholarshipName}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-teal-300 to-indigo-300">
              <p className="text-white font-semibold">Scholarship Image</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Scholarship + University */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {scholarshipName}
            </h2>
            <p className="text-sm text-gray-600">{universityName}</p>
            <p className="text-sm font-medium text-gray-700">
              {universityCity}, {universityCountry}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
              {scholarshipCategory}
            </span>
            <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
              {degree}
            </span>
          </div>

          {/* Fees + Deadline */}
          <div className="flex justify-between items-center pt-2 text-sm">
            <div>
              <p className="text-gray-500">Application Fee</p>
              <p className="font-semibold">${applicationFees}</p>
            </div>

            <div className="text-right">
              <p className="text-gray-500">Deadline</p>
              <p className="font-semibold text-red-600">{formattedDateTime}</p>
            </div>
          </div>

          {/* Button */}
          <Link
            to={`/details/${_id}`}
            className="btn w-full bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
