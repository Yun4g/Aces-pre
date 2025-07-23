import { createSlice } from '@reduxjs/toolkit';

export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'reply' | 'comment' | 'file' | 'new';
    time: string;
    extra?: string;
    user?: string;
    subject?: string;
    avatar?: string;  
}

interface NotificationState {
    open: boolean;
    notifications: Notification[];
}

const initialState: NotificationState = {
    open: false,
    notifications: [
        {
            id: '1',
            message: 'A new referral has been submitted from [District Name]. Pupil Services will review and assign it to the appropriate program soon.',
            type: 'info',
            time: 'Last Wednesday at 9:42 AM',
            extra: 'View',
            avatar: '/assest/landGirl.png', 
        },
        {
            id: '2',
            message: 'The referral for [Student Name] has been assigned to Pupil Services for review. Please check the referral dashboard for next steps.',
            type: 'info',
            time: 'Last Wednesday at 9:42 AM',
            extra: 'View',
            avatar: '/assest/landGirl.png', 
        },
        {
            id: '3',
            message: 'The referral for [Student Name] requires more details before proceeding. Please provide the necessary documents or information as soon as possible.',
            type: 'reply',
            time: 'Last Wednesday at 9:42 AM',
            user: 'Denise Nedry',
            subject: 'Anna Szrand',
            avatar: '/assest/landGirl.png', 
        },
        {
            id: '4',
            message: 'John Hammond attached a file to Isla Nublar SOC2 compliance report',
            type: 'file',
            time: 'Last Wednesday at 9:42 AM',
            extra: 'EY_review.pdf',
            avatar: '/assest/landGirl.png', 
        },
        {
            id: '5',
            message: "Oh, I finished de-bugging the phones, but the system's compiling for eighteen minutes, or twent...",
            type: 'comment',
            time: 'Last Wednesday at 9:42 AM',
            user: 'Denise Nedry',
            subject: 'Isla Nublar SOC2 compliance report',
            avatar: '/assest/landGirl.png', 
        },
        {
            id: '6',
            message: 'New Account created',
            type: 'new',
            time: 'Last Wednesday at 9:42 AM',
            avatar: '/assest/landGirl.png', 
        },
    ],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        openNotification: (state) => {
            return { ...state, open: true };
        },
        closeNotification: (state) => {
            return { ...state, open: false };
        },
        markAllAsRead: (state) => {
            return {
                ...state, notifications: state.notifications.map(notification => ({...notification, })),
            };
        },
    },
});

export const { openNotification, closeNotification, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
