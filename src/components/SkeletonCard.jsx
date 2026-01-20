const SkeletonCard = () => {
  return (
    <div className="group animate-pulse">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Image Skeleton */}
        <div className="w-full h-56 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-none"></div>

        {/* Content Skeleton */}
        <div className="p-5 space-y-3">
          {/* Title and University */}
          <div className="space-y-2">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2"></div>
          </div>

          {/* Badges Skeleton */}
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"></div>
            <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"></div>
          </div>

          {/* Fees and Deadline Skeleton */}
          <div className="flex justify-between pt-2 space-x-4">
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2"></div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 ml-auto"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 ml-auto"></div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="pt-2">
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
