'use client';

import React, { useState } from 'react';
import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import Analytics from './analytics';



export default function AnalyticsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="bg-[#F1F1F1] min-h-screen flex">
      <div className={`
        fixed top-0 left-0 h-full w-[250px] bg-white z-50 shadow-md border-r
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 ml-0 md:ml-[250px] bg-white p-4 overflow-y-auto w-full">
        <button className="md:hidden mb-4 bg-white px-3 py-2 rounded-md shadow-sm border text-sm" onClick={() => setSidebarOpen(true)}>
          ☰ Menu
        </button>

        <header className="mb-2 rounded-md overflow-hidden  z-[1000] bg-white">
          <DashboardHeader />
        </header>

       <div className=' z-[999]'>
         <Analytics/>
       </div>
      </div>
    </section>
  );
}
