"use client";

import { useRouter } from "next/navigation";
import {
  Filter,
  Plus,
  Download,
  FileText,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import NavbarReferal from "../navbarReferal";
import DashboardHeader from "@/components/DashBoardHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";

const priorityColor: Record<string, string> = {
  Low: "text-red-500",
  Medium: "text-yellow-500",
  High: "text-green-500",
};

const priorityBgColor: Record<string, string> = {
  Low: "bg-red-300",
  Medium: "bg-yellow-300",
  High: "bg-green-300",
};

interface Referral {
  id: number;
  priority: "Low" | "Medium" | "High";
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
  const tableRef = useRef<HTMLTableElement>(null);

  const fetchReferrals = async (): Promise<Referral[]> => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn("No token found in sessionStorage. Please log in.");
      return [];
    }
    try {
      const response = await axios.get("/api/referrals/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching referrals:", error);
      return [];
    }
  };

  const { data: referralsData = [] } = useQuery<Referral[]>({
    queryKey: ["referrals"],
    queryFn: fetchReferrals,
    refetchInterval: 30000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = referralsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedReferrals = referralsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const fetchCsvFile = async (): Promise<string | null> => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn("No token found in sessionStorage. Please log in.");
      return null;
    }
    try {
      const response = await axios.get("/api/export-referrals-csv/", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const csvBlob = new Blob([response.data], { type: "text/csv" });
      return window.URL.createObjectURL(csvBlob);
    } catch (error) {
      console.error("Error fetching CSV:", error);
      return null;
    }
  };

  const handleDownloadCsv = async () => {
    const blobURL = await fetchCsvFile();
    if (blobURL) {
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = `referrals_${new Date().toISOString()}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => window.URL.revokeObjectURL(blobURL), 10000);
    } else {
      alert("Failed to download CSV file.");
    }
  };

  // PDF download
  const handleDownloadPdf = async () => {
    if (!tableRef.current) return;
    try {
      const doc = new jsPDF("p", "pt", "a4");
      const canvas = await html2canvas(tableRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save(`referrals_${new Date().toISOString()}.pdf`);
    } catch (error) {
      console.error("Failed to download PDF", error);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) router.push("/login");
  }, [router]);

  return (
    <main className="bg-white min-h-screen flex text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-[250px] bg-white z-50 shadow-md border-r transform transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <section className="flex-1 ml-0 md:ml-[250px] overflow-y-auto w-full">
        {/* Mobile Menu Btn */}
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

        <div className="container mx-auto dark:bg-gray-900 dark:text-white transition-colors duration-300">
          {/* Header */}
          <header className="rounded-md overflow-hidden z-[1000] bg-white dark:bg-gray-800 mb-2">
            <DashboardHeader />
          </header>

          {/* Top Bar */}
          <div className="flex flex-wrap bg-white dark:bg-gray-900 px-3 items-center justify-between border-2 p-2 mt-2 rounded-md gap-2">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-[200px]">
              {/* Search */}
              <div className="border flex gap-2 rounded px-3 py-1.5 text-sm w-full max-w-xs bg-white dark:bg-gray-700 dark:text-white">
                <span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                      stroke="#898A8C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.4998 17.4998L14.1665 14.1665"
                      stroke="#898A8C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search by name or ticket"
                  className="focus:outline-none bg-transparent"
                />
              </div>

              <button className="border rounded px-3 py-1.5 flex items-center gap-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Filter <ChevronDown size={14} />
              </button>

              <button className="border rounded px-3 py-1.5 flex items-center gap-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Sort <ChevronDown size={14} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <button
                onClick={handleDownloadCsv}
                className="border-2 border-[#005A9C] text-[#005A9C] px-3 py-2 text-sm rounded flex items-center gap-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                type="button"
              >
                <FileText size={14} /> Export CSV
              </button>

              <button
                onClick={handleDownloadPdf}
                className="border-2 border-[#005A9C] text-[#005A9C] px-3 py-2 text-sm rounded flex items-center gap-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                type="button"
              >
                <Download size={14} /> Export PDF
              </button>

              <Link
                href="/Dashboard/RefeeralDashboard/referals/referralForm"
                className="bg-[#005A9C] text-white px-4 py-2 text-sm rounded flex items-center gap-1 transition"
              >
                <Plus size={14} /> New Referral
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded border mt-4">
            <table
              ref={tableRef}
              className="min-w-full text-sm text-center dark:bg-gray-800"
            >
              <thead className="dark:bg-gray-900 border-b">
                <tr>
                  <th className="p-3">
                    <input type="checkbox" aria-label="Select all referrals" />
                  </th>
                  <th className="p-3">Refer ID</th>
                  <th className="p-3">Subjects</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Assignee</th>
                  <th className="p-3">Date Created</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReferrals.length > 0 ? (
                  paginatedReferrals.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() =>
                        router.push(`/Dashboard/RefeeralDashboard/referals/${r.id}`)
                      }
                      className="cursor-pointer hover:bg-gray-50 border-b dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-3">
                        <input type="checkbox" aria-label={`Select referral ${r.id}`} />
                      </td>
                      <td className="p-3 font-medium">{`#RC-${r.id}`}</td>
                      <td className="p-3">{r.subject || "N/A"}</td>
                      <td className="p-3 flex justify-center items-center">
                        <span
                          className={clsx(
                            "flex items-center gap-2 px-2 py-1 rounded-full",
                            priorityBgColor[r.priority],
                            priorityColor[r.priority]
                          )}
                        >
                          <span className="text-xs">●</span> {r.priority}
                        </span>
                      </td>
                      <td className="p-3">{r.referral_type || "N/A"}</td>
                      <td className="p-3 flex justify-center items-center gap-2">
                        <Image
                          src={r.avatar || `https://i.pravatar.cc/150?img=${r.id}`}
                          alt={r.assignee || "Assignee"}
                          width={24}
                          height={24}
                          className="rounded-full"
                          unoptimized
                        />
                        <span>{r.assignee || "Assignee name"}</span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {new Date(r.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-3 text-center">
                      No referrals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center mt-4 text-sm px-3">
              <button
                className="mr-3 disabled:text-gray-400"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={clsx(
                      "px-3 py-1 rounded",
                      page === currentPage
                        ? "bg-[#005A9C] text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className="ml-3 disabled:text-gray-400"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
