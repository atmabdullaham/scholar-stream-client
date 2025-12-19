import { SiGooglescholar } from "react-icons/si";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 shadow-md">
        <SiGooglescholar className="text-white" size={22} />
      </div>

      <div className="leading-tight">
        <h3 className="text-lg font-extrabold tracking-tight text-gray-900">
          Scholar
        </h3>
        <p className="text-sm font-semibold tracking-wide text-teal-600">
          Stream
        </p>
      </div>
    </div>
  );
};

export default Logo;
