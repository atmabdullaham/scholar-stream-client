import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LogoLoader from "../../../components/LogoLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: summary = {} } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/summary");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["applications-by-category"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/applications-by-category");
      return res.data;
    },
  });
  const COLORS = {
    "Full fund": "#22c55e",
    Partial: "#3b82f6",
    "Self fund": "#f97316",
  };

  if (isLoading) {
    return <LogoLoader></LogoLoader>;
  }

  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl bg-white p-5 shadow border">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-3xl font-bold text-teal-600">
            {summary.totalUsers}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow border">
          <p className="text-gray-500 text-sm">Total Scholarships</p>
          <p className="text-3xl font-bold text-indigo-600">
            {summary.totalScholarships}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow border">
          <p className="text-gray-500 text-sm">Total Fees Collected</p>
          <p className="text-3xl font-bold text-rose-600">
            ${summary.totalFeesCollected}
          </p>
        </div>
      </div>

      <div className="bg-white  p-6 rounded-xl shadow border">
        <h3 className="text-xl font-bold mb-4">
          Applications by Scholarship Category
        </h3>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications">
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[entry.category] || "#94a3b8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
