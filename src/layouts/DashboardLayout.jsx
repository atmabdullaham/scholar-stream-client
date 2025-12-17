import { BsFileEarmarkText, BsFillPersonVcardFill } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { IoSchoolSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-teal-600">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn bg-transparent border-none shadow-none"
          >
            {/* Sidebar toggle icon */}

            <TbLayoutSidebarLeftExpandFilled color="#ffffff" size={24} />
          </label>
          <h2 className="px-4 text-2xl font-bold text-white">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h2>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-gray-100 text-sm font-medium text-teal-600 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <MdHome size={24} />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {/* Our dashboard llinks */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                data-tip="My Profile"
                to={"/dashboard/my-profile"}
              >
                <BsFillPersonVcardFill size={24} />

                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                    to={"/dashboard/users-management"}
                  >
                    <FaUsersCog size={24} />
                    <span className="is-drawer-close:hidden">
                      Users Management
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                    data-tip="Add Scholarship"
                    to={"/dashboard/add-scholarship"}
                  >
                    <IoSchoolSharp size={24} />
                    <span className="is-drawer-close:hidden">
                      Add Scholarship
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                    data-tip="Scholarship Management"
                    to={"/dashboard/scholarship-management"}
                  >
                    <FcManager size={24}></FcManager>
                    <span className="is-drawer-close:hidden">
                      ScholarshipManagement
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* moderator */}
            {role === "moderator" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                    data-tip="Application Management"
                    to={"/dashboard/application-management"}
                  >
                    <BsFileEarmarkText size={24} />
                    <span className="is-drawer-close:hidden">
                      Application Management
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                    data-tip="Review Management"
                    to={"/dashboard/all-reviews"}
                  >
                    <BsFileEarmarkText size={24} />
                    <span className="is-drawer-close:hidden">
                      Review Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {role === "student" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                    data-tip="My Application"
                    to={"/dashboard/my-application"}
                  >
                    <BsFileEarmarkText size={24} />
                    <span className="is-drawer-close:hidden">
                      My Application
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                is-drawer-close:tooltip-right"
                    data-tip="My Reviews"
                    to={"/dashboard/my-reviews"}
                  >
                    <BsFileEarmarkText size={24} />
                    <span className="is-drawer-close:hidden">My Reviews</span>
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
