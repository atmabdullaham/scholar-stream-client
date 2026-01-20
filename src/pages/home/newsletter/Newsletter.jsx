import { useState } from "react";
import { motion } from "motion/react";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Please enter your email",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Subscribed Successfully!",
        text: "Check your email for exclusive updates.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <FaEnvelope className="text-teal-600" /> Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Subscribe to our newsletter to get the latest scholarship
            opportunities and tips delivered directly to your inbox.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </form>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
