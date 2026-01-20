import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "motion/react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I apply for a scholarship?",
      answer:
        "Browse our scholarship listings, click on a scholarship that interests you, review the details, and click 'Apply'. You'll be directed to our secure payment portal to complete your application.",
    },
    {
      question: "What information do I need to provide?",
      answer:
        "You'll need to provide your personal information, educational background, and upload any required documents such as transcripts, essays, and recommendation letters.",
    },
    {
      question: "How long does the approval process take?",
      answer:
        "Most applications are reviewed within 2-4 weeks. You can track the status of your application in your dashboard at any time.",
    },
    {
      question: "Can I apply for multiple scholarships?",
      answer:
        "Yes! We encourage you to apply for multiple scholarships. Each application increases your chances of securing funding.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No, we're completely transparent about fees. Any applicable fees will be clearly displayed before you confirm your application.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team via email at support@scholarstream.com, phone at +1 (555) 123-4567, or use the live chat feature on our website.",
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
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about scholarships and our platform.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center transition-colors duration-300"
              >
                <span className="text-left font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-teal-600 dark:text-teal-400"
                >
                  <FaChevronDown size={20} />
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
