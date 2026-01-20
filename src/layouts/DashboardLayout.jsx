import { BsFileEarmarkText, BsFillPersonVcardFill } from "react-icons/bs";
import { FaStarHalfAlt, FaUsersCog } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { MdHome, MdLogout } from "react-icons/md";
import { SiGoogleanalytics, SiSemanticscholar } from "react-icons/si";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are logged out",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  const menuItems = [
    {
      label: "My Profile",
      icon: BsFillPersonVcardFill,
      path: "/dashboard",
      common: true,
      end: true,
    },
    { label: "Home", icon: MdHome, path: "/", common: true },
  ];

  const adminItems = [
    {
      label: "Users Management",
      icon: FaUsersCog,
      path: "/dashboard/users-management",
    },
    {
      label: "Add Scholarship",
      icon: IoSchoolSharp,
      path: "/dashboard/add-scholarship",
    },
    {
      label: "Scholarship Management",
      icon: SiSemanticscholar,
      path: "/dashboard/scholarship-management",
    },
    {
      label: "Analytics",
      icon: SiGoogleanalytics,
      path: "/dashboard/analytics",
    },
  ];

  const moderatorItems = [
    {
      label: "Application Management",
      icon: BsFileEarmarkText,
      path: "/dashboard/application-management",
    },
    {
      label: "Review Management",
      icon: FaStarHalfAlt,
      path: "/dashboard/all-reviews",
    },
  ];

  const studentItems = [
    {
      label: "My Application",
      icon: BsFileEarmarkText,
      path: "/dashboard/my-application",
    },
    { label: "My Reviews", icon: FaStarHalfAlt, path: "/dashboard/my-reviews" },
  ];

  const getRoleItems = () => {
    switch (role) {
      case "admin":
        return adminItems;
      case "moderator":
        return moderatorItems;
      case "student":
        return studentItems;
      default:
        return [];
    }
  };

  const NavItem = ({ icon: Icon, label, path, isActive, end }) => (
    <NavLink
      to={path}
      end={end}
      className={({ isActive: active }) => `
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-md font-semibold"
            : "text-gray-700 hover:bg-teal-100 hover:text-teal-700"
        }
      `}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {isActive && <span className="w-2 h-2 bg-white rounded-full"></span>}
    </NavLink>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header/Navbar */}
        <nav className="navbar bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-lg px-4 md:px-8 sticky top-0 z-40">
          <div className="flex-1">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-circle lg:hidden hover:bg-white/20"
            >
              <TbLayoutSidebarLeftExpandFilled size={24} />
            </label>
            <div className="flex items-center gap-3 ml-2 md:ml-0">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">📊</span>
              </div>
              <h2 className="text-lg md:text-2xl font-bold">
                {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
              </h2>
            </div>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control hidden sm:block">
              <p className="text-sm text-teal-50">
                Welcome,{" "}
                <span className="font-semibold">
                  {user?.displayName || "User"}
                </span>
              </p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="flex flex-col min-h-full w-64 bg-white shadow-2xl overflow-y-auto">
          {/* Sidebar Header */}
          <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-indigo-600 text-white p-6 shadow-md z-20">
            <h3 className="text-lg font-bold">Scholar Stream</h3>
            <p className="text-sm text-teal-50 mt-1">Dashboard Menu</p>
          </div>

          {/* Navigation Menu */}
          <ul className="flex flex-col gap-2 p-4 flex-grow">
            {/* Common Items */}
            <div className="space-y-2">
              {menuItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>

            {/* Divider */}
            {getRoleItems().length > 0 && (
              <>
                <div className="divider my-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    {role === "admin"
                      ? "Admin Tools"
                      : role === "moderator"
                        ? "Moderator Tools"
                        : "Student Tools"}
                  </span>
                </div>

                {/* Role Specific Items */}
                <div className="space-y-2">
                  {getRoleItems().map((item) => (
                    <NavItem key={item.path} {...item} />
                  ))}
                </div>
              </>
            )}
          </ul>

          {/* Sidebar Footer - Logout Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-700 font-semibold rounded-lg hover:bg-red-100 transition-all duration-300 hover:shadow-md"
            >
              <MdLogout size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* User Info Card */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-teal-50 to-indigo-50 rounded-lg p-3 border border-teal-200">
              <p className="text-xs text-gray-600 font-semibold uppercase mb-1">
                Logged in as
              </p>
              <p className="text-sm font-bold text-teal-700 truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <div className="mt-2 inline-block px-2 py-1 bg-teal-200 text-teal-800 rounded text-xs font-semibold">
                {role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
