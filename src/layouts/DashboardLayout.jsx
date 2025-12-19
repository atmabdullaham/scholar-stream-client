import { BsFileEarmarkText, BsFillPersonVcardFill } from "react-icons/bs";
import { FaStarHalfAlt, FaUsersCog } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { SiGoogleanalytics, SiSemanticscholar } from "react-icons/si";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        <nav className="navbar bg-teal-600 text-white shadow-md px-4 md:px-8">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <TbLayoutSidebarLeftExpandFilled size={24} />
          </label>
          <h2 className="text-xl md:text-2xl font-bold ml-4">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h2>
        </nav>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="flex flex-col min-h-full w-64 bg-white border-r shadow-lg text-gray-700">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Menu</h3>
          </div>

          <ul className="menu grow p-4 gap-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
              >
                <MdHome size={22} />
                Homepage
              </Link>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
              >
                <BsFillPersonVcardFill size={22} />
                My Profile
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <FaUsersCog size={22} />
                    Users Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-scholarship"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <IoSchoolSharp size={22} />
                    Add Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/scholarship-management"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <SiSemanticscholar size={22} />
                    Scholarship Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/analytics"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <SiGoogleanalytics size={22} />
                    Analytics
                  </NavLink>
                </li>
              </>
            )}

            {role === "moderator" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/application-management"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <BsFileEarmarkText size={22} />
                    Application Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-reviews"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <FaStarHalfAlt size={22} />
                    Review Management
                  </NavLink>
                </li>
              </>
            )}

            {role === "student" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-application"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <BsFileEarmarkText size={22} />
                    My Application
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-reviews"
                    className="flex items-center gap-3 hover:bg-teal-100 rounded-md p-2"
                  >
                    <FaStarHalfAlt size={22} />
                    My Reviews
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
