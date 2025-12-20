import { HiXCircle } from "react-icons/hi";
import { Link, useSearchParams } from "react-router";

const PaymentCancelled = () => {
  const [params] = useSearchParams();

  const universityName = params.get("universityName");
  const degree = params.get("degree");
  const scholarshipCategory = params.get("scholarshipCategory");
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl p-6 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full dark:bg-red-700">
            <HiXCircle className="w-14 h-14 text-red-600 dark:text-red-100" />
          </div>

          <h1 className="text-4xl font-extrabold text-red-700 dark:text-red-400">
            Payment fail!
          </h1>

          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            Your scholarship application has been submitted successfully.
          </p>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            But your payment faild.
          </p>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            Go to my application to get the payment link for this application.
          </p>

          <div className="p-5 mt-8 bg-indigo-50 rounded-xl dark:bg-gray-800 shadow-lg text-left">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Application Details
            </h2>

            <p className="text-gray-800 dark:text-gray-300 mt-1">
              <span className="font-semibold">University:</span>{" "}
              {universityName}
            </p>

            <p className="text-gray-800 dark:text-gray-300 mt-1">
              <span className="font-semibold">Scholarship Type:</span>{" "}
              {scholarshipCategory}
            </p>

            <p className="text-gray-800 dark:text-gray-300 mt-1">
              <span className="font-semibold">Degree:</span> {degree}
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-700 dark:text-gray-400">
            If you need any help, feel free to contact our support team at{" "}
            <a
              href="mailto:support@scholarstream.com"
              className="font-medium text-indigo-600 dark:text-indigo-400 underline"
            >
              support@scholarstream.com
            </a>
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/dashboard/my-application"
            className="inline-block px-6 py-3 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-linear-to-r from-teal-600 to-teal-700 hover:scale-105 hover:from-teal-700 hover:to-teal-600"
          >
            Go to My Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
