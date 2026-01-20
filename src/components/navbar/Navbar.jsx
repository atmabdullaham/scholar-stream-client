import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Logo from "../logo/Logo";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const email = user?.email;
  const [displayName, setDisplayName] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    setPhoto(user?.photoURL);
    setDisplayName(user?.displayName);
  }, [user]);

  const handleLogout = () => {
    logOutUser().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are loged out",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  const links = (
    <>
      <li className="font-semibold">
        <NavLink
          className={({ isActive }) => (isActive ? "text-teal-600" : "")}
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink
          className={({ isActive }) => (isActive ? "text-teal-600" : "")}
          to={"/all-scholarships"}
        >
          Scholarships
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink
          className={({ isActive }) => (isActive ? "text-teal-600" : "")}
          to={"/about-us"}
        >
          About Us
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink
          className={({ isActive }) => (isActive ? "text-teal-600" : "")}
          to={"/contact-support"}
        >
          Contact
        </NavLink>
      </li>
      <li className="font-semibold">
        <NavLink
          className={({ isActive }) => (isActive ? "text-teal-600" : "")}
          to={"/blog"}
        >
          Blog
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="md:w-11/12 mx-auto navbar  md:rounded-4xl md:mt-2 bg-teal-50 px-4 fixed top-0 left-0 right-0 z-50 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"}>
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-3 flex items-center">
        {user ? (
          <div className="flex items-center gap-2">
            {/* Dashboard Button */}
            <Link
              to={"/dashboard"}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-100 text-teal-700 font-semibold hover:bg-teal-200 transition"
            >
              <MdDashboard /> Dashboard
            </Link>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost p-0 border-0">
                {photo ? (
                  <img
                    src={photo}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <CgProfile
                    size={26}
                    className="text-gray-700 dark:text-gray-300"
                  />
                )}
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content z-20 menu bg-base-100 dark:bg-gray-800 
    dark:text-gray-200 w-60 mt-3 p-3 shadow-xl rounded-lg space-y-1
    border border-base-content/10 dark:border-gray-700"
              >
                <li className="bg-cyan-100 dark:bg-green-900/30 rounded-md p-3 pointer-events-none">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Signed in as
                  </p>
                  <p className="text-base font-medium dark:text-white">
                    {displayName}
                  </p>
                  <p className="text-xs dark:text-gray-300">{email}</p>
                </li>

                <li>
                  <Link
                    to={"/dashboard"}
                    className="text-sm py-2 mt-1 hover:border-cyan-500 border-l-4 border-transparent 
        hover:bg-cyan-50 dark:hover:bg-green-900/20 dark:hover:text-white
        dark:border-transparent"
                  >
                    <MdDashboard size={20} className="dark:text-gray-300" />
                    Dashboard
                    <span className="ml-auto">
                      <IoIosArrowForward className="dark:text-gray-400" />
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/dashboard/my-profile"}
                    className="text-sm py-2 hover:border-indigo-500 border-l-4 border-transparent 
        hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:hover:text-white
        dark:border-transparent"
                  >
                    <FaUser size={20} className="dark:text-gray-300" />
                    My Profile
                    <span className="ml-auto">
                      <IoIosArrowForward className="dark:text-gray-400" />
                    </span>
                  </Link>
                </li>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-sm py-2 hover:bg-red-50 dark:hover:bg-red-900/20 
        border-l-4 border-transparent hover:border-red-500 dark:hover:border-red-600
        dark:text-gray-200"
                  >
                    <FiLogOut size={20} className="dark:text-gray-300" />
                    Logout
                    <span className="ml-auto">
                      <IoIosArrowForward className="dark:text-gray-400" />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* If NOT logged in */
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                to={"/auth/login"}
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
              >
                Login
              </Link>

              <div className="hidden sm:flex">
                <Link
                  to={"/auth/register"}
                  className="rounded-md bg-white border hover:bg-teal-600 hover:text-white px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
