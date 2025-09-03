'use client';
import React, { useState, useEffect } from 'react';
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
    created_at: string;

}

const NotificationOverlay = () => {
    const dispatch = useDispatch();
    const { open, } = useSelector((state: RootState) => state.notification);
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [message, setMessage] = React.useState<any>('')

    const token = sessionStorage.getItem('token');
    console.log(token, 'token in notification overlay');


    const fetchNotifications = async () => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('No token found in sessionStorage. Try logging in again.');
            return [];
        }
        try {
            const response = await axios.get('https://api.aces-tdx.com/api/notifications/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.status === 200) {
                console.log(response.data, 'notifications data');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setMessage(error)
            return [];
        }
    };



    const { data, error } = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications,
        refetchInterval: 3000,
    });

    React.useEffect(() => {
        if (error) {
            setMessage(error);
        }
    }, [error]);
    React.useEffect(() => {
        setNotifications(data || []);
    }, [data]);

  

    useEffect(() => {  
        localStorage.setItem('notification', JSON.stringify(notifications));
    }, [notifications])
    
     if (!token) {
        alert('No token found in sessionStorage. try login again.');
        return [];
    }
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-10">
            <div className="bg-white w-full max-w-lg mt-16 mr-8 rounded-lg shadow-2xl border p-0 overflow-hidden">
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="font-semibold text-lg">Notifications</h2>
                    <button onClick={() => dispatch(closeNotification())} className="text-2xl text-gray-400 hover:text-gray-600">&times;</button>
                </div>


                <div className="flex border-b px-6 pt-2 pb-2 gap-6">
                    <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">Inbox</button>
                    
                </div>


                <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                    {message && (
                        <div>
                            {message}
                        </div>
                    )}
                    {notifications.map((n: Notification) => (
                        <div key={n.id} className="mb-6 flex items-start gap-3">
                            <div className="mt-1 h-8 w-8 rounded-full overflow-hidden">
                                <Image
                                    src="data:image/jpeg;base64,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"
                                    alt="User Avatar"
                                    width={60}
                                    height={60}
                                    className="rounded-full h-full w-full object-cover"

                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-gray-700">
                                    {n.type === 'reply' && (
                                        <span>
                                            <span className="font-medium">{n.user}</span> replied to <span className="font-medium">{n.subject}</span>
                                            <br />
                                        </span>
                                    )}

                                    {n.message}

                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {new Date(n.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}{" "}
                                    -{" "}
                                    {new Date(n.created_at).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}</div>
{/* 
                                Action buttons */}
                                {/* {n.type === 'info' && n.extra && (
                                    <div className="mt-2 flex gap-2">
                                        <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded">View</button>
                                        <button className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded">Cancel</button>
                                    </div>
                                )} */}
                                {n.type === 'comment' && (
                                    <div className="mt-2">
                                        <button className="text-xs text-blue-600 border px-2 py-1 rounded">+ Add to favorites</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

             
                <div className="flex items-center justify-between border-t px-6 py-3 bg-gray-50">
                    <div>
                        <button className="text-xs text-blue-600 hover:underline">Mark all as read</button>
                    </div>
                    <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded">View all notification</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationOverlay;
