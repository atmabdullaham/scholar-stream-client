import { BsFillPersonVcardFill } from "react-icons/bs";
import { MdHome } from "react-icons/md";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
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
            Scholar Stream Dashboard
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

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <VscSettings size={24} />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
