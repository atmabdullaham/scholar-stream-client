import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "../../../components/SkeletonCard";
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
    <section className=" bg-teal-50">
      <div className="w-11/12 md:w-10/12 mx-auto py-8 md:py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Top Scholarships
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Top affordable scholarship opportunities
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : scholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship._id}
                  scholarship={scholarship}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;
