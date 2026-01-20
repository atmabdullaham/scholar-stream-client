import { Image } from "@imagekit/react";
import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import {
  FaClock,
  FaGlobe,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaUniversity,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { MdCategory, MdSchool } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LogoLoader from "../../components/LogoLoader";
import ScholarshipReviewCard from "../../components/ScholarshipReviewCard";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["scholarships", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}/all`);
      return res.data;
    },
  });
  const { data: reviewStats = {} } = useQuery({
    queryKey: ["review-average", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}/average`);
      return res.data;
    },
  });
  const { averageRating = 0, totalReviews = 0 } = reviewStats;
  const {
    _id,
    scholarshipName,
    scholarshipCategory,
    degree,
    subjectCategory,
    universityName,
    universityWorldRank,
    universityCountry,
    universityCity,
    imageUrl,
    tuitionFees,
    applicationFees,
    serviceCharge,
  } = scholarship;

  const deadline = scholarship?.applicationDeadline;

  const safeDate =
    deadline?.length === 16 ? new Date(deadline + ":00") : new Date(deadline);

  const formattedDateTime = isNaN(safeDate)
    ? "Invalid Date"
    : format(safeDate, "dd MMM yyyy, hh:mm a");

  if (loading || isLoading) {
    return <LogoLoader></LogoLoader>;
  }

  //   payment handler
  const handleApplyScholarship = async () => {
    const totalPayable = applicationFees + serviceCharge;
    const applicationInfo = {
      scholarshipId: _id,
      userEmail: user.email,
      universityName,
      scholarshipCategory,
      degree,
      applicationFees,
      serviceCharge,
    };
    Swal.fire({
      title: "Are you want to proceed?",
      text: `Application Fee:${applicationFees}$ + Service Charge: ${serviceCharge}$. So, Total payable is ${totalPayable}$ `,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Pay",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post(
          "/create-checkout-session",
          applicationInfo
        );
        window.location.assign(res.data.url);
      }
    });
  };

  return (
    <div className="bg-teal-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-4 md:p-10 bg-white dark:bg-gray-800 rounded-2xl">
        {/* Banner Image */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg relative group">
          <Image
            urlEndpoint="https://ik.imagekit.io/atm"
            src={imageUrl}
            alt={scholarshipName}
            className="w-full h-[350px] md:h-[420px] lg:h-[500px] object-cover 
    brightness-95 group-hover:brightness-100 
    scale-100 group-hover:scale-105 
    transition-all duration-700 ease-out"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent 
  group-hover:from-black/40 transition-all duration-500"
          ></div>

          {/* Text Overlay (Optional for Styling) */}
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg">
              {scholarshipName}
            </h1>
            <p className="text-sm md:text-base opacity-90">
              {universityName}, {universityCountry}
            </p>
          </div>
        </div>

        {/* Title & Post Info */}
        <div className="mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
            {scholarshipName}
          </h1>
        </div>

        {/* Main Scholarship Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE INFO */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FaUniversity className="text-teal-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">University</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{universityName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-teal-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {universityCity}, {universityCountry}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaGlobe className="text-teal-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">World Rank</p>
                <p className="font-medium text-gray-900 dark:text-white">#{universityWorldRank}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE INFO */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <MdCategory className="text-teal-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Scholarship Type</p>
                <p className="font-medium text-gray-900 dark:text-white">{scholarshipCategory}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MdSchool className="text-teal-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Degree Level</p>
                <p className="font-medium text-gray-900 dark:text-white">{degree}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiLayers className="text-teal-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Subject Category</p>
                <p className="font-medium capitalize text-gray-900 dark:text-white">{subjectCategory}</p>
              </div>
            </div>
          </div>
        </div>

        {/* DEADLINE SECTION */}
        <div className="mt-10 p-5 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-4">
          <FaClock className="text-red-600 text-2xl" />
          <div>
            <p className="text-red-600 dark:text-red-400 font-semibold">Application Deadline</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formattedDateTime}</p>
          </div>
        </div>

        {/* FEES */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm ">
            <FaMoneyBill className="text-green-600 text-xl mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Application Fee</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${applicationFees}</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm ">
            <FaMoneyBill className="text-blue-600 text-xl mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Tuition Fee</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {tuitionFees ? `$${tuitionFees}` : "Not Required"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm ">
            <FaMoneyBill className="text-rose-600 text-xl mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Service Charge</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${serviceCharge}</p>
          </div>
        </div>

        {/* CTA APPLY */}
        <div className="mt-10">
          <button
            onClick={handleApplyScholarship}
            className="btn bg-teal-600 text-white btn-lg w-full md:w-auto"
          >
            Apply for Scholarship
          </button>
        </div>

        {/* Reviews Section */}
        <div className="mt-14">
          {totalReviews !== 0 && (
            <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-400">Reviews</h2>
          )}
          {totalReviews !== 0 && (
            <div className="mt-6 flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-yellow-500">
                  {averageRating}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/ 5</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={averageRating}
                    readOnly
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({totalReviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Average student rating for this scholarship
                </p>
              </div>
            </div>
          )}
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">
              Student Reviews
            </h2>

            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                spaceBetween={20}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {reviews.map((review) => (
                  <SwiperSlide key={review._id}>
                    <ScholarshipReviewCard review={review} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
