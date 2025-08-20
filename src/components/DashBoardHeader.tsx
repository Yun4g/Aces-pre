
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '@/Redux/notificationSlice';
import { RootState } from '@/Redux';
import NotificationOverlay from './overlayNotification';
import Link from 'next/link';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const notificationOpen = useSelector((state: RootState) => state.notification.open);
  console.log(pathname, 'pathname in header');
 
  
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const userId = 15;
  const fetchUser = async () => {
    try {    
      const response = await axios.get(`/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response?.data;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  };

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    refetchInterval: 4000,
    enabled: !! token
  });

  console.log(data, 'data in header');
  
useEffect(() => {
  setToken(sessionStorage.getItem('token'));
  setUsername(sessionStorage.getItem('username'));
}, []);


  const getPageTitle = () => {
    const route = pathname;
    if (route.includes('/RefeeralDashboard/mainDashBoard')) return 'Dashboard Overview';
    if (route.includes('/RefeeralDashboard/referals')) return ' Referrals';
    if (route.includes('/RefeeralDashboard/analytics')) return 'Analytics';
    if (route.includes('/RefeeralDashboard/settings')) return ' Settings';
  };

  return (
    <header className="w-full bg-white p-3 dark:bg-gray-900 dark:text-white transition-colors  duration-300  shadow-sm   z-[1000]">
      <div className="flex items-center justify-between w-full">

        <h1 className="text-lg font-medium dark:text-white text-gray-800 flex-1 md:flex-none">
          {getPageTitle()}
        </h1>

    
        <div className="flex items-center gap-2 md:gap-4 mb-2">
          <div className="hidden sm:block relative">
            <input
              type="search"
              placeholder="Search..."
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-full py-1.5 pl-8 pr-3 w-40 md:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="w-4 h-4 absolute left-2.5 top-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>


          <div className="relative  ">
            <button
              className="p-1 rounded-full hover:bg-gray-100  w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => dispatch(openNotification())}
            >
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span> */}
              </div>
            </button>
          </div>


          <div className="">
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                src={data?.avater || null }
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full w-10 h-10 object-cover border border-gray-200"
              />
              <span className="hidden md:flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700">{username || null}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2  z-[1000] w-48 bg-white rounded-md shadow-lg py-1  border border-gray-200">
                <Link href="/Dashboard/RefeeralDashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                <Link href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 sm:hidden">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-full py-1.5 pl-8 pr-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="w-4 h-4 absolute left-2.5 top-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      {notificationOpen && <NotificationOverlay />}
    </header>
  );
};

export default DashboardHeader;
