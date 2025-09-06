'use client';
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RecentReferrals } from "@/components/RecentReferal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface AnalyticsDashboard {
  completion_percent: number | null;
  recent_completion_percent: number | null;
  average_processing_time: string | null;
  recent_average_processing_time: string | null;
  total_schools: number | null;
  average_replies_per_referral: number | null;
}

export default function Analytics() {
  const [token, setToken] = React.useState("");

  const fetchAnalytics = async (): Promise<AnalyticsDashboard | null> => {
    try {
      const res = await axios.get("https://api.aces-tdx.com/api/referral_dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const t = sessionStorage.getItem("token");
      setToken(t || "");
    }
  }, []);

  function formatProcessingTime(timeString: string | null | undefined): number {
    if (!timeString) return 0;
    const parts = timeString.split(":");
    if (parts.length < 3) return 0;
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2]);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const minutesTotal = Math.floor(totalSeconds / 60);
    return minutesTotal;
  }

  const { data } = useQuery({
    queryKey: ["Analytics"],
    queryFn: fetchAnalytics,
    refetchInterval: 4000,
    enabled: !!token,
  });

  const metrics = [
    { label: "Completion Rate", value: data?.completion_percent ?? 0 },
    { label: "Recent Completion Rate", value: data?.recent_completion_percent ?? 0 },
    { label: "Avg Replies per Referral", value: data?.average_replies_per_referral ?? 0 },
    { label: "Total Schools", value: data?.total_schools ?? 0 },
    { label: "Avg Processing Time (mins)", value: formatProcessingTime(data?.average_processing_time) },
  ];

  const colors = ["#1e40af", "#3b82f6", "#f59e0b", "#10b981", "#ef4444"];

  return (
    <div className="w-full space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <Button className="bg-blue-700 text-white hover:bg-blue-700 min-w-[100px] flex-1 sm:flex-none text-center">
          Month
        </Button>
        <Button
          variant="outline"
          className="bg-white dark:bg-gray-900 border border-blue-500 text-blue-500 dark:text-white transition-colors duration-300 min-w-[120px] flex-1 sm:flex-none text-center"
        >
          School year
        </Button>
        <Button
          variant="outline"
          className="bg-white dark:bg-gray-900 border border-blue-500 text-blue-500 dark:text-white transition-colors duration-300 min-w-[130px] flex-1 sm:flex-none text-center"
        >
          Custom Range
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 px-3 gap-4">
        {metrics.map((metric, i) => (
          <Card key={i} className="border-none bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-700">{metric.value}</div>
              <div className="text-sm sm:text-base text-gray-600">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-3">
        {/* Bar Chart */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold mb-4">Analytics Overview (Bar)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics}>
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {metrics.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart with better spacing */}
        <Card className="bg-white dark:bg-gray-800 shadow-sm flex flex-col items-center">
          <CardContent className="p-4 w-full">
            <h2 className="text-sm font-semibold mb-4 text-center">Analytics Overview (Pie)</h2>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={metrics}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {metrics.map((_, i) => (
                      <Cell key={i} fill={colors[i % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend moved below with spacing */}
              <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                {metrics.map((metric, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    ></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {metric.label}: <span className="font-semibold">{metric.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <RecentReferrals />
    </div>
  );
}
