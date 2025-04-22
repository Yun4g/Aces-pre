'use client';

//' pages/referral/[id].tsx
import { useState } from 'react';
import ConversationTab from './ReferralTabs/conversation';
import ActivityLogs from './ReferralTabs/ActiveLogs';
import NavbarReferal from '../navbarReferal';
import DashboardHeader from '@/components/DashBoardHeader';
import ReferralForm from './ReferralTabs/task';
import { MessageSquareText, FileText, Layers } from 'lucide-react';


type Tab = 'Conversation' | 'task' | 'ActivityLogs';

interface MainDashBoardProps {
  isOpen: boolean;
  onClose: () => void;
}



const ReferralDetailsPage = ({ }: MainDashBoardProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('Conversation');



  const tabs = [
    { id: 'Conversation', label: 'Conversation', icon: <MessageSquareText size={18} /> },
    { id: 'task', label: 'Task', icon: <FileText size={18} /> },
    { id: 'ActivityLogs', label: 'Activity Logs', icon: <Layers size={18} /> },
  ];
  const renderTab = () => {
    switch (activeTab) {
      case 'Conversation':
        return <ConversationTab />;
      case 'task':
        return <ReferralForm />;
      case 'ActivityLogs':
        return <ActivityLogs />;
      default:
        return null;
    }
  };


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
          className="md:hidden mb-4 bg-white px-3 py-2 rounded-md shadow-sm   text-sm"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>
        <div className=" ">
          <header className=' mb-1 rounded-md overflow-hidden bg-white '>
            <DashboardHeader />
          </header>

          <div className="flex flex-wrap bg-white justify-center relative items-center mb-1   p-3  w-full">
            <div className='flex  px-2 justify-center  text-center  '>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${activeTab === tab.id ? 'text-[#005A9C]' : 'text-gray-800'
                    }`}
                >
                  <span className="flex items-center gap-1">
                    {tab.icon}
                    {tab.label}
                  </span>

                </button>


              ))}
            </div>

            <div className=' md:absolute right-4'>
              <button className=' w-40 h-12 md:w-40 md:h-14 rounded-md text-white bg-[#005A9C]'>New Referal</button>
            </div>

          </div>

          <div className="border p-4 rounded-lg shadow-sm bg-white">
            {renderTab()}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReferralDetailsPage;
