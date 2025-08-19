'use client';
import { useState } from 'react';
import ConversationTab from './ReferralTabs/conversation';
import ActivityLogs from './ReferralTabs/ActiveLogs';
import NavbarReferal from './../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import ReferralForm from './referralForm/page';
import { MessageSquareText, FileText, Layers } from 'lucide-react';
import Tasks from './ReferralTabs/RefTask';
import Link from 'next/link';

type Tab = 'Conversation' | 'task' | 'ActivityLogs';

export default function ReferralClient({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('Conversation');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'Conversation', label: 'Conversation', icon: <MessageSquareText size={18} /> } ,
    { id: 'task', label: 'Task', icon: <FileText size={18} /> },
    { id: 'ActivityLogs', label: 'Activity Logs', icon: <Layers size={18} /> },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'Conversation': return <ConversationTab />;
      case 'task': return <Tasks />;
      case 'ActivityLogs': return <ActivityLogs />;
      default: return null;
    }
  };

  return (
    <main className="bg-[#F1F1F1] min-h-screen flex flex-col text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-white z-50 shadow-md border-r transform transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavbarReferal isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <section className="flex-1 md:ml-[250px]  p-3  md:w-[83%]">
        <button
          className="md:hidden mb-4 px-3 py-2 rounded-md shadow-sm text-sm dark:bg-gray-900 dark:text-white transition-colors duration-300"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        <div className="flex flex-col gap-10 md:gap-0">
          <header className="rounded-md overflow-hidden bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <DashboardHeader />
          </header>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 bg-white py-3 md:py-0 dark:bg-gray-900 dark:text-white justify-center relative items-center mb-1 md:p-3 w-full">
            <div className="flex flex-wrap w-full px-2 md:px-80 md:justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`px-4 py-2 my-5 rounded-md font-medium flex items-center gap-1 transition ${activeTab === tab.id ? 'text-[#005A9C]' : 'text-gray-900 dark:text-white'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="md:absolute right-4">
              <Link
                href="/Dashboard/RefeeralDashboard/referals/referralForm"
                className="bg-[#005A9C] text-white px-6 py-4 text-sm rounded flex items-center gap-1 transition"
              >
                New Referral
              </Link>
            </div>
          </div>

          
          <div className="md:p-4 rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
            {renderTab()}
          </div>
        </div>
      </section>
    </main>
  );
}
