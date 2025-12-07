import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-base-200 p-6 shadow-2xl">
      <h2>Scholar Stream</h2>
      <div className="flex min-h-[calc(100vh-100px)] items-center rounded-2xl p-4">
        <div className="flex-1 h-full ">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 bg-[#FAFDF0]"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
