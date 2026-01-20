import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaFileAlt, FaSchool, FaUsers } from "react-icons/fa";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
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
    "Full fund": "#10b981",
    Partial: "#3b82f6",
    "Self fund": "#f97316",
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">
            {payload[0].payload.category}
          </p>
          <p className="text-teal-600 font-bold">
            Applications: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <LogoLoader></LogoLoader>;
  }

  // Calculate total applications
  const totalApplications = chartData.reduce(
    (sum, item) => sum + item.applications,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-teal-50">
              Real-time insights and system overview
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{totalApplications}</p>
            <p className="text-teal-100">Total Applications</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-xl shadow-md border border-teal-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-teal-600 to-indigo-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Total Users
              </h3>
              <div className="p-3 bg-teal-100 rounded-lg">
                <FaUsers className="text-teal-600" size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold text-teal-700">
              {summary.totalUsers || 0}
            </p>
            <p className="text-xs text-teal-600 mt-2">Active members</p>
          </div>
        </div>

        {/* Total Scholarships Card */}
        <div className="bg-white rounded-xl shadow-md border border-indigo-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Scholarships
              </h3>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <FaSchool className="text-indigo-600" size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold text-indigo-700">
              {summary.totalScholarships || 0}
            </p>
            <p className="text-xs text-indigo-600 mt-2">Active listings</p>
          </div>
        </div>

        {/* Total Applications Card */}
        <div className="bg-white rounded-xl shadow-md border border-amber-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Applications
              </h3>
              <div className="p-3 bg-amber-100 rounded-lg">
                <FaFileAlt className="text-amber-600" size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold text-amber-700">
              {totalApplications || 0}
            </p>
            <p className="text-xs text-amber-600 mt-2">Total submissions</p>
          </div>
        </div>

        {/* Total Fees Card */}
        <div className="bg-white rounded-xl shadow-md border border-rose-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-2 bg-gradient-to-r from-rose-600 to-pink-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Fees Collected
              </h3>
              <div className="p-3 bg-rose-100 rounded-lg">
                <FaDollarSign className="text-rose-600" size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold text-rose-700">
              ${summary.totalFeesCollected || 0}
            </p>
            <p className="text-xs text-rose-600 mt-2">Total revenue</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart - Applications by Category */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-teal-50 to-indigo-50">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-teal-600 to-indigo-600 rounded"></span>
              Applications by Category
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Distribution of scholarship applications
            </p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="category"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                />
                <Bar dataKey="applications" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.category] || "#94a3b8"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-teal-50 to-indigo-50">
            <h3 className="text-xl font-bold text-gray-800">
              Category Breakdown
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: COLORS[item.category] || "#94a3b8",
                    }}
                  ></div>
                  <span className="font-medium text-gray-700">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{item.applications}</p>
                  <p className="text-xs text-gray-500">
                    {totalApplications > 0
                      ? Math.round(
                          (item.applications / totalApplications) * 100,
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <p className="font-bold text-lg text-purple-600">
                {totalApplications}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: COLORS[item.category] + "20",
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: COLORS[item.category] }}
                >
                  {item.applications}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="font-bold text-gray-800">{item.category}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${
                    totalApplications > 0
                      ? (item.applications / totalApplications) * 100
                      : 0
                  }%`,
                  backgroundColor: COLORS[item.category] || "#94a3b8",
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {totalApplications > 0
                ? Math.round((item.applications / totalApplications) * 100)
                : 0}
              % of total
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
