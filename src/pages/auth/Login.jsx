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
    loginExistingUser(data.email, data.password).then((result) => {
      console.log(result);
      navigate(location.state || "/");
    });
  };
  return (
    <div className="card bg-base-100 w-full shadow-2xl h-full">
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
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
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
      <p>
        New to website{" "}
        <Link state={location.state} to={"/register"}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
