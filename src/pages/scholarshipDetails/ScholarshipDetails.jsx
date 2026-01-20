import { Image } from "@imagekit/react";
import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import {
  FaArrowLeft,
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
import ScholarshipCard from "../allScholarships/scholarshipCard/ScholarshipCard";

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
  const { data: relatedScholarships = [] } = useQuery({
    queryKey: ["relatedScholarships", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}/related`);
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
          applicationInfo,
        );
        window.location.assign(res.data.url);
      }
    });
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-amber-50 py-8">
      {/* Hero Banner Section */}
      <div className="relative h-[320px] md:h-[420px] lg:h-[500px] w-full overflow-hidden group bg-gradient-to-b from-teal-200 to-indigo-200">
        {typeof imageUrl === "string" && imageUrl.trim() ? (
          <Image
            urlEndpoint="https://ik.imagekit.io/atm"
            src={imageUrl}
            alt={scholarshipName}
            className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-300 to-indigo-300">
            <div className="text-center text-white">
              <p className="text-lg font-semibold">Scholarship Image</p>
            </div>
          </div>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-amber-300 font-semibold text-sm mb-2 uppercase tracking-wider">
                  {scholarshipCategory}
                </p>
                <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                  {scholarshipName}
                </h1>
                <p className="text-gray-100 text-lg flex items-center gap-2">
                  <FaUniversity className="text-amber-300" />
                  {universityName}
                </p>
              </div>

              {/* Quick Badge */}
              <div className="bg-teal-600/90 backdrop-blur-sm px-6 py-4 rounded-xl text-center">
                <p className="text-xs text-teal-100 uppercase mb-1">
                  Degree Level
                </p>
                <p className="text-2xl font-bold text-white">{degree}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-10">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 -mt-16 relative z-10 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-teal-600">
            <FaMapMarkerAlt className="text-teal-600 text-2xl mb-2" />
            <p className="text-gray-600 text-xs font-semibold uppercase">
              Location
            </p>
            <p className="font-bold text-gray-800">
              {universityCity}, {universityCountry}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-indigo-600">
            <FaGlobe className="text-indigo-600 text-2xl mb-2" />
            <p className="text-gray-600 text-xs font-semibold uppercase">
              World Rank
            </p>
            <p className="font-bold text-gray-800">#{universityWorldRank}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-amber-500">
            <MdSchool className="text-amber-500 text-2xl mb-2" />
            <p className="text-gray-600 text-xs font-semibold uppercase">
              Subject
            </p>
            <p className="font-bold text-gray-800 capitalize">
              {subjectCategory}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-rose-500">
            <FiLayers className="text-rose-500 text-2xl mb-2" />
            <p className="text-gray-600 text-xs font-semibold uppercase">
              Category
            </p>
            <p className="font-bold text-gray-800">{scholarshipCategory}</p>
          </div>
        </div>

        {/* Deadline & Apply Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-8 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex-shrink-0">
              <FaClock className="text-red-600 text-5xl" />
            </div>
            <div>
              <p className="text-red-700 font-bold uppercase text-xs tracking-wide">
                Application Deadline
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {formattedDateTime}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Apply before this date to be considered
              </p>
            </div>
          </div>

          {/* Apply CTA Button */}
          <button
            onClick={handleApplyScholarship}
            className="btn btn-lg bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0 hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold uppercase tracking-wider text-lg whitespace-nowrap flex-shrink-0"
          >
            Apply Now
          </button>
        </div>

        {/* Fees Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-teal-50 rounded-xl p-8 mb-12 border border-indigo-100">
          <h3 className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-2">
            <FaMoneyBill className="text-amber-500" />
            Financial Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border-t-4 border-teal-500">
              <p className="text-gray-600 font-semibold uppercase text-xs mb-2">
                Application Fee
              </p>
              <p className="text-3xl font-bold text-teal-600">
                ${applicationFees}
              </p>
              <p className="text-xs text-gray-500 mt-2">One-time charge</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border-t-4 border-indigo-500">
              <p className="text-gray-600 font-semibold uppercase text-xs mb-2">
                Tuition Fee
              </p>
              <p className="text-3xl font-bold text-indigo-600">
                {tuitionFees ? `$${tuitionFees}` : "Covered"}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {tuitionFees ? "Full tuition amount" : "Fully covered"}
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border-t-4 border-amber-500">
              <p className="text-gray-600 font-semibold uppercase text-xs mb-2">
                Service Charge
              </p>
              <p className="text-3xl font-bold text-amber-600">
                ${serviceCharge}
              </p>
              <p className="text-xs text-gray-500 mt-2">Processing fee</p>
            </div>
          </div>
        </div>

        {/* Scholarship Details Section */}
        <div className="bg-white rounded-xl p-8 mb-12 shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-teal-700 mb-6">
            Scholarship Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <FaUniversity className="text-teal-600 text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm font-semibold uppercase">
                    University
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {universityName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <FaMapMarkerAlt className="text-indigo-600 text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm font-semibold uppercase">
                    Location
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {universityCity}, {universityCountry}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <MdCategory className="text-amber-600 text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm font-semibold uppercase">
                    Scholarship Type
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {scholarshipCategory}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MdSchool className="text-rose-600 text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm font-semibold uppercase">
                    Subject Category
                  </p>
                  <p className="font-semibold text-gray-800 text-lg capitalize">
                    {subjectCategory}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          {totalReviews !== 0 && (
            <>
              <div className="bg-gradient-to-r from-teal-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
                <h2 className="text-3xl font-bold mb-6">
                  Student Reviews & Ratings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-6">
                    <div className="text-6xl font-bold bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center">
                      {averageRating}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Rating
                          style={{ maxWidth: 150 }}
                          value={averageRating}
                          readOnly
                        />
                      </div>
                      <p className="text-white/90">Out of 5.0</p>
                      <p className="text-white/80 text-sm">
                        Based on {totalReviews} student reviews
                      </p>
                    </div>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Real feedback from students who have received this
                    scholarship. Their experiences and insights help other
                    applicants understand what to expect.
                  </p>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div>
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
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No reviews yet. Be the first to share your experience!
                </p>
              )}
            </>
          )}
        </div>

        {/* Related Scholarships Section */}
        {relatedScholarships.length > 0 && (
          <div className="border-t-4 border-teal-600 pt-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-teal-700 mb-2">
                Similar {degree} Scholarships
              </h2>
              <p className="text-gray-600">
                Explore other {degree} scholarships that might interest you
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedScholarships.map((scholarship) => (
                <div key={scholarship._id} className="h-full">
                  <ScholarshipCard scholarship={scholarship} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back Button at End */}
      <div className="max-w-5xl mx-auto px-4 md:px-10 pb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 text-teal-700 font-semibold hover:text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-lg transition-all duration-300 hover:shadow-md group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
