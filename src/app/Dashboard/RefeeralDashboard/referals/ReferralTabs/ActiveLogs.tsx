'use client';

import { useState } from 'react';
import Details from './details';

export default function ActivityLogs() {
  const [selectedActivity, setSelectedActivity] = useState(1);

  const activityLogs = [
    {
      id: 1,
      type: 'notification',
      icon: 'N',
      iconBackground: 'bg-blue-500',
      title: 'Notification Sent to Fuel Services',
      time: '2 hours ago',
      description: 'The fuel service notification was sent by the Service Manager',
      status: 'info',
      isEmail: true,
    },
    {
      id: 2,
      type: 'program',
      icon: 'P',
      iconBackground: 'bg-green-500',
      title: 'Program Selection Completed',
      time: '3 hours',
      description: 'The selection was completed by the Service Manager',
      status: 'success',
    },
    {
      id: 3,
      type: 'status',
      icon: 'S',
      iconBackground: 'bg-blue-500',
      title: 'Status Updated by Program',
      time: '5 hours',
      description: 'A new status was submitted by the Service Manager',
      status: 'error',
    },
    {
      id: 4,
      type: 'reply',
      icon: 'R',
      iconBackground: 'bg-red-500',
      title: 'Reply Sent to Original Request',
      time: '6 hours',
      description: 'The reply was submitted by the Service Manager on 4/15 at 9:30AM',
      status: 'neutral',
    },
    {
      id: 5,
      type: 'followup',
      icon: 'F',
      iconBackground: 'bg-red-500',
      title: 'Fuel Services Follow-up',
      time: '1 day',
      description: 'The follow-up was submitted by the Service Manager',
      status: 'warning',
    },
    {
      id: 6,
      type: 'notification',
      icon: 'N',
      iconBackground: 'bg-blue-500',
      title: 'Notification Sent to Fuel Services',
      time: '1 week',
      description: 'The notification was created by the Service Manager on 4/15 at 9:30AM',
      status: 'info',
    },
    {
      id: 7,
      type: 'status',
      icon: 'S',
      iconBackground: 'bg-green-500',
      title: 'Status Updated by Program',
      time: '2 weeks',
      description: 'A new status was submitted by the Service Manager on 4/15 at 9:30AM',
      status: 'success',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white border-2 rounded-lg overflow-hidden">
      {/* Activity Logs Panel */}
      <div className="w-full lg:w-2/3 border-b lg:border-b-0 lg:border-r border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center px-4 py-3 border-b border-gray-200 gap-y-2">
          <h2 className="text-lg font-bold">Activity Logs</h2>
          <span className="text-sm sm:text-base font-medium text-gray-600">
            Last Updated 2 hours ago
          </span>
        </div>
        <div className="max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className={`flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                selectedActivity === log.id ? 'bg-gray-50' : ''
              }`}
              onClick={() => setSelectedActivity(log.id)}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 ${log.iconBackground} text-white rounded-full flex items-center justify-center font-medium mr-3`}
              >
                {log.icon}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-1 gap-2 flex-wrap">
                  <h3 className="text-sm font-medium truncate">{log.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{log.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{log.description}</p>
                {log.isEmail && <p className="text-xs text-gray-400 mt-1">Email</p>}
              </div>
              <div className="ml-3 flex-shrink-0 hidden sm:block">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(log.status)}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200">
        <Details />
      </div>
    </div>
  );
}
