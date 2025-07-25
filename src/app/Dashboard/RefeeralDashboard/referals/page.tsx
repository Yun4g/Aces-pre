// app/referrals/page.tsx
'use client';

import { useRouter } from 'next/navigation';

import { Filter, Plus, Download, FileText, ChevronDown } from 'lucide-react';

import Image from 'next/image';
import clsx from 'clsx';
import { useState } from 'react';
import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import { useEffect } from 'react';

const referrals = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  referId: '#RC-192',
  subject:
    i === 0 ? 'Academic Intervention Referrra' : 'My subject for this Projects',
  priority: (['Low', 'Medium', 'High'] as const)[i % 3],
  type: ['Academics', 'Special Features', 'Behavioural', 'Socials'][i % 4],
  assignee: [
    'Guy Hawkins',
    'Courtney Henry',
    
    
  ][i % 17],
  avatar: `/avatars/${(i % 10) + 1}.jpg`,
  date: '19/11/2025,11:34pm',
}));

const priorityColor: Record<string, string> = {
  Low: 'text-red-500',
  Medium: 'text-yellow-500',
  High: 'text-green-500',
};

export default function ReferralsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);



  
     useEffect(() => {
    
    const token = sessionStorage.getItem('token');
      if (!token) {
        router.push('/login')
      }
    }, [])

  return (
    <main className="bg-[#F1F1F1] min-h-screen flex text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div
        className={`
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
          className="md:hidden mb-4 px-3 py-2 rounded-md shadow-sm text-sm"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        <div className="container bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300  mx-auto">
          <header className="mb-2 rounded-md overflow-hidden z-[1000] bg-white">
            <DashboardHeader />
          </header>

          <div className="px-3 ">
                <div className="flex flex-wrap items-center justify-between border-b pb-4">
      
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">

               <input
                  type="text"             
                  placeholder="Search by name or ticket"
                  className="border rounded px-3 py-1.5 text-sm focus:outline-none"
                 />

             <button className="border rounded px-3 py-1.5 flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-50">
              Filter <ChevronDown size={14} />
            </button>

        <button className="border rounded px-3 py-1.5 flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-50">
          Sort <ChevronDown size={14} />
        </button>
      </div>

      
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <button className="border px-3 py-1.5 text-sm rounded flex items-center gap-1 hover:bg-gray-50">
          <FileText size={14} /> Export CSV
        </button>
        <button className="border px-3 py-1.5 text-sm rounded flex items-center gap-1 hover:bg-gray-50">
          <Download size={14} /> Export PDF
        </button>
        <button className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded flex items-center gap-1 hover:bg-blue-700">
          <Plus size={14} /> New Referral
        </button>
      </div>
    </div>

            <div className="overflow-auto rounded border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b text-center">
                  <tr>
                    <th className="p-3"><input type="checkbox" /></th>
                    <th className="p-3">Refer ID</th>
                    <th className="p-3">Subjects</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Assignee</th>
                    <th className="p-3">Date Created</th>
                  </tr>
                </thead>
                <tbody className='text-center '>
                  {referrals.map((r, i) => (
                    <tr
                      key={i}
                      onClick={() => router.push(`/referrals/${r.id}`)}
                      className="cursor-pointer  hover:bg-gray-50 border-b"
                    > 
                      <td className="p-3"><input type="checkbox"  /></td>
                      <td className="p-3 font-medium text-gray-700 ">{r.referId}</td>
                      <td className="p-3 text-gray-600">{r.subject}</td>
                      <td className="p-3  flex justify-center items-center">
                        <span className={clsx('flex items-center gap-2 ', priorityColor[r.priority])}>
                          <span className="text-xs">●</span> {r.priority}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{r.type}</td>
                      <td className="p-3 flex justify-center items-center gap-2">
                        <Image
                          src={`https://i.pravatar.cc/150?img=${i}`}
                          alt={r.assignee}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-gray-700 ">{r.assignee}</span>
                      </td>
                      <td className="p-3 text-gray-500 whitespace-nowrap">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>Previous</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-2 py-1 bg-gray-200 rounded">2</button>
              </div>
              <span>Next</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
