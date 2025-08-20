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
  Cell,
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

const enrollmentData = [
  { name: "Jan", y2023: 20000, y2024: 30000 },
  { name: "Feb", y2023: 22000, y2024: 32000 },
  { name: "Mar", y2023: 25000, y2024: 38000 },
  { name: "Apr", y2023: 28000, y2024: 42000 },
  { name: "May", y2023: 30000, y2024: 45000 },
  { name: "Jun", y2023: 32000, y2024: 43000 },
  { name: "Jul", y2023: 33000, y2024: 47000 },
  { name: "Aug", y2023: 35000, y2024: 46000 },
  { name: "Sep", y2023: 36000, y2024: 48000 },
  { name: "Oct", y2023: 38000, y2024: 50000 },
  { name: "Nov", y2023: 40000, y2024: 52000 },
  { name: "Dec", y2023: 42000, y2024: 55000 },
];

const referrals = [
  {
    id: 1,
    student: "Sarah Johnson",
    email: "sarah.j@email.com",
    type: "Behavioural",
    status: "Inprogress",
    assignedBy: "Mr Adelaide",
    date: "12-January-2025",
  },
  {
    id: 2,
    student: "Sarah Johnson",
    email: "sarah.j@email.com",
    type: "Behavioural",
    status: "Inprogress",
    assignedBy: "Mr Adelaide",
    date: "12-January-2025",
  },
  {
    id: 3,
    student: "Sarah Johnson",
    email: "sarah.j@email.com",
    type: "Behavioural",
    status: "Success",
    assignedBy: "Mr Adelaide",
    date: "12-January-2025",
  },
  {
    id: 4,
    student: "Sarah Johnson",
    email: "sarah.j@email.com",
    type: "Special feat.",
    status: "Success",
    assignedBy: "Mr Adelaide",
    date: "12-January-2025",
  },
  {
    id: 5,
    student: "Sarah Johnson",
    email: "sarah.j@email.com",
    type: "Behavioural",
    status: "Inprogress",
    assignedBy: "Mr Adelaide",
    date: "12-January-2025",
  },
];



interface AnalyticsDashboard {
    completion_percent: number | null ,
    recent_completion_percent: number | null,
    average_processing_time: string | null,
    recent_average_processing_time: string | null,
    total_schools: number | null,
    average_replies_per_referral: number | null
}

export default function Analytics() {
  const [token, setToken] = React.useState('')
    
  const fetchAnalytics = async () : Promise<AnalyticsDashboard | null> => {
    try {
      const res = await axios.get('/api/referral_dashboard/', {
        headers: { Authorization: `Bearer ${token}` }
      }) 
       
      return res.data
    } catch (error) {
        console.log(error)
        return null
    }
  }

    React.useEffect(() => {
      const t = sessionStorage.getItem('token');
       setToken(t || '' )
      
    },[])

function formatProcessingTime(timeString: string | null | undefined): string {
  if (!timeString) return "—";

  const parts = timeString.split(':');
  if (parts.length < 3) return timeString; 

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseFloat(parts[2]);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalDays = totalSeconds / 86400;
  return `${ Math.round(totalDays)} days`;
}
  const { data } = useQuery({
    queryKey: ['Analytics'],
    queryFn: fetchAnalytics,
    refetchInterval: 4000,
      enabled: !!token, 
  })
  console.log('analytics', data)
const metrics = [
  { label: "Completion Rates", value: data?.completion_percent ?? "—",  change: "10.2% vs Last month" },
  { label: "Average first time Replies", value: data?.average_replies_per_referral ?? "—", change: "10.2% vs Last month" },
  { label: "Average Processing time", value: formatProcessingTime(data?.average_processing_time)  , change: "10.2% vs Last month" },
  { label: "Total Schools", value: data?.total_schools,  change: "10.2% vs Last month" },
];

  return (
    <div className="w-full  space-y-1">

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

                <ResponsiveContainer width="100%" className=" " height={200}>
                  <BarChart className="w-full flex justify-center item-center" data={barData}>
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
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={enrollmentData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="y2023"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="y2024"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <RecentReferrals/>
    </div >

  );
}
