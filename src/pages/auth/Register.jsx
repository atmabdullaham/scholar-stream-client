import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { createNewUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [regiLoading, setRegiLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    console.log(data);
    try {
      setRegiLoading(true);
      const result = await createNewUser(data.email, data.password);
      if (!result?.user?.uid) return;
      const updatedUser = await updateUserProfile(data.name, data.photoURL);
      if (!updatedUser) return;
      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoURL: data.photoURL,
      };
      const res = await axiosSecure.post("/users", userInfo);

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
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Account creation fail`,
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setRegiLoading(false);
    }
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl  p-2 md:p-8 mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-2">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="Write full name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">Name is required</p>
          )}
        </div>

        {/* Photo URL */}
        <div>
          <label className="text-sm font-medium text-gray-700">Photo URL</label>
          <input
            type="url"
            {...register("photoURL", { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="https://example.com/photo.jpg"
          />
          {errors.photoUrl && (
            <p className="text-xs text-red-500 mt-1">Photo is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
            })}
            className="input input-bordered w-full mt-1"
            placeholder="Enter a strong password"
          />
          <button
            onClick={handleTogglePassword}
            className="absolute top-9 right-2 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
          {errors.password?.type === "required" && (
            <p className="text-xs text-red-500 mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-xs text-red-500 mt-1">
              Password must be at least 6 characters long
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-xs text-red-500 mt-1">
              Password must contain uppercase, lowercase, number, and special
              character
            </p>
          )}
        </div>

        {/* Submit */}
        {regiLoading ? (
          <button
            disabled
            className="w-full py-3 px-6 rounded-full bg-linear-to-r from-teal-500 to-teal-700 text-white font-semibold flex items-center justify-center gap-2 animate-pulse"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin h-5 w-5"
            >
              <circle
                strokeWidth="4"
                stroke="currentColor"
                r="10"
                cy="12"
                cx="12"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8v8H4z"
                fill="currentColor"
                className="opacity-75"
              />
            </svg>
            Processing...
          </button>
        ) : (
          <button className="btn w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold mt-2">
            Register
          </button>
        )}
      </form>

      {/* Social Login */}
      <div className="my-6">
        <SocialLogin />
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          state={location.state}
          to="/auth/login"
          className="text-teal-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
