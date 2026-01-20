import { motion } from "motion/react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 via-indigo-600 to-amber-600 dark:from-teal-700 dark:via-indigo-700 dark:to-amber-700 transition-colors duration-300">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Scholarship?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of students who have already found their perfect
            scholarship. Start exploring opportunities today!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Get Started Now
                <FaArrowRight size={16} />
              </motion.button>
            </Link>

            <Link to="/all-scholarships">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                Browse Scholarships
              </motion.button>
            </Link>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex justify-center gap-8 flex-wrap text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Verified Scholarships</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
