const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      title: "Verified Scholarships",
      description: "Every scholarship is carefully verified and authenticated",
      icon: "✓",
    },
    {
      id: 2,
      title: "Secure Platform",
      description: "Military-grade encryption protects your personal data",
      icon: "🔒",
    },
    {
      id: 3,
      title: "Expert Support",
      description: "24/7 dedicated support team to guide your journey",
      icon: "🤝",
    },
    {
      id: 4,
      title: "Wide Coverage",
      description: "500+ scholarships across 150+ universities worldwide",
      icon: "🌍",
    },
    {
      id: 5,
      title: "Success Rate",
      description: "80%+ of our students secure scholarships successfully",
      icon: "📈",
    },
    {
      id: 6,
      title: "Free Service",
      description: "No hidden fees, transparent pricing from start to finish",
      icon: "💰",
    },
  ];

  return (
    <section className="bg-teal-50 ">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-700 mb-3">
            Why Choose Scholar Stream?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to making scholarship discovery simple, secure, and
            successful for every student
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="p-8 bg-gradient-to-br from-teal-50 to-indigo-50 rounded-xl border border-teal-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
