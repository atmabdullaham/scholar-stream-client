import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-white  dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo></Logo>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <a href="https://facebook.com" target="_blank">
              <FaFacebook size={24} color="#1877F2" />
            </a>

            <a href="https://instagram.com" target="_blank">
              <FaInstagram size={24} color="#E4405F" />
            </a>

            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin size={24} color="#0A66C2" />
            </a>

            <a
              href="https://twitter.com"
              className="dark:bg-gray-200 rounded-md"
              target="_blank"
            >
              <FaXTwitter size={24} color="#000000" />
            </a>

            <a href="https://youtube.com" target="_blank">
              <FaYoutube size={24} color="#FF0000" />
            </a>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 dark:border-gray-800">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Services
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Company Review
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Accounts Review
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  HR Consulting
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Company</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Meet the Team
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Accounts Review
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Helpful Links
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  FAQs
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Live Chat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Legal</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Accessibility
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Returns Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}. Scholar Stream. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
