import { Rating } from "@smastrom/react-rating";

const TestimonialsAbout = () => {
  const testimonials = [
    {
      id: 1,
      name: "Zainab Ahmed",
      university: "Oxford University",
      text: "Scholar Stream helped me find the perfect scholarship. The process was seamless and the support team was incredibly helpful!",
      rating: 5,
      image: "👩‍🎓",
    },
    {
      id: 2,
      name: "Hassan Mohamed",
      university: "MIT",
      text: "Amazing platform! I secured a full scholarship within 2 months. Highly recommended for all students seeking educational support.",
      rating: 5,
      image: "👨‍🎓",
    },
    {
      id: 3,
      name: "Ayesha Khan",
      university: "Harvard University",
      text: "The verification system and transparency gave me confidence. Best scholarship platform I've used so far!",
      rating: 5,
      image: "👩‍🎓",
    },
  ];

  return (
    <section className="bg-teal-50 py-16 md:py-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-700 mb-3">
            Success Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from students who achieved their dreams with Scholar
            Stream
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-8 border border-teal-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{testimonial.image}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-teal-600 font-semibold">
                    {testimonial.university}
                  </p>
                </div>
              </div>

              <Rating
                style={{ maxWidth: 120 }}
                value={testimonial.rating}
                readOnly
              />

              <p className="text-gray-600 mt-4 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAbout;
