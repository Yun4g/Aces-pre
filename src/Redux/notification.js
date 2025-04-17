 'use Client';
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openNotification: (state) => {
      state.isOpen = true;
    },
    closeNotification: (state) => {
      state.isOpen = false;
    },
    toggleNotification: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openNotification, closeNotification, toggleNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
