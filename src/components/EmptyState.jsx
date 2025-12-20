import { FiSearch } from "react-icons/fi";

const EmptyState = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <FiSearch className="text-4xl text-gray-300 mb-3" />

      <h3 className="text-lg font-semibold text-gray-700">No data found</h3>

      <p className="mt-1 text-sm text-gray-500 max-w-sm">
        Try adjusting your search or filters.
      </p>
    </div>
  );
};

export default EmptyState;
