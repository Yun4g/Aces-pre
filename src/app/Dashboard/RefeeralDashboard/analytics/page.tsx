'use client';

import React, { useState } from 'react';
import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import Analytics from './analytics';



export default function AnalyticsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="bg-[#F1F1F1] dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen flex">
      <div className={`
        fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 z-50 shadow-md border-r
        transform  ease-in-out
        md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 ml-0 md:ml-[250px] bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 p-4 overflow-y-auto w-full">
        <button className="md:hidden mb-4  px-3 py-2 rounded-md shadow-sm  text-sm" onClick={() => setSidebarOpen(true)}>
          ☰ Menu
        </button>

        <header className="mb-2 rounded-md overflow-hidden  z-[1000] bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
          <DashboardHeader />
        </header>

       <div className=' z-[999]'>
         <Analytics/>
       </div>
      </div>
    </section>
  );
}
