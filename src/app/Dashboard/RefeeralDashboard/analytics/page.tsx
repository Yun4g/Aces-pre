'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import Image from 'next/image';

const monthlyData = [
  { name: 'Jan', value: 35, total: 52 },
  { name: 'Feb', value: 38, total: 55 },
  { name: 'Mar', value: 40, total: 60 },
  { name: 'Apr', value: 37, total: 58 },
  { name: 'May', value: 42, total: 62 },
  { name: 'Jun', value: 40, total: 60 },
  { name: 'Jul', value: 38, total: 55 },
];

const enrollmentData = [
  { name: 'Jan', '2023': 250, '2024': 300 },
  { name: 'Feb', '2023': 270, '2024': 320 },
  { name: 'Mar', '2023': 290, '2024': 340 },
  { name: 'Apr', '2023': 310, '2024': 360 },
  { name: 'May', '2023': 330, '2024': 380 },
  { name: 'Jun', '2023': 350, '2024': 400 },
  { name: 'Jul', '2023': 370, '2024': 420 },
  { name: 'Aug', '2023': 390, '2024': 440 },
  { name: 'Sep', '2023': 410, '2024': 460 },
  { name: 'Oct', '2023': 430, '2024': 480 },
  { name: 'Nov', '2023': 450, '2024': 490 },
  { name: 'Dec', '2023': 470, '2024': 500 },
];

const pieData = [
  { name: '0-1 h', value: 25, color: '#1e3a8a' },
  { name: '1-8 h', value: 15, color: '#d1d5db' },
  { name: '8-24 h', value: 35, color: '#93c5fd' },
  { name: '24-48 h', value: 25, color: '#dbeafe' },
];

const districtData = [
  { name: 'District A', value: 45, color: '#1e3a8a' },
  { name: 'District B', value: 20, color: '#f59e0b' },
  { name: 'District C', value: 15, color: '#d1d5db' },
  { name: 'District D', value: 20, color: '#e5e7eb' },
];

const recentReferrals = [
  { id: 1, student: 'Sarah Johnson', email: 'sarah.johnson@email.com', type: 'Behavioral', status: 'Inprogress', assignedBy: 'Mr. Adelaide', date: '12-January-2025' },
  { id: 2, student: 'Sarah Johnson', email: 'sarah.johnson@email.com', type: 'Special Edu', status: 'Inprogress', assignedBy: 'Mr. Adelaide', date: '12-January-2025' },
  { id: 3, student: 'Sarah Johnson', email: 'sarah.johnson@email.com', type: 'Behavioral', status: 'Success', assignedBy: 'Mr. Adelaide', date: '12-January-2025' },
  { id: 4, student: 'Sarah Johnson', email: 'sarah.johnson@email.com', type: 'Behavioral', status: 'Success', assignedBy: 'Mr. Adelaide', date: '12-January-2025' },
  { id: 5, student: 'Sarah Johnson', email: 'sarah.johnson@email.com', type: 'Special Edu', status: 'Inprogress', assignedBy: 'Mr. Adelaide', date: '12-January-2025' },
  { id: 6, student: 'Sarah Johnson', email: 'sarah.johnson@email.com', type: 'Special Edu', status: 'Inprogress', assignedBy: 'Mr. Adelaide', date: '12-January-2025' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
}

const CustomLineTooltip: React.FC<CustomTooltipProps> = ({ active, payload = [], label }) => {
  if (active && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md border border-gray-200 rounded-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center mt-1">
            <div
              className={`w-3 h-3 rounded-full ${entry.name === '2024' ? 'bg-amber-500' : 'bg-blue-500'} mr-2`}
            ></div>
            <p>
              {entry.name}: {entry.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

  


export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('Month');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  return (
    <div className="w-full bg-gray-50 p-4 md:ml-[250px]">
      <nav className='fixed z-[1000]  top-0 left-0 h-full w-[15%]'>
      <div className={`
                         fixed top-0 left-0 h-full w-[250px] z-[1000] bg-white  shadow-md border-r
                          transform transition-transform duration-300 ease-in-out
                          md:translate-x-0
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                             `}
              >         
                     <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
     </div>

      </nav>

        <section className=' z-50 md:w-[83%]'>
          <header className=' rounded- mb-3 bg-white'>
          <DashboardHeader/>

          </header>

          <button className="md:hidden mb-4 bg-white px-3 py-2 rounded-md shadow-sm border text-sm"
                onClick={() => setSidebarOpen(true)}   >
                    ☰ Menu
                </button>

       
      <div className="flex   flex-wrap gap-2 mb-4">
        <button 
          className={`px-4 py-1.5 rounded-md text-sm ${timeRange === 'Month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setTimeRange('Month')}
        >
          Month
        </button>
        <button 
          className={`px-4 py-1.5 rounded-md text-sm ${timeRange === 'School year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setTimeRange('School year')}
        >
          School year
        </button>
        <button 
          className={`px-4 py-1.5 rounded-md text-sm ${timeRange === 'Custom Range' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setTimeRange('Custom Range')}
        >
          Custom Range
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Completion Rate */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">92%</h2>
            </div>
            <span className="text-sm text-gray-500">Completion Rates</span>
            <div className="flex items-center mt-2 text-xs">
              <span className="text-green-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                10.2%
              </span>
              <span className="text-gray-500 ml-1">vs. Last month</span>
            </div>
          </div>
        </div>

        {/* First Time Replies */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 relative">
          <div className="absolute -top-0 -left-0 h-full w-1 bg-blue-500"></div>
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold text-blue-600">248</h2>
            </div>
            <span className="text-sm text-gray-500">Average first time Replies</span>
            <div className="flex items-center mt-2 text-xs">
              <span className="text-green-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                10.2%
              </span>
              <span className="text-gray-500 ml-1">vs. Last month</span>
            </div>
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">7.2 days</h2>
            </div>
            <span className="text-sm text-gray-500">Average Processing time</span>
            <div className="flex items-center mt-2 text-xs">
              <span className="text-green-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                10.2%
              </span>
              <span className="text-gray-500 ml-1">vs. Last month</span>
            </div>
          </div>
        </div>

        {/* Total Schools */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold">18</h2>
            </div>
            <span className="text-sm text-gray-500">Total Schools</span>
            <div className="flex items-center mt-2 text-xs">
              <span className="text-green-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                10.2%
              </span>
              <span className="text-gray-500 ml-1">vs. Last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Average Referals created</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span>Dec 1-7</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            <span className="w-3 h-3 bg-blue-600 rounded-sm mr-2"></span>
            <span className="text-sm text-gray-600">Average referals created</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">4,568</h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="#dbeafe" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center mt-2 mb-4">
            <span className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></span>
            <span className="text-sm text-gray-600">Average referals Solved</span>
          </div>
          <h2 className="text-2xl font-bold">4,568</h2>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-4">Average Referals created</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                       <Pie
                            data={pieData}
                             cx="50%"
                              cy="50%"
                               labelLine={false}
                               outerRadius={80}
                               innerRadius={0}  
                              fill="#8884d8"
                             dataKey="value"
                                >
    {pieData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Pie>
  <Tooltip />
</PieChart>

            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs text-gray-600">{entry.name} Hours</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-xs text-green-700">High</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-amber-100 rounded-full">
              <span className="h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
              <span className="text-xs text-amber-700">Inprogress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Districts and Enrollment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Districts Distribution */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Districts Distribution</h3>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">750 × 519</div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={districtData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {districtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment Trends */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-2">Enrollment Trends</h3>
          <p className="text-sm text-gray-500 mb-4">Total Trends</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={enrollmentData}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomLineTooltip />} />
                <Line type="monotone" dataKey="2024" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="2023" stroke="#1d4ed8" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 mb-4">
        <h3 className="font-medium text-gray-700 mb-4">Recent Referals</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentReferrals.map((referral) => (
                <tr key={referral.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <Image width={32} height={32} className="h-8 w-8 rounded-full" src="/public/assest/landGirl.png" alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{referral.student}</div>
                        <div className="text-xs text-gray-500">{referral.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                      referral.type === 'Behavioral' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {referral.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`h-2 w-2 rounded-full mr-2 ${
                          referral.status === 'Success' ? 'bg-green-500' : 'bg-amber-500'
                        }`}
                      ></span>
                      <span className="text-sm">{referral.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{referral.assignedBy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{referral.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">View</button>
                      <button className="text-gray-600 hover:text-gray-800">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </section>
    </div>
  );
}