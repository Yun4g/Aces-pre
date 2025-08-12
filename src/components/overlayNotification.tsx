// components/NotificationOverlay.tsx
'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeNotification, } from '@/Redux/notificationSlice';
import { RootState } from '@/Redux';
import Image from 'next/image';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


interface Notification {
    id: string;
    message: string;
    type: 'info' | 'reply' | 'comment' | 'file' | 'new';
    time: string;
    extra?: string;
    user?: string;
    subject?: string;
    avatar?: string;  
}

const NotificationOverlay = () => {
    const dispatch = useDispatch();
    const { open,} = useSelector((state: RootState) => state.notification);
    const [notifications, setNotifications] = React.useState<Notification[]>([]);

   const token = sessionStorage.getItem('token');
   console.log(token, 'token in notification overlay');
   

   const fetchNotifications = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('No token found in sessionStorage. Try logging in again.');
        return [];
    }
    try {
        const response = await axios.get('/api/notification/1', {
           headers: { Authorization: `Bearer ${token}` }
        })
        if (response.status === 200) {
            console.log(response.data, 'notifications data');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
};

     
   
 const {data,  error} = useQuery({
         queryKey: ['notifications'],
         queryFn: fetchNotifications,
         refetchOnWindowFocus: false,
    })

React.useEffect(() => {
       setNotifications(data || []);
}, [data]);

 if (!token) {
    alert('No token found in sessionStorage. try login again.');
    return []; 
  }
    
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-10">
            <div className="bg-white w-full max-w-lg mt-16 mr-8 rounded-lg shadow-2xl border p-0 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="font-semibold text-lg">Notifications</h2>
                    <button onClick={() => dispatch(closeNotification())} className="text-2xl text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                {/* Tabs */}
                <div className="flex border-b px-6 pt-2 pb-2 gap-6">
                    <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">Inbox</button>
                    <button className="text-gray-600 pb-2">Following</button>
                    <button className="text-gray-600 pb-2">All</button>
                </div>

                {/* Notification Items */}
                <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                    {notifications.map((n: Notification) => (
                        <div key={n.id} className="mb-6 flex items-start gap-3">

                            {/* Avatar */}
                            <div className="mt-1">
                                {n.avatar && (
                                    <Image
                                        src={n.avatar}
                                        alt="User Avatar"
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="text-sm text-gray-700">
                                    {n.type === 'reply' && (
                                        <span>
                                            <span className="font-medium">{n.user}</span> replied to <span className="font-medium">{n.subject}</span>
                                            <br />
                                        </span>
                                    )}
                                    {n.type === 'comment' && (
                                        <span>
                                            <span className="font-medium">{n.user}</span> commented on <span className="font-medium">{n.subject}</span>
                                            <br />
                                        </span>
                                    )}
                                    {n.message}
                                    {n.extra && (
                                        <span className="ml-2 text-blue-600 underline cursor-pointer">{n.extra}</span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">{n.time}</div>

                                {/* Action buttons */}
                                {n.type === 'info' && n.extra && (
                                    <div className="mt-2 flex gap-2">
                                        <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded">View</button>
                                        <button className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded">Cancel</button>
                                    </div>
                                )}
                                {n.type === 'comment' && (
                                    <div className="mt-2">
                                        <button className="text-xs text-blue-600 border px-2 py-1 rounded">+ Add to favorites</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t px-6 py-3 bg-gray-50">
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1 align-text-bottom">
                            <path d="M6.99991 12C3.92491 12 1.33325 9.40835 1.33325 6.33335C1.33325 3.25835 3.92491 0.666687 6.99991 0.666687C10.0749 0.666687 12.6666 3.25835 12.6666 6.33335C12.6666 9.40835 10.0749 12 6.99991 12ZM14.6666 15.3333L11.3333 12" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <button  className="text-xs text-blue-600 hover:underline">Mark all as read</button>
                    </div>
                    <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded">View all notification</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationOverlay;
