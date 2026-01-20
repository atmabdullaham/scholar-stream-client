import { motion } from "motion/react";

const Privacy = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-4xl space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Scholar Stream ("we", "us", "our") operates the Scholar Stream
                website and mobile application. This page informs you of our
                policies regarding the collection, use, and disclosure of
                personal data when you use our Service and the choices you have
                associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                2. Information Collection and Use
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We collect several different types of information for various
                purposes to provide and improve our Service to you.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  password, profile picture
                </li>
                <li>
                  <strong>Application Data:</strong> Scholarship applications,
                  documents, and communications
                </li>
                <li>
                  <strong>Usage Information:</strong> Device type, browser type,
                  pages visited, time and date
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details
                  processed through secure payment gateways
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                3. Use of Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Scholar Stream uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To gather analysis or valuable information</li>
                <li>To monitor the usage of our Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                4. Security of Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The security of your data is important to us but remember that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                5. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                📧 privacy@scholarstream.com
                <br />
                📞 +1 (555) 123-4567
              </p>
            </section>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: January 2024
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
