import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleSignin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [regiLoading, setRegiLoading] = useState(false);
  const handleGoogleSignIn = () => {
    setRegiLoading(true);
    googleSignin()
      .then((result) => {
        const userInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        // create user in the daabase
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Account created successfully`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
          navigate(location.state || "/");
          setRegiLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setRegiLoading(false);
      });
  };
  return (
    <div className="">
      {regiLoading ? (
        <button
          disabled=""
          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition duration-300 transform hover:scale-105 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="animate-spin h-5 w-5 mr-3 text-white"
          >
            <circle
              stroke-width="4"
              stroke="currentColor"
              r="10"
              cy="12"
              cx="12"
              class="opacity-25"
            ></circle>
            <path
              d="M4 12a8 8 0 018-8v8H4z"
              fill="currentColor"
              class="opacity-75"
            ></path>
          </svg>
          Processing...
        </button>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] w-full"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      )}
    </div>
  );
};

export default SocialLogin;
