import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 via-indigo-600 to-amber-600">
      <div className="w-11/12 md:w-10/12 mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Find Your Scholarship?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have already secured their scholarship opportunities through Scholar Stream.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/all-scholarships">
            <button className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Get Started Now
            </button>
          </Link>
          <Link to="/about">
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
              Learn More
            </button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>Verified Scholarships</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>Secure & Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
