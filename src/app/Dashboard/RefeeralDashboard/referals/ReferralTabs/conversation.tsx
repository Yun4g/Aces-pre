'use client';
import { useRef } from 'react';
import React from 'react';
import Image from 'next/image';
import Details from './details';

const ConversationTab: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textarea = textareaRef.current;

  const Bold = ()=>{
    if (!textarea) return;
     textarea.style.fontSize = '20px'
  }
  const italice = ()=>{
    if (!textarea) return;
     textarea.style.fontFamily = 'Times New Roman'
  }


  const insertBullet = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const before = text.slice(0, start);
    const lineStart = before.lastIndexOf('\n') + 1;

    const newText = text.slice(0, lineStart) + '- ' + text.slice(lineStart);
    textarea.value = newText;
    textarea.selectionStart = textarea.selectionEnd = start + 2;
    textarea.focus();
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen dark:border-gray-950 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 rounded-md border">

      <div className="flex flex-col w-full md:w-[60%] border-r dark:border-r-gray-950  h-full max-h-screen">
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
        <div className="border rounded-2xl shadow-sm bg-white m-5 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center px-2 py-2 border-b border-gray-200 dark:border-gray-800 rounded-t-lg">
        <div className="flex space-x-2">
          {/* Bullet List */}
          <button onClick={insertBullet} className="text-gray-600 hover:text-gray-800 p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8M4 18h16" />
            </svg>
          </button>

          {/* Italic */}
          <button onClick={() => italice()} className="text-gray-600 hover:text-gray-800 p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 4H10M14 20H10M12 4L12 20" />
            </svg>
          </button>

          {/* Bold */}
          <button onClick={() => Bold()} className="text-gray-600 hover:text-gray-800 p-1 font-bold text-sm leading-none">
            B
          </button>
        </div>

        {/* Attach Button */}
        <button className="ml-auto text-xs text-gray-600 hover:underline flex items-center gap-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l7.071-7.071a4 4 0 10-5.657-5.657L6.343 10.343a6 6 0 108.485 8.485L20 13"
            />
          </svg>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="w-full h-28 px-3 py-2 text-sm border-t border-gray-200 dark:border-gray-800 rounded-b-lg resize-none bg-white  dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
        placeholder="Add your response"
      ></textarea>

      {/* Post button */}
      <div className="flex justify-end px-4 py-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">
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
