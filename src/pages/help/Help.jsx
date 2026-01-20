import { motion } from "motion/react";
import { Link } from "react-router";
import {
  FaBook,
  FaEnvelope,
  FaHeadset,
  FaLifeRing,
  FaPhone,
  FaQuestionCircle,
} from "react-icons/fa";

const Help = () => {
  const helpCategories = [
    {
      icon: FaQuestionCircle,
      title: "Getting Started",
      description: "Learn how to create an account and start your scholarship journey",
      link: "#getting-started",
    },
    {
      icon: FaBook,
      title: "Application Guide",
      description: "Step-by-step guide on how to apply for scholarships",
      link: "#application",
    },
    {
      icon: FaLifeRing,
      title: "Troubleshooting",
      description: "Solutions to common problems and technical issues",
      link: "#troubleshooting",
    },
    {
      icon: FaHeadset,
      title: "Contact Support",
      description: "Get in touch with our support team for personalized help",
      link: "#contact",
    },
  ];

  const faqItems = [
    {
      q: "How do I create an account?",
      a: "Visit our homepage and click 'Register'. Fill in your details and verify your email to get started.",
    },
    {
      q: "Can I edit my application after submitting it?",
      a: "Yes, you can edit your application if its status is 'Pending'. Once processing begins, editing is no longer available.",
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept all major credit cards and debit cards through Stripe. Your payment information is encrypted and secure.",
    },
    {
      q: "How long does the application review process take?",
      a: "Most applications are reviewed within 2-4 weeks. You'll receive status updates via email.",
    },
    {
      q: "Can I cancel my scholarship application?",
      a: "Yes, you can cancel pending applications. However, any paid application fees are non-refundable.",
    },
    {
      q: "What should I do if I forgot my password?",
      a: "Click 'Forgot Password' on the login page. You'll receive an email with a password reset link.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <section className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How Can We Help?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to your questions and get support whenever you need it
          </p>
        </motion.div>
      </section>

      {/* Help Categories */}
      <section className="w-11/12 md:w-10/12 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.a
                key={index}
                href={category.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <Icon className="text-teal-600 dark:text-teal-400 text-3xl mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24">
        <div className="w-11/12 md:w-10/12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg group cursor-pointer"
              >
                <summary className="flex items-center justify-between p-6 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
                  <span>{item.q}</span>
                  <span className="text-teal-600 dark:text-teal-400 transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                  {item.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Our dedicated support team is here to assist you 24/7
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <FaEnvelope className="text-teal-600 dark:text-teal-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Email
              </h3>
              <a
                href="mailto:support@scholarstream.com"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                support@scholarstream.com
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <FaPhone className="text-teal-600 dark:text-teal-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Phone
              </h3>
              <a
                href="tel:+15551234567"
                className="text-teal-600 dark:text-teal-400 hover:underline"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <FaHeadset className="text-teal-600 dark:text-teal-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Available Mon-Fri 9AM-5PM
              </p>
            </div>
          </div>

          <Link to="/contact">
            <button className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Help;
