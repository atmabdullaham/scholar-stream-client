import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  console.log(sessionId);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl text-green-800">
        Payment Successfull For Scholarship Application
      </h2>
    </div>
  );
};

export default PaymentSuccess;
