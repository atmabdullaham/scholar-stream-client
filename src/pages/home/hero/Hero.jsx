import { Image } from "@imagekit/react";
import { motion } from "motion/react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 pt-0">
      <div className="py-10 md:py-20 w-11/12 md:w-10/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
              <span>Find the Right </span>
              <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Scholarship
              </span>
              <span> for Your Future</span>
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg mb-8 max-w-xl leading-relaxed">
              Explore verified scholarships from top universities worldwide.
              Apply easily, track your applications, and secure your academic
              journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/all-scholarships">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                >
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
                  Search Scholarships
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
              >
                Learn More
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex gap-8 mt-8 justify-center md:justify-start text-sm"
            >
              <div>
                <p className="text-2xl font-bold text-teal-600">500+</p>
                <p className="text-gray-600 dark:text-gray-400">Scholarships</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">10K+</p>
                <p className="text-gray-600 dark:text-gray-400">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">150+</p>
                <p className="text-gray-600 dark:text-gray-400">Universities</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-end"
          >
            <div className="flex items-center justify-center md:justify-end">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Image
                  urlEndpoint="https://ik.imagekit.io/atm"
                  src="https://ik.imagekit.io/atm/scholarship-banner.png"
                  width={800}
                  height={600}
                  className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/3] w-full h-auto object-contain rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
