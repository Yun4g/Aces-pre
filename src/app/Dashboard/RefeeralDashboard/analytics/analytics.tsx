'use client';
import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  TooltipProps
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AnalyticsDashboard from './page';
import { RecentReferrals } from "@/components/RecentReferal";




const barData = [
  { name: "Jan", value: 35 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 50 },
  { name: "May", value: 45 },
  { name: "Jun", value: 42 },
  { name: "Jul", value: 48 },
];

const pieData = [
  { name: "0-1 Hours", value: 30 },
  { name: "1-81 Hours", value: 40 },
  { name: "81+ Hours", value: 30 },
];

const districtData = [
  { name: "District A", value: 25 },
  { name: "District A", value: 25 },
  { name: "District A", value: 25 },
  { name: "District A", value: 25 },
];





interface AnalyticsDashboard {
  completion_percent: number | null,
  recent_completion_percent: number | null,
  average_processing_time: string | null,
  recent_average_processing_time: string | null,
  total_schools: number | null,
  average_replies_per_referral: number | null
}

const chartData = [
  { month: 'Jan', volume: 15, average: 20 },
  { month: 'Feb', volume: 22, average: 25 },
  { month: 'Mar', volume: 25, average: 35 },
  { month: 'Apr', volume: 35, average: 25 },
  { month: 'May', volume: 40, average: 35 },
  { month: 'Jun', volume: 45, average: 40 },
  { month: 'Jul', volume: 40, average: 45 },
  { month: 'Aug', volume: 40, average: 45 },
  { month: 'Sep', volume: 40, average: 50 },
  { month: 'Oct', volume: 35, average: 45 },
  { month: 'Nov', volume: 50, average: 45 },
  { month: 'Dec', volume: 45, average: 40 },
];

const formatYAxisTick = (value: number) => `${value}`;

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:text-black p-4 shadow-lg rounded-md border border-gray-200">
        <p className="font-bold text-center mb-2">{label}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Average Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-700"></div>
            <span>Sales Volume</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [token, setToken] = React.useState('')

  const fetchAnalytics = async (): Promise<AnalyticsDashboard | null> => {
    try {
      const res = await axios.get('https://api.aces-tdx.com/api/referral_dashboard/', {
        headers: { Authorization: `Bearer ${token}` }
      })

      return res.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const t = sessionStorage.getItem("token");
      setToken(t || "");
    }
  }, []);


  function formatProcessingTime(timeString: string | null | undefined): string {
    if (!timeString) return "—";

    const parts = timeString.split(':');
    if (parts.length < 3) return timeString;

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2]);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalDays = totalSeconds / 86400;
    return `${Math.round(totalDays)} days`;
  }
  const { data } = useQuery({
    queryKey: ['Analytics'],
    queryFn: fetchAnalytics,
    refetchInterval: 4000,
    enabled: !!token,
  })
  console.log('analytics', data)
  const metrics = [
    { label: "Completion Rates", value: data?.completion_percent ?? "—", change: "10.2% vs Last month" },
    { label: "Average first time Replies", value: data?.average_replies_per_referral ?? "—", change: "10.2% vs Last month" },
    { label: "Average Processing time", value: formatProcessingTime(data?.average_processing_time), change: "10.2% vs Last month" },
    { label: "Total Schools", value: data?.total_schools, change: "10.2% vs Last month" },
  ];

  return (
    <div className="w-full  space-y-1">
      {/* Buttons */}
      <div className="flex flex-wrap gap-3 p-3 bg-white dark:bg-gray-800">
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


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-3  gap-2">
        {metrics.map((metric, i) => (
          <Card key={i} className="border-none bg-white dark:bg-gray-800 px-[40px] py-[10px] shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-700">{metric.value}</div>
              <div className="text-sm sm:text-base text-gray-600">{metric.label}</div>
              <div className="text-xs sm:text-sm text-green-600">↑ {metric.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>


      <div className=" flex flex-col md:flex-row px-3 gap-2 m-0">
        <Card className="border-none md:w-[57%]  bg-white dark:bg-gray-800">
          <CardContent className="p-4 w-full">
            <h2 className="text-sm sm:text-base mb-3 text-gray-600">Average Referrals created</h2>

            <div className="flex flex-col md:flex-row justify-between items-center  w-full">
              <div className="flex flex-col justify-between items-start w-full md:w-[30%] sm:items-center mb-2 gap-3">
                <div className=" font-semibold ">
                  <p className="text-[#989898] text-sm"> <span className="inline-block h-3 w-3 bg-[#005A9C]"></span>Average referrals Solved</p>
                  <h1 className="text-2xl"> 4,568</h1>
                </div>
                <div className=" font-semibold ">
                  <p className="text-[#989898] text-sm"> <span className="inline-block h-3 w-3 bg-[#005A9C]"></span>Average referrals Solved</p>
                  <h1 className="text-2xl"> 4,568</h1>

                </div>
              </div>

              <div className="border-l w-full md:w-[70%] ">
                <div className="flex justify-end dark:bg-gray-700">
                  <select className="border bg-white mb-6  dark:bg-gray-800 text-sm p-1 rounded max-w-[150px]">
                    <option>Dec 1-7</option>
                  </select>
                </div>

                <ResponsiveContainer width="100%" className="" height={200}>
                  <BarChart className="w-full " data={barData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1e40af" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </CardContent>

        </Card>

        {/* Pie Chart Card */}
        <Card className="border-none shadow-sm md:w-[43%] bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <h2 className="text-sm sm:text-base text-gray-600 mb-2">
              Average Referrals created
            </h2>

            <div className="w-full h-[200px] sm:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: "0.75rem" }}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#3b82f6", "#e2e8f0", "#1e40af"][index % 3]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-4 text-xs sm:text-sm mt-2 flex-wrap">
              <span className="text-green-600 flex items-center gap-1">● High</span>
              <span className="text-yellow-500 flex items-center gap-1">● Inprogress</span>
            </div>
          </CardContent>
        </Card>


      </div>


      <div className="flex flex-col md:flex-row w-full gap-3 px-3">


        <Card className="border-none shadow-sm md:w-[40%] bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <h2 className="text-sm sm:text-base text-gray-600 mb-2">Districts Distribution</h2>
            <div className="relative w-full" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={districtData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {districtData.map((_, index) => (
                      <Cell
                        key={`cell-district-${index}`}
                        fill={["#1e40af", "#f59e0b", "#94a3b8", "#e2e8f0"][index % 4]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="text-sm font-medium select-none">Districts A</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none md:w-[60%] bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div>
              <h2 className="text-sm sm:text-base text-gray-600 mb-1">Enrollment Trends</h2>
              <div className="text-xs sm:text-sm mb-2">Total Trends</div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatYAxisTick}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="volume"
                  name="Sales Volume"
                  stroke="#0D5A8A"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="Average Price"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <RecentReferrals />
    </div >

  );
}
