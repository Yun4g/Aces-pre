'use client';

import { useRouter } from 'next/navigation';
import { Filter, Plus, Download, FileText, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { useState } from 'react';
import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';




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

const priorityBgColor: Record<string, string> = {
  Low: ' bg-red-300',
  Medium: 'bg-yellow-300',
  High: 'bg-green-300',
};

interface Referral {
  id: number;
  priority: 'Low' | 'Medium' | 'High';
  referral_info?: string | null;
  referral_type?: string | null;
  district?: string | null;
  status?: string | null;
  additional_notes?: string | null;
  reason?: string | null;
  special_education_label?: string | null;
  created_at: string;
  updated_at?: string;
  draft?: boolean;
  iep_document?: string | null;
  consent_form?: string | null;
  cognitive_assesments?: string | null;
  avatar?: string | null;
  subject?: number | string;
  ref_manager?: number;
  pro_staff?: number;
  created_by?: number;
  assignee?: string;  
}


export default function ReferralsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
 



  const fetchReferrals = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.warn('No token found in sessionStorage. Please log in.');
      return [];
    }

    try {
      const response = await axios.get('/api/referrals/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching referrals:', error);
      return [];
    }
  };


  const { data } = useQuery<Referral[]>({
    queryKey: ['referrals'],
    queryFn: fetchReferrals,
  })

  console.log(data)

  useEffect(() => {

    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login')
    }
  }, [])

  return (
    <main className="bg-white min-h-screen flex text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
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

      <section className="flex-1 ml-0 md:ml-[250px] overflow-y-auto w-full">
        <button
          className="md:hidden mb-4 px-3 py-2 rounded-md shadow-sm text-sm"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="container  dark:bg-gray-900 dark:text-white transition-colors duration-300  mx-auto">
          <header className="rounded-md overflow-hidden z-[1000] bg-white">
            <DashboardHeader />
          </header>

          <div className=" ">
            <div className="flex flex-wrap bg-white dark:bg-gray-900 py-4 border-2 px-3  items-center justify-between border-b pb-4">

              <div className="flex flex-wrap items-center  gap-2 text-sm text-gray-700">

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
                <thead className=" dark:bg-gray-900 border-b text-center">
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
                  {data && data.length > 0 ? data.map( (r, i) => (
                    <tr key={r.id} onClick={() => router.push(`/Dashboard/RefeeralDashboard/referals/${r.id}`)} className="cursor-pointer hover:bg-gray-50 border-b">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 font-medium text-gray-700 ">{` #RC-${r.id}`}</td>
                      <td className="p-3 text-gray-600">{r.referral_type || r.subject || 'N/A'}</td>
                      <td className="p-3 flex justify-center items-center">
                        <span className={clsx('flex items-center gap-2 px-2 py-1 rounded-full ', priorityBgColor[r.priority] , priorityColor[r.priority])}>
                          <span className="text-xs">●</span> {r.priority}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{r.referral_type || 'N/A'}</td>
                      <td className="p-3 flex justify-center items-center gap-2">
                        <Image
                          src={ r.avatar  ||   `https://i.pravatar.cc/150?img`}
                          alt={r.assignee || 'Assignee'}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-gray-700">{r.assignee || 'Assignee name'}</span>
                      </td>
                      <td className="p-3 text-gray-500 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={7} className="p-3 text-center">No referrals found.</td></tr>
                  )}
                </tbody>

              </table>
            </div>

            <div className="flex  justify-end  items-center mt-4 text-sm px-3 text-gray-600">
              <span>Previous</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-[#005A9C] ms-4 text-white rounded">1</button>
                <button className="px-3 py-1 bg-gray-200 ms-2 me-4 rounded">2</button>
              </div>
              <span>Next</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
