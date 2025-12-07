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
    try {
      setRegiLoading(true);
      // 1. Create user in Firebase
      const result = await createNewUser(data.email, data.password);

      if (!result?.user?.uid) {
        return;
      }

      // 2. Update Firebase user profile
      const updatedUser = await updateUserProfile(data.name, data.photoUrl);

      // If profile not updated successfully the block here
      if (!updatedUser) {
        return;
      }

      // 3. Prepare data to store in backend
      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoUrl: data.photoUrl,
      };

      // 4. Save user in database
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

      // 5. Redirect after everything is done
      navigate(location.state || "/");
    } catch (error) {
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Account creation fail`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } finally {
      setRegiLoading(false);
    }
  };

  // show or hide password function
  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="card bg-base-100 w-full shadow-2xl h-full">
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
          {/* Photo */}
          <div>
            <label className="label">Photo</label>
            <input
              type="url"
              {...register("photoUrl", { required: true })}
              className="input w-full"
              placeholder="Photo url here"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
          {/* Password */}
          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,

                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
              })}
              className="input w-full"
              placeholder="Enter your password"
            />
            <button
              onClick={handleTogglePassword}
              className="btn btn-xs absolute top-9 right-2 bg-transparent border-0"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters long
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special character
              </p>
            )}
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
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
            <button className="btn btn-neutral mt-4">Register</button>
          )}
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
      <p>
        Already have an account ?
        <Link state={location.state} to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
