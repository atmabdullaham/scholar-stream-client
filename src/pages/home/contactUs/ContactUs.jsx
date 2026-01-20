import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { motion } from "motion/react";

const ContactUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 md:py-24 transition-colors duration-300">
      <div className="mx-auto w-11/12 md:w-10/12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have questions about scholarships or need assistance? Our team is
            ready to support you.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg bg-gray-50 dark:bg-gray-800 p-8 shadow-md space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Get in Touch
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contact us for scholarship guidance, technical help, or general
              inquiries related to Scholar Stream.
            </p>

            {/* Info Items */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMail className="text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    support@scholarstream.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Office Location
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    123 Education Lane, Learning City, LC 12345
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg bg-gray-50 dark:bg-gray-800 p-8 shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>

              <button
                type="button"
                className="btn w-full bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-700 dark:hover:bg-teal-600 flex items-center justify-center gap-2"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
