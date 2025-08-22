'use client';

import React, { useState, useEffect } from 'react';
import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import Analytics from './analytics';
import { useRouter } from 'next/navigation';    
import Image from 'next/image';



export default function AnalyticsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

   
    useEffect(() => {
  if (typeof window !== "undefined") {
    const t = sessionStorage.getItem("token");
    setToken(t);
    if (!t) {
      router.push("/login");
    }
  }
}, [router]);


  return (
    <section className=" dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen flex">
      <div className={` fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 z-50 shadow-md border-r transform  ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 p-0 ml-0 md:ml-[250px] bg-white md:bg-[#F1F1F1]  dark:bg-gray-900 dark:text-white transition-colors duration-300  overflow-y-auto w-full">
                       <div
         className="md:hidden mb-4 px-3 py-3 rounded-md   shadow-sm text-sm flex items-center justify-between  gap-2 cursor-pointer"
         onClick={() => setSidebarOpen(true)}
         role="button"
         aria-label="Open sidebar menu"
         tabIndex={0}
         onKeyDown={(e) => {
           if (e.key === 'Enter' || e.key === ' ') setSidebarOpen(true);
         }}
       >
         <Image
           height={60}
           width={50}
           src="/assest/logo.png"
           alt="Logo"
         />
         <span style={{ fontSize: '1.8rem', lineHeight: 1, userSelect: 'none' }}>
           ☰
         </span>
       </div>

        <header className="mb-1 rounded-md overflow-hidden  z-[1000]  dark:bg-gray-900 dark:text-white transition-colors duration-300">
          <DashboardHeader />
        </header>
       <div className=' z-[999]'>
         <Analytics/>
       </div>
      </div>
    </section>
  );
}
