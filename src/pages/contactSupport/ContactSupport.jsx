import { motion } from "framer-motion";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white py-16 md:py-24">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="text-lg text-teal-50 max-w-2xl mx-auto">
            Have questions? Our dedicated support team is here to help you 24/7
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ContactMethods = () => {
  const methods = [
    {
      id: 1,
      icon: FaPhone,
      title: "Phone Support",
      detail: "+1 (800) 123-4567",
      description: "Call us during business hours",
      color: "teal",
    },
    {
      id: 2,
      icon: FaEnvelope,
      title: "Email Support",
      detail: "support@scholarstream.com",
      description: "Response within 24 hours",
      color: "indigo",
    },
    {
      id: 3,
      icon: FaMapMarkerAlt,
      title: "Office Location",
      detail: "123 Education Street, NY",
      description: "Visit our main office",
      color: "amber",
    },
    {
      id: 4,
      icon: FaClock,
      title: "Working Hours",
      detail: "Mon - Fri, 9 AM - 6 PM",
      description: "Also available on weekends",
      color: "rose",
    },
  ];

  return (
    <section className="bg-teal-50 py-16 md:py-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-700 mb-3">
            Contact Methods
          </h2>
          <p className="text-gray-600 text-lg">
            Multiple ways to reach us - choose what works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method) => {
            const Icon = method.icon;
            const colorClasses = {
              teal: "text-teal-600",
              indigo: "text-indigo-600",
              amber: "text-amber-600",
              rose: "text-rose-600",
            };
            return (
              <div
                key={method.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
              >
                <Icon
                  className={`text-4xl ${colorClasses[method.color]} mx-auto mb-3`}
                />
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {method.title}
                </h3>
                <p className="text-sm font-semibold text-teal-600 mb-2">
                  {method.detail}
                </p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SupportForm = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-700 mb-3">
            Send us a Message
          </h2>
          <p className="text-gray-600 text-lg">
            Fill out the form below and we'll get back to you shortly
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gradient-to-br from-teal-50 to-indigo-50 rounded-xl p-8 border border-teal-200">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help?"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                placeholder="Tell us more..."
                className="textarea textarea-bordered w-full h-32"
              ></textarea>
            </div>

            <button className="btn btn-lg bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0 w-full font-bold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      q: "How do I apply for a scholarship?",
      a: "Browse scholarships, click 'Apply Now', complete your profile, and submit your application along with required documents.",
    },
    {
      id: 2,
      q: "Is there a fee to use Scholar Stream?",
      a: "No! Scholar Stream is completely free. We never charge for browsing, applying, or using our platform.",
    },
    {
      id: 3,
      q: "How long does the application process take?",
      a: "Most applications take 5-10 minutes to complete. Review times vary by scholarship, typically 2-4 weeks.",
    },
  ];

  return (
    <section className="bg-teal-50 py-16 md:py-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-700 mb-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-teal-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSupport = () => {
  return (
    <div className="bg-white">
      <ContactHero />
      <ContactMethods />
      <SupportForm />
      <FAQ />
    </div>
  );
};

export default ContactSupport;
