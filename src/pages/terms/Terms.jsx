import { motion } from "motion/react";

const Terms = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="w-11/12 md:w-10/12 mx-auto py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-4xl space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By accessing and using the Scholar Stream website and
                application, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the
                above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                2. Use License
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Permission is granted to temporarily download one copy of the
                materials (information or software) on Scholar Stream for
                personal, non-commercial transitory viewing only. This is the
                grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose</li>
                <li>Attempting to decompile or reverse engineer any software</li>
                <li>Removing any copyright or other proprietary notations</li>
                <li>Transferring the materials to another person or server</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                3. Disclaimer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The materials on Scholar Stream's website are provided on an
                'as is' basis. Scholar Stream makes no warranties, expressed or
                implied, and hereby disclaims and negates all other warranties
                including, without limitation, implied warranties or conditions
                of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                4. Limitations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                In no event shall Scholar Stream or its suppliers be liable for
                any damages (including, without limitation, damages for loss of
                data or profit, or due to business interruption) arising out of
                the use or inability to use the materials on Scholar Stream's
                website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                5. Accuracy of Materials
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The materials appearing on Scholar Stream's website could include
                technical, typographical, or photographic errors. Scholar Stream
                does not warrant that any of the materials on its website are
                accurate, complete, or current. Scholar Stream may make changes
                to the materials contained on its website at any time without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                6. Links
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Scholar Stream has not reviewed all of the sites linked to its
                website and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by Scholar Stream of the site. Use of any such
                linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                7. Modifications
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Scholar Stream may revise these terms of service for its website
                at any time without notice. By using this website, you are
                agreeing to be bound by the then current version of these terms
                of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                8. Governing Law
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of the jurisdiction in which Scholar
                Stream is located, and you irrevocably submit to the exclusive
                jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                9. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                📧 support@scholarstream.com
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

export default Terms;
