import { motion } from "motion/react";
import { Link } from "react-router";
const Hero = () => {
  return (
    <div className="bg-green-100">
      <div className="py-10 md:py-20 w-11/12 md:w-10/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="relative w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              <span className="text-gray-900 font-bangla">
                Find the Right Scholarship for{" "}
              </span>
              <span className="text-emerald-500">Your Future </span>
            </h1>

            <p className="text-gray-700 text-base lg:text-lg mb-0 lg:mb-8 max-w-xl  leading-relaxed">
              Explore verified scholarships from top universities worldwide.
              Apply easily, track your applications, and secure your academic
              journey.
            </p>

            {/* Button - only on md and up */}
            <div className="hidden md:flex">
              <Link to="/all-scholarships">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold shadow transition flex items-center gap-2 text-sm sm:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z"
                    />
                  </svg>
                  Search Scholarship
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-end"
          >
            <div className=" flex items-center justify-center md:justify-end">
              <img
                src="https://i.ibb.co.com/TDbSHmrc/White-Brown-Education-Instagram-Post.png"
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/3] w-full h-auto object-contain rounded-b-full border-b-[1px] border-white drop-shadow-2xl"
                loading="lazy"
              />
            </div>

            {/* Button - only on small devices */}
            <div className="block md:hidden mt-6">
              <Link to="/all-scholarships">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold shadow transition flex items-center gap-2 text-sm sm:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z"
                    />
                  </svg>
                  Search Scholarship
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
