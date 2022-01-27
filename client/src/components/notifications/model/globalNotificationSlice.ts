import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotificationConfig } from './notificationConfig';

const initialState: INotificationConfig = {
  isOpen: false,
  severity: 'success',
  messageBody: '',
};
const globalNotificationSlice = createSlice({
  name: 'globalNotification',
  initialState,
  reducers: {
    closeNotification: (state) => {
      state.isOpen = false;
    },
    openNotification: (state, action: PayloadAction<INotificationConfig>) => {
      state.isOpen = action.payload.isOpen;
      state.severity = action.payload.severity;
      state.messageBody = action.payload.messageBody;
    },
  },
});

export const { openNotification, closeNotification } = globalNotificationSlice.actions;
export default globalNotificationSlice.reducer;
