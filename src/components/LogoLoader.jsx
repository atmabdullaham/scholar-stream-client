import { SiGooglescholar } from "react-icons/si";

const LogoLoader = () => {
  return (
    <div className="relative flex flex-col gap-4 justify-center items-center h-[calc(100vh-200px)]  dark:bg-gray-900">
      <div className="relative flex justify-center items-center">
        {/* Outer spinning ring */}
        <div className="absolute animate-spin rounded-full h-20 w-20 border-4 border-teal-700 border-t-transparent"></div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 shadow-md">
          <SiGooglescholar className="text-white" size={22} />
        </div>
        {/* Logo animation */}
      </div>
    </div>
  );
};

export default LogoLoader;
