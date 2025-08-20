
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
  let notification = localStorage.getItem('notification');
  if (notification) {
    notification = JSON.parse(notification);
  }

 
  
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
              className="p-1 rounded-full hover:bg-gray-100  w-full focus:outline-none "
              onClick={() => dispatch(openNotification())}
            >
              <div className="relative h-10 w-7 flex justify-center items-center  ">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <p className='absolute top-0 left-3 text-red-600 text-sm font-bold'>{ notification?.length}</p>
              </div>
            </button>
          </div>


          <div className="">
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                src="data:image/jpeg;base64,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"
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
