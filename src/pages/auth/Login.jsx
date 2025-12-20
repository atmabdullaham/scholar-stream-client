import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { loginExistingUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    loginExistingUser(data.email, data.password).then(() => {
      navigate(location.state || "/");
    });
  };

  return (
    <div className="w-full bg-white  rounded-2xl p-2 md:p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input input-bordered w-full mt-1"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">Password is required</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <a className="text-sm text-teal-600 hover:underline cursor-pointer">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button className="btn w-full bg-teal-600 hover:bg-teal-700 text-white">
          Login
        </button>
      </form>

      {/* Social Login */}
      <div className="my-6">
        <SocialLogin />
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        New here?{" "}
        <Link
          state={location.state}
          to="/auth/register"
          className="text-teal-600 font-medium hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
