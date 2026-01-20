const Testimonials = () => {
  const testimonials = [
    {
      name: "Ayesha Rahman",
      country: "Germany",
      scholarshipType: "Full Fund",
      image: "https://i.pravatar.cc/150?img=32",
      message:
        "Scholar Stream helped me secure a fully funded scholarship for my Master's degree in Germany. The process was simple and transparent.",
    },
    {
      name: "Rakib Hasan",
      country: "Canada",
      scholarshipType: "Partial Fund",
      image: "https://i.pravatar.cc/150?img=45",
      message:
        "Thanks to Scholar Stream, I found a partial scholarship in Canada at the right time. The reviews and guidance were extremely helpful.",
    },
    {
      name: "Nusrat Jahan",
      country: "Australia",
      scholarshipType: "Self Fund",
      image: "https://i.pravatar.cc/150?img=50",
      message:
        "Scholar Stream guided me through self-funded options in Australia. It saved me time and helped me make informed decisions.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="w-11/12 md:w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from students who achieved their dreams with Scholar Stream
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex gap-4 mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {testimonial.country}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                "{testimonial.message}"
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
                  {testimonial.scholarshipType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
