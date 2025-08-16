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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching referrals:", error);
      return [];
    }
  };

  const fetchCsvFile = async (): Promise<string | null> => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn("No token found in sessionStorage. Please log in.");
      return null;
    }
    try {
      const response = await axios.get("/api/export-referrals-csv/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", 
      });
      const csvBlob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(csvBlob);
      return url;
    } catch (error) {
      console.error("Error fetching CSV:", error);
      return null;
    }
  };

  const { data: referralsData } = useQuery<Referral[]>({
    queryKey: ["referrals"],
    queryFn: fetchReferrals,
  });

  const handleDownloadCsv = async () => {
    const blobURL = await fetchCsvFile();
    if (blobURL) {
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = `referrals_${new Date().toISOString()}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => {
        window.URL.revokeObjectURL(blobURL);
      }, 10000);
    } else {
      alert("Failed to download CSV file.");
    }
  };


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
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
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
     
        <button
          className="md:hidden mb-4 px-3 py-2 rounded-md shadow-sm text-sm"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar menu"
        >
          ☰
        </button>

        <div className="container dark:bg-gray-900 dark:text-white transition-colors duration-300 mx-auto ">
          {/* Header */}
          <header className="rounded-md overflow-hidden z-[1000] bg-white dark:bg-gray-800 mb-2">
            <DashboardHeader />
          </header>

        
          <div className="flex flex-wrap bg-white dark:bg-gray-900 px-3  items-center justify-between border-b pb-2  rounded-md gap-2">
         
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by name or ticket"
                className="border rounded px-3 py-1.5 text-sm focus:outline-none w-full max-w-xs bg-white dark:bg-gray-700 dark:text-white"
              />

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
                className="border-2 border-[#005A9C] text-[#005A9C] px-3 py-2 text-sm rounded flex items-center gap-1  hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                aria-label="Export CSV"
                type="button"
              >
                <FileText size={14} /> Export CSV
              </button>

              <button
                onClick={handleDownloadPdf}
                className="border-2 border-[#005A9C] text-[#005A9C] px-3 py-2 text-sm rounded flex items-center gap-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                aria-label="Export PDF"
                type="button"
              >
                <Download size={14} /> Export PDF
              </button>

              <Link
                href="/Dashboard/RefeeralDashboard/referals/referralForm"
                className="bg-[#005A9C] text-white px-4 py-2 text-sm rounded flex items-center gap-1 00 transition"
                aria-label="Create new referral"
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
              role="table"
              aria-label="Referrals table"
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
                {referralsData && referralsData.length > 0 ? (
                  referralsData.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => router.push(`/Dashboard/RefeeralDashboard/referals/${r.id}`)}
                      className="cursor-pointer hover:bg-gray-50 border-b dark:hover:bg-gray-700 transition-colors"
                      tabIndex={0}
                      aria-label={`Referral ${r.id}, ${r.referral_type || r.subject || "Not specified"}`}
                    >
                      <td className="p-3">
                        <input type="checkbox" aria-label={`Select referral ${r.id}`} />
                      </td>
                      <td className="p-3 font-medium text-gray-700 dark:text-gray-200">{`#RC-${r.id}`}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">{r.referral_type || r.subject || "N/A"}</td>
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
                      <td className="p-3 text-gray-600 dark:text-gray-300">{r.referral_type || "N/A"}</td>
                      <td className="p-3 flex justify-center items-center gap-2">
                        <Image
                          src={r.avatar || `https://i.pravatar.cc/150?img=${r.id}`}
                          alt={r.assignee || "Assignee"}
                          width={24}
                          height={24}
                          className="rounded-full"
                          unoptimized
                        />
                        <span className="text-gray-700 dark:text-gray-300">{r.assignee || "Assignee name"}</span>
                      </td>
                      <td className="p-3 text-gray-500 whitespace-nowrap dark:text-gray-400">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-3 text-center text-gray-500 dark:text-gray-400">
                      No referrals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 text-sm px-3 text-gray-600 dark:text-gray-400">
            <span className="mr-3">Previous</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#005A9C] text-white rounded">1</button>
              <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">2</button>
            </div>
            <span className="ml-3">Next</span>
          </div>
        </div>
      </section>
    </main>
  );
}
