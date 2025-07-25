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
}

const initialState: NotificationState = {
    open: false,
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
       
    },
});

export const { openNotification, closeNotification, } = notificationSlice.actions;
export default notificationSlice.reducer;
