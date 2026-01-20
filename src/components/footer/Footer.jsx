import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition"
              title="Facebook"
            >
              <FaFacebook size={24} className="text-blue-600" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition"
              title="Instagram"
            >
              <FaInstagram size={24} className="text-pink-600" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition"
              title="LinkedIn"
            >
              <FaLinkedin size={24} className="text-blue-700" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition dark:bg-gray-200 rounded-md"
              title="Twitter/X"
            >
              <FaXTwitter size={24} className="text-gray-900 dark:text-gray-900" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition"
              title="YouTube"
            >
              <FaYoutube size={24} className="text-red-600" />
            </a>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 dark:border-gray-800 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Resources
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Contact Support
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Platform
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="/all-scholarships"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Browse Scholarships
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/help"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Information
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <a
                  href="mailto:support@scholarstream.com"
                  className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Contact
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <p className="text-gray-700 dark:text-gray-300">
                  📧 support@scholarstream.com
                </p>
              </li>

              <li>
                <p className="text-gray-700 dark:text-gray-300">
                  📞 +1 (555) 123-4567
                </p>
              </li>

              <li>
                <p className="text-gray-700 dark:text-gray-300">
                  📍 123 Education Lane, Learning City, LC 12345
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Scholar Stream. All rights reserved. |
            Made with ❤️ for students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
