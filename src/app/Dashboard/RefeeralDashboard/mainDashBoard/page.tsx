 'use client';
 
import React, { useState } from 'react';
import NavbarReferal from '../navbarReferal';
import { StatCards } from '@/components/statComponent';
import { ProcessingTimeChart } from '@/components/processingTimeChart';
import { DistrictStats } from '@/components/districtChart';
import { RecentReferrals } from '@/components/RecentReferal';
import DashboardHeader from '@/components/DashBoardHeader' 



 interface MainDashBoardProps {
    isOpen: boolean;
    onClose: () => void;
}


function MainDashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className="bg-[#F1F1F1] min-h-screen flex">

            <div className={`
                         fixed top-0 left-0 h-full w-[250px] bg-white z-50 shadow-md border-r
                          transform transition-transform duration-300 ease-in-out
                          md:translate-x-0
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                             `}
              >
                <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <section className="flex-1 ml-0 md:ml-[250px] p-4 overflow-y-auto w-full">

                <button
                    className="md:hidden mb-4 bg-white px-3 py-2 rounded-md shadow-sm border text-sm"
                    onClick={() => setSidebarOpen(true)}
                >
                    ☰ Menu
                </button>

                <div className="container bg-white p-3 mx-auto">
                    <header className=' mb-2 rounded-md overflow-hidden  z-[1000] bg-white '>
                        <DashboardHeader />
                    </header>
                    <div className="grid grid-cols-1  z-[999] gap-4 md:gap-6 xl:gap-8">
                        <StatCards />
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <div className='w-full md:basis-[55%] flex-1'>
                                <ProcessingTimeChart />
                            </div>
                            <div className='w-full md:basis-[45%] flex-1'>
                                <DistrictStats />
                            </div>
                        </div>

            <RecentReferrals />
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainDashBoard;
