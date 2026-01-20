import {
  FaChartLine,
  FaGlobe,
  FaLock,
  FaSearch,
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
    },
    {
      icon: FaSearch,
      title: "Smart Search & Filter",
      description:
        "Find scholarships that match your profile with advanced filtering by category, degree, and location.",
    },
    {
      icon: FaUserCheck,
      title: "Verified Opportunities",
      description:
        "All scholarships are verified by our team to ensure legitimacy and accuracy.",
    },
    {
      icon: FaChartLine,
      title: "Application Tracking",
      description:
        "Monitor your applications in real-time and receive updates on their status.",
    },
    {
      icon: FaLock,
      title: "Secure & Safe",
      description:
        "Your personal information is protected with industry-leading security standards.",
    },
    {
      icon: FaShieldAlt,
      title: "Expert Support",
      description:
        "Our dedicated support team is available 24/7 to help you with any questions.",
    },
  ];

  return (
    <section className=" bg-teal-100">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Scholar Stream?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide everything you need to find, apply, and manage your
            scholarship applications in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="text-teal-600 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
