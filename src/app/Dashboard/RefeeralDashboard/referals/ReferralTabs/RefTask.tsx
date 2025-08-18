'use client';
import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { MdOutlineMail } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Tasks: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden min-h-screen">
      <div className="w-full md:w-2/3 p-6 border-b md:border-b-0 md:border-r border-gray-200">


        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Referral Information</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium">High</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">In Progress</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">Last Updated: <span className="font-medium">2 hours ago</span></p>
        </div>



        <div className="flex items-center justify-between mt-6 relative w-full">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 z-0">
            <div className="h-1 bg-blue-500" style={{ width: "50%" }}></div>
          </div>

          {[
            { label: "Submitted", icon: "📄" },
            { label: "Under Review", icon: "📄" },
            { label: "Processing", icon: "⚙️" },
            { label: "Completed", icon: "✔️" },
          ].map((step, idx) => {
            const isCompleted = idx < 1; 
            const isActive = idx === 1;  
            return (
              <div key={idx} className="flex flex-col items-center w-1/4 relative z-10">
            
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm
            ${isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : isCompleted
                        ? "border-blue-600 bg-white text-blue-600"
                        : "border-gray-300 bg-white text-gray-400"}
          `}
                >
                  {step.icon}
                </div>
             
                <span
                  className={`mt-2 text-xs font-medium 
            ${isActive ? "text-blue-700" : "text-gray-500"}`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>



        <div className="mt-6 text-sm text-gray-700">
          <p>
            After the latest system update (v2.41), I'm experiencing issues accessing the cloud storage services.
            The application crashes whenever I try to sync files larger than 100MB. This is affecting our team's
            ability to collaborate on large design files.
          </p>
          <p className="mt-3 font-semibold">Steps to reproduce:</p>
          <ol className="list-decimal pl-6 mt-1 space-y-1">
            <li>Open cloud storage application</li>
            <li>Attempt to upload file larger than 100MB</li>
            <li>Application freezes and crashes</li>
          </ol>
        </div>


        <div className="mt-8">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Student Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Isaac Samuel Johnson" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
            <input type="text" placeholder="Grade 8" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
            <input type="text" placeholder="Behavioural" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
            <input type="text" placeholder="Grade 8" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
          </div>
        </div>


        <div className="mt-8">
          <h3 className="text-base font-semibold text-gray-800">Program Assistants</h3>
          <p className="text-sm text-gray-600 mb-3">Manage program assignments for students referrals</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Current Assignments</label>
              <div className="px-3 py-2 bg-gray-100 rounded-md text-sm">Special Education Program</div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Current Assignments</label>
              <div className="px-3 py-2 bg-gray-100 rounded-md text-sm">Special Education Program</div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Assign Program</button>
            <button className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-100">Reassign</button>
          </div>
        </div>

      </div>


      <div className="w-full md:w-1/3 p-6 space-y-6">
        {[
          { label: 'Priority', value: 'Medium' },
          { label: 'Assigned to', value: 'Allie Garrison' },
          { label: 'Referral type', value: 'Allie Garrison' },
          { label: 'Ticket type', value: 'Allie Garrison' },
          { label: 'Due date', value: 'Allie Garrison' },
          { label: 'Referrer', value: 'Allie Garrison' },
        ].map((item, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-500 mb-1">{item.label}</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md text-sm">{item.value}</div>
          </div>
        ))}

        <div className="px-3 py-2 border border-blue-200 bg-blue-50 rounded-md text-sm text-blue-700">
          You have full access to assign and reassign programs
        </div>
      </div>

    </div>
  );
};

export default Tasks;
