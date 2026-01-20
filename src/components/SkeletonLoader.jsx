import React from "react";

export const SkeletonLoader = ({ count = 6, variant = "card" }) => {
  if (variant === "card") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md animate-pulse"
          >
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="pt-2">
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === "text") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
          </div>
        ))}
      </>
    );
  }

  if (variant === "table-row") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
            <td className="px-4 py-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </td>
            <td className="px-4 py-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
            </td>
            <td className="px-4 py-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </td>
            <td className="px-4 py-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
            </td>
          </tr>
        ))}
      </>
    );
  }
};

export default SkeletonLoader;
