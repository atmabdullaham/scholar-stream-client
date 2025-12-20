import { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineNotInterested, MdVerified } from "react-icons/md";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import LogoLoader from "../../../components/LogoLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, updateUserProfile, deleteAccount, loading } = useAuth();

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState();
  const [currentDisplayName, setCurrenDisplayName] = useState();
  const [bookings, setBookigs] = useState();
  const axiosSecure = useAxiosSecure();
  const [dataLoading, setDataLoading] = useState(true);

  const email = user?.email;

  const emailVerified = user?.emailVerified;
  const metadata = user?.metadata;

  useEffect(() => {
    const photo = user?.photoURL;
    setCurrentPhoto(photo);
    const displayName = user?.displayName;
    setCurrenDisplayName(displayName);
  }, [user]);

  const handleEditToggle = () => {
    setEdit(!edit);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedName = e.target.displayName.value;
    const updatedPhoto = e.target.photoUrl.value;
    if (currentPhoto === updatedPhoto && currentDisplayName === updatedName) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: `Change your name or photo url to update`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    updateUserProfile(updatedName, updatedPhoto)
      .then(() => {
        user.displayName = updatedName;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Profile Updated`,
          showConfirmButton: false,
          timer: 2000,
        });
        setCurrenDisplayName(updatedName);
        setCurrentPhoto(updatedPhoto);
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Profile was not updated`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const handleDeleteAccount = () => {
    deleteAccount()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your account deleted`,
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Signin again to delete the account`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };
  if (loading) {
    return <LogoLoader> </LogoLoader>;
  }

  return (
    <div className="grid grid-cols-12 mx-auto gap-5 py-2">
      <div className="bg-cyan-50 col-span-12 md:col-span-3 flex flex-col items-center py-8 gap-4 rounded-2xl">
        <img
          src={currentPhoto}
          referrerPolicy="no-referrer"
          alt=""
          className="w-36 h-36 rounded-full border-4 border-cyan-200 p-2 "
        />
        <h2 className="text-lg font-semibold text-gray-500">
          {currentDisplayName}
        </h2>
        <h2 className="text-lg font-semibold text-gray-500">{email}</h2>
        <button onClick={handleDeleteAccount} className="btn text-red-400">
          Delete Account
        </button>
      </div>
      <div className="bg-blue-50 col-span-12 md:col-span-9  p-8 space-y-4 rounded-2xl ">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">My Profile</h1>
          <button onClick={handleEditToggle} className="cursor-pointer">
            <FaEdit size={20} />
          </button>
        </div>
        <hr />
        {edit ? (
          <form className="space-y-4" onSubmit={handleUpdateProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
              <div>
                <h1>Full Name</h1>
                <input
                  name="displayName"
                  type="text"
                  placeholder="Success"
                  className="input input-success"
                  defaultValue={currentDisplayName}
                />
              </div>
              <div>
                <h1>Email</h1>
                <input
                  type="text"
                  placeholder="You can't touch this"
                  className="input"
                  disabled
                  value={email}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
              <div>
                <h1>Photo Url</h1>
                <input
                  name="photoUrl"
                  type="url"
                  placeholder="Success"
                  className="input input-success"
                  defaultValue={currentPhoto}
                />
              </div>
              <div>
                <h1>Phone</h1>
                <h1>+880...</h1>
              </div>
            </div>
            <button type="submit" className="btn bg-green-600 text-white">
              <GrUpdate />
              Update Profile
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
              <div>
                <h1>Full Name</h1>
                <h1 className=" p-2 text-gray-500">{currentDisplayName}</h1>
              </div>
              <div>
                <h1>Email</h1>
                <h1 className=" p-2 text-gray-500">{email}</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
              <div>
                <h1>Last SignIn Time</h1>
                <h1 className=" p-2 text-gray-600">
                  {metadata?.lastSignInTime}
                </h1>
              </div>
              <div>
                <h1>Phone</h1>
                <h1>+880...</h1>
              </div>
            </div>
            <button
              type="submit"
              className="btn  bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              <GrUpdate />
              Update Profile
            </button>
          </div>
        )}

        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Activity</h1>
        </div>
        <hr />
        <div>
          <div className="flex gap-5 items-center">
            <h1>Created on:</h1>
            <h1 className="text-xs">
              {new Date(metadata?.creationTime).toLocaleString()}
            </h1>
          </div>
          <div className="flex gap-5 items-center">
            <h1>Verified:</h1>
            {emailVerified ? (
              <span className="text-blue-600">
                <MdVerified />
              </span>
            ) : (
              <span className="text-red-600">
                <MdOutlineNotInterested />
              </span>
            )}
          </div>
          <div className="flex gap-5 items-center">
            <h1>Last Login:</h1>
            {new Date(user?.metadata?.lastSignInTime).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
