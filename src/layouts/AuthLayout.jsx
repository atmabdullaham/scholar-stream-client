import { Link, Outlet } from "react-router";
import Logo from "../components/logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left / Form Area */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Logo */}
            <div className="flex justify-center md:justify-start mb-6">
              <Link to={"/"}>
                <Logo />
              </Link>
            </div>
            <Outlet />
          </div>
        </div>

        {/* Right / Visual Area */}
        <div className="hidden md:flex w-1/2 bg-linear-to-br from-teal-50 to-teal-100 items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Scholar Stream 🎓
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Manage scholarships, track applications, and plan your academic
              journey easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
