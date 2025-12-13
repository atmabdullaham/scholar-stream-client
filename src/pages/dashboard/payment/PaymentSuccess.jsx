import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`application-payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            universityName: res.data.scholarshipDetails.universityName,
            scholarshipCategory:
              res.data.scholarshipDetails.scholarshipCategory,
            degree: res.data.scholarshipDetails.degree,
            amountPaid: res.data.amountPaid,
            currency: res.data.currency,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl p-6 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-700">
            <HiCheckCircle className="w-14 h-14 text-green-600 dark:text-green-100" />
          </div>

          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            Payment Successful!
          </h1>

          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            Your scholarship application has been submitted successfully.
          </p>

          <div className="p-5 mt-8 bg-indigo-50 rounded-xl dark:bg-gray-800 shadow-lg text-left">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Application Details
            </h2>

            <p className="text-gray-800 dark:text-gray-300">
              <span className="font-semibold">Transaction ID:</span>{" "}
              {paymentInfo?.transactionId}
            </p>
            <p className="text-gray-800 dark:text-gray-300 flex items-center">
              <span className="font-semibold">You paid:</span>{" "}
              {paymentInfo?.amountPaid / 100}
              {paymentInfo?.currency === "usd" ? (
                <FaDollarSign></FaDollarSign>
              ) : (
                ""
              )}
            </p>

            <p className="text-gray-800 dark:text-gray-300 mt-1">
              <span className="font-semibold">University:</span>{" "}
              {paymentInfo?.universityName}
            </p>

            <p className="text-gray-800 dark:text-gray-300 mt-1">
              <span className="font-semibold">Scholarship Type:</span>{" "}
              {paymentInfo?.scholarshipCategory}
            </p>

            <p className="text-gray-800 dark:text-gray-300 mt-1">
              <span className="font-semibold">Degree:</span>{" "}
              {paymentInfo?.degree}
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
            to="/dashboard/my-applications"
            className="inline-block px-6 py-3 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-linear-to-r from-teal-600 to-teal-700 hover:scale-105 hover:from-teal-700 hover:to-teal-600"
          >
            Go to My Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
