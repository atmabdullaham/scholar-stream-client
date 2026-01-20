import { IoMoon, IoSunny } from "react-icons/io5";

const DarkModeToggle = () => {
  return (
    <button
      disabled
      className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 opacity-50 cursor-not-allowed"
      aria-label="Dark mode (disabled)"
      title="Dark mode is currently disabled"
    >
      <IoMoon className="w-5 h-5 text-gray-700" />
    </button>
  );
};

export default DarkModeToggle;
