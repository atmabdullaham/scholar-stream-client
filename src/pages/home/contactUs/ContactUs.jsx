import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

const ContactUs = () => {
  return (
    <section className="bg-teal-50 py-10 md:py-16">
      <div className="mx-auto w-11/12 md:w-10/12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h2>
          <p className="mt-2 text-gray-600">
            Have questions about scholarships or need assistance? Our team is
            ready to support you.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="rounded-2xl bg-white p-6 shadow-sm  space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Get in Touch
            </h3>

            <p className="text-sm text-gray-600">
              Contact us for scholarship guidance, technical help, or general
              inquiries related to Scholar Stream.
            </p>

            {/* Info Items */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMail className="text-teal-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">
                    support@scholarstream.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="text-teal-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-600">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-teal-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Office Location
                  </p>
                  <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Static) */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <button
                type="button"
                className="btn w-full bg-teal-600 text-white hover:bg-teal-700 flex items-center justify-center gap-2"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
