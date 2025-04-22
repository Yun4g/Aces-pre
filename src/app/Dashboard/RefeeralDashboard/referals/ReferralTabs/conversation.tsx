'use client';

import React from 'react';
import Image from 'next/image';
import Details from './details';

const ConversationTab: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white rounded-md border">
      {/* Left side: Conversation area */}
      <div className="flex flex-col w-full md:w-[60%] border-r h-full max-h-screen">
        <div className="flex-1 overflow-y-auto p-4">
      
          <div className="mb-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-2">
            
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.324 3 11.75s4.03 8.25 9 8.25Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 5.25c1.354 0 2.607.56 3.64 1.535m-3.64 5.465a3.377 3.377 0 01-3.64 0m3.64-5.465L13.5 12.75m-3.106 3.791a5.035 5.035 0 01-1.439-2.342M10.031 8.655c-1.354 0-2.607.56-3.64 1.535m3.64 5.465L10.032 12.75m3.106 3.791a5.035 5.035 0 011.439-2.342m-2.931.577a5.343 5.343 0 01-2.287-1.096" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm md:text-base">
                  Ticket Created by Courtney Henry <span className="font-normal text-gray-500 ml-2">11:40am</span>
                </p>
              </div>
            </div>
          </div>

          {/* System Message */}
          <div className="mb-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a3 3 0 00-3-3H7.5a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5m-3-3L6 18L13.5 6" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-sm md:text-base">
                  System <span className="font-normal text-gray-500 ml-2">11:40am</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Workflow step assigned to Pupil Services Referral Group.
                </p>
              </div>
            </div>
          </div>


          {/* Today Label */}
          <div className="mb-2 mt-6">
            <span className="text-xs uppercase text-gray-400">Today</span>
          </div>

          {/* Message From Image */}
          <div className="mb-4">
            <div className="flex items-start">
              <Image
                src="/images/user-avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full mr-2 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-700 text-sm md:text-base">
                  PSS <span className="font-normal text-gray-500 ml-2">11:40am</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Hi Sir Isaac, thanks for your referral. To better assess Samuel Johnson, can you share specific incidents or patterns you’ve noticed? Any feedback from parents?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t-2">
          <div className="flex items-center p-4  border-2 rounded-t-2xl space-x-2 ">
            <button className="text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13" />
              </svg>
            </button>
            <button className="text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 9.776h16.5" />
              </svg>
            </button>
            <button className="text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 6.75L5.98 17.99" />
              </svg>
            </button>
            <button className="ml-auto text-blue-500 hover:underline text-xs">Attach</button>
          </div>

          <textarea
            className="w-full h-32 p-2 border-2 rounded-b-md text-sm focus:outline-none"
            placeholder="Add your response..."
          ></textarea>

          <div className="flex justify-end mt-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded">
              Post Response
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Details Panel */}
      <div className="w-full md:w-[40%] border-t md:border-t-0 md:border-l">
        <Details />
      </div>
    </div>
  );
};

export default ConversationTab;
