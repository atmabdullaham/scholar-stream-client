import { motion } from "motion/react";
import {
  FaChartLine,
  FaGlobe,
  FaLock,
  FaSearchengin,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: FaGlobe,
      title: "Global Opportunities",
      description:
        "Access scholarships from universities around the world and expand your educational horizons.",
      color: "text-blue-600",
    },
    {
      icon: FaSearchengin,
      title: "Smart Search & Filter",
      description:
        "Find scholarships that match your profile with advanced filtering by category, degree, and location.",
      color: "text-green-600",
    },
    {
      icon: FaUserCheck,
      title: "Verified Opportunities",
      description:
        "All scholarships are verified by our team to ensure legitimacy and accuracy.",
      color: "text-purple-600",
    },
    {
      icon: FaChartLine,
      title: "Application Tracking",
      description:
        "Monitor your applications in real-time and receive updates on their status.",
      color: "text-orange-600",
    },
    {
      icon: FaLock,
      title: "Secure & Safe",
      description:
        "Your personal information is protected with industry-leading security standards.",
      color: "text-red-600",
    },
    {
      icon: FaShieldAlt,
      title: "Expert Support",
      description:
        "Our dedicated support team is available 24/7 to help you with any questions.",
      color: "text-indigo-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-11/12 md:w-10/12 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Scholar Stream?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide everything you need to find, apply, and manage your
            scholarship applications in one place.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300 group"
              >
                <div
                  className={`${feature.color} text-4xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
