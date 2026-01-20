const Statistics = () => {
  const stats = [
    { number: "500+", label: "Active Scholarships", color: "bg-teal-600" },
    { number: "10K+", label: "Students Helped", color: "bg-blue-600" },
    { number: "150+", label: "Universities", color: "bg-indigo-600" },
    { number: "$50M+", label: "Opportunities", color: "bg-emerald-600" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="w-11/12 md:w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Impact by Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who have successfully found and secured their scholarship opportunities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} p-8 rounded-lg text-white text-center shadow-lg hover:shadow-xl transition-shadow`}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </h3>
              <p className="text-white/90 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
