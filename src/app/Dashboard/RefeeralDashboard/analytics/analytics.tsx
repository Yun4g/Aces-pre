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

const metrics = [
  { label: "Completion Rates", value: "92%", change: "10.2% vs Last month" },
  { label: "Average first time Replies", value: "248", change: "10.2% vs Last month" },
  { label: "Average Processing time", value: "7.2 days", change: "10.2% vs Last month" },
  { label: "Total Schools", value: "18", change: "10.2% vs Last month" },
];

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

export default function Analytics() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">

    {/* Buttons */}
    <div className="flex flex-wrap gap-3 mb-4">
      <Button className="bg-blue-600 text-white hover:bg-blue-700 min-w-[100px] flex-1 sm:flex-none text-center">
        Month
      </Button>
      <Button
        variant="outline"
        className="bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 min-w-[120px] flex-1 sm:flex-none text-center"
      >
        School year
      </Button>
      <Button
        variant="outline"
        className="bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 min-w-[130px] flex-1 sm:flex-none text-center"
      >
        Custom Range
      </Button>
    </div>
  
    {/* Metrics Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <Card key={i} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700">{metric.value}</div>
            <div className="text-sm sm:text-base text-gray-600">{metric.label}</div>
            <div className="text-xs sm:text-sm text-green-600">↑ {metric.change}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  
    {/* Charts Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
      {/* Bar Chart Card */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-3">
            <div>
              <h2 className="text-sm sm:text-base text-gray-600">Average Referrals created</h2>
              <div className="text-2xl font-bold text-blue-700">4,568</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Average referrals Solved</div>
              <div className="text-lg font-semibold text-blue-700">4,568</div>
            </div>
            <select className="border bg-white dark:bg-gray-800 text-sm p-1 rounded max-w-[150px]">
              <option>Dec 1-7</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1e40af" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  
      {/* Pie Chart Card */}
      <Card className="border-none shadow-sm w-full">
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
  
    {/* Another Charts Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
      {/* Districts Distribution Pie */}
      <Card className="border-none shadow-sm">
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
  
      {/* Enrollment Trends Line Chart */}
      <Card className="border-none shadow-sm">
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
  
    {/* Recent Referrals Table */}
    <Card className="border-none shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-sm sm:text-base text-gray-600 mb-4">Recent Referrals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 px-2">Students</th>
                <th className="pb-2 px-2">Type</th>
                <th className="pb-2 px-2">Status</th>
                <th className="pb-2 px-2">Assigned By</th>
                <th className="pb-2 px-2">Date</th>
                <th className="pb-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="py-3 px-2 max-w-[150px] whitespace-normal">
                    <div>
                      <div className="font-medium">{r.student}</div>
                      <div className="text-xs text-gray-500 truncate">{r.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs whitespace-nowrap">
                      {r.type}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                        r.status === "Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">{r.assignedBy}</td>
                  <td className="py-3 px-2">{r.date}</td>
                  <td className="py-3 px-2 whitespace-nowrap">
                    <a href="#" className="text-blue-600 mr-2 hover:underline">View</a>
                    <a href="#" className="text-gray-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  
  </div>
  
  );
}
