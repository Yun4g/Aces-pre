 'use client';
 
import React, { useState, useEffect } from 'react';
import NavbarReferal from '../navbarReferal';
import { StatCards } from '@/components/(statsComponent)/statComponent';
import { ProcessingTimeChart } from '@/components/(statsComponent)/processingTimeChart';
import { DistrictStats } from '@/components/districtChart';
import { RecentReferrals } from '@/components/RecentReferal';
import DashboardHeader from '@/components/DashBoardHeader' 
import { useRouter } from 'next/navigation';



 interface MainDashBoardProps {
    isOpen: boolean;
    onClose: () => void;
}


function MainDashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  
   useEffect(() => {
  
  const token = sessionStorage.getItem('token');

    if (!token) {
      router.push('/login')
    }
  }, []);

    return (
        <main className=" min-h-screen flex  text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">

            <div className={`
                         fixed top-0 left-0 h-full w-[250px] bg-white z-50 shadow-md border-r
                          transform transition-transform duration-300 ease-in-out
                          md:translate-x-0
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                             `}
              >
                <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <section className="flex-1 ml-0 md:ml-[250px] p-0 overflow-y-auto w-full">

                <button
                    className="md:hidden mb-4  px-3 py-2 rounded-md shadow-sm  text-sm"
                    onClick={() => setSidebarOpen(true)}
                >
                    ☰ 
                </button>

                <div className="container bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300  ">
                    <header className=' mb-2 rounded-md overflow-hidden  z-[1000] bg-white '>
                        <DashboardHeader />
                    </header>
                    <div className="grid grid-cols-1  z-[999] gap-2 md:gap-6 p-3 bg-[#F1F1F1] px-2 py-3 xl:gap-8">
                        <StatCards />
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <div className='w-full md:basis-[55%] bg-white flex-1'>
                                <ProcessingTimeChart />
                            </div>
                            <div className='w-full md:basis-[45%] bg-white flex-1'>
                                <DistrictStats />
                            </div>
                        </div>
                     <div className='w-full bg-white flex-1'>
                         <RecentReferrals />
                     </div>
               
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainDashBoard;
