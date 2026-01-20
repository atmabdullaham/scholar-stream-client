import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
    <section className=" bg-teal-100">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about scholarships and our
            platform.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors duration-300"
              >
                <span className="text-left font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <FaChevronDown />
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
