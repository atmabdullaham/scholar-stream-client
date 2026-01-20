import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../../../components/SkeletonLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ScholarshipCard from "../../allScholarships/scholarshipCard/ScholarshipCard";

const TopScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-scholarships");
      return res.data;
    },
  });

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Top Scholarships
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Top affordable scholarship opportunities
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <SkeletonLoader count={8} variant="card" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {scholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopScholarships;
