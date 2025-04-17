'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  Search,
  ArrowUpDown,
  FileText,
  FileCode
} from 'lucide-react';

import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';

interface Referral {
  id: string;
  subject: string;
  status: 'Success' | 'Inprogress';
  type: string;
  assignee: string;
  dateCreated: string;
}

// Dummy data for now
const referralsData: Referral[] = [
  {
    id: '#RC-192',
    subject: 'Academic Intervention Referral',
    status: 'Inprogress',
    type: 'Academics',
    assignee: 'Guy Hawkins',
    dateCreated: '19/11/2023;11:34pm'
  },
  {
    id: '#RC-193',
    subject: 'My subject for this Project',
    status: 'Success',
    type: 'Special Features',
    assignee: 'Courtney Henry',
    dateCreated: '19/11/2023;11:34pm'
  },
  // ... continue with other rows, update ID to be unique
];

export default function ReferralTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(referralsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = referralsData.slice(startIndex, startIndex + itemsPerPage);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(referralsData.map((referral) => referral.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full flex bg-[#F1F1F1] min-h-screen">
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

      <div className="flex-1 flex-wrap p-4 ml-0 md:ml-[250px]">
        <header className="rounded-md overflow-hidden bg-white mb-2">
          <DashboardHeader />
        </header>

        {/* Table Controls */}
        <div className="flex flex-col lg:flex-row gap-3 mb-4 bg-white items-start lg:items-center justify-between">
          <button
            className="md:hidden bg-white px-3 py-2 rounded-md shadow-sm border text-sm"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Menu
          </button>
          <div className="relative w-full p-2 lg:w-64">
            <input
              type="text"
              placeholder="Search by name or ticket"
              className="w-full border border-gray-300 rounded px-8 py-2 text-sm"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button className="flex items-center border border-gray-300 rounded px-3 py-1.5 text-sm">
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="flex items-center border border-gray-300 rounded px-3 py-1.5 text-sm">
              Sort <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="flex items-center border border-blue-500 text-blue-500 rounded px-3 py-1.5 text-sm">
              <FileCode className="mr-2 h-4 w-4" /> Export CSV
            </button>
            <button className="flex items-center border border-blue-500 text-blue-500 rounded px-3 py-1.5 text-sm">
              <FileText className="mr-2 h-4 w-4" /> Export PDF
            </button>
            <button className="bg-blue-500 text-white rounded px-3 py-1.5 text-sm">
              New Referral
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full bg-white overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-white text-left text-sm font-medium text-gray-500">
                <th className="sticky left-0 bg-white px-3 py-3 border-b">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="h-4 w-4"
                  />
                </th>
                <th className="px-3 py-3 border-b">
                  <div className="flex items-center">
                    Refer ID <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-3 py-3 border-b">Subject</th>
                <th className="px-3 py-3 border-b">
                  <div className="flex items-center">
                    Status <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="px-3 py-3 border-b">Type</th>
                <th className="px-3 py-3 border-b">Assignee</th>
                <th className="px-3 py-3 border-b">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((referral, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="sticky left-0 bg-white px-3 py-2 border-b">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(referral.id)}
                      onChange={() => toggleSelectRow(referral.id)}
                      className="h-4 w-4"
                    />
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500 border-b">{referral.id}</td>
                  <td className="px-3 py-2 text-sm border-b">{referral.subject}</td>
                  <td className="border-b">
                    <div
                      className={`p-1 rounded-3xl flex justify-center gap-3 items-center ${
                        referral.status === 'Success' ? 'bg-green-100' : 'bg-amber-100'
                      }`}
                    >
                      <Image
                        src={
                          referral.status === 'Success'
                            ? '/assest/vector.png'
                            : '/assest/clock.png'
                        }
                        alt=""
                        width={16}
                        height={16}
                      />
                      <span className="text-sm">{referral.status}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 flex items-center text-sm gap-2 border-b">
                    <Image
                      src={
                        referral.type === 'Academics'
                          ? '/assest/school-outline.png'
                          : '/assest/ribbon-outline.png'
                      }
                      alt=""
                      width={12}
                      height={12}
                    />
                    {referral.type}
                  </td>
                  <td className="px-3 py-2 border-b">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2 text-xs">
                        {referral.assignee[0]}
                      </div>
                      <span className="text-sm">{referral.assignee}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-500 border-b">{referral.dateCreated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, referralsData.length)} of{' '}
            {referralsData.length} entries
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded text-gray-500 disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'text-gray-500 border'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded text-gray-500 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
