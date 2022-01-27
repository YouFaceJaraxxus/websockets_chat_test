import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICheckNewNotificationsResponse } from '../checkNewNotificationsResponse';
import { IGetNotificationsFilter } from '../getNotificationsFilter';
import { IGetNotificationsResponse } from '../getNotificationsResponse';
import { IUserNotification } from './notification';
import { checkNewNotifications, deleteNotification, getNotifications, setNotificationAsSeen } from './NotificationsService';

const LIMIT = 10;
interface NotificationsState {
  notifications: IUserNotification[]
  fetching: boolean;
  newNotifications: number;
  count: number;
  currentPage: number;
  alreadyFetched: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  fetching: false,
  count: 0,
  newNotifications: 0,
  currentPage: 1,
  alreadyFetched: false,
};
export const getNotificationsAsync = createAsyncThunk(
  'notifications/fetchNotifications',
  async (page: number): Promise<IGetNotificationsResponse> => {
    const queryFilter = { limit: LIMIT, page } as IGetNotificationsFilter;
    const response = await getNotifications(queryFilter);
    return response;
  },
);
export const setNotificationAsSeenAsync = createAsyncThunk(
  'notifications/setNotificationAsSeen',
  async (id: number): Promise<IUserNotification> => {
    const response = await setNotificationAsSeen(id);
    return response;
  },
);
export const checkNewNotificationsAsync = createAsyncThunk(
  'notifications/checkNewNotifications',
  async (): Promise<ICheckNewNotificationsResponse> => {
    const response = await checkNewNotifications();
    return response;
  },
);
export const deleteNotificationAsync = createAsyncThunk(
  'notifications/deleteNotification',
  async (id: number): Promise<IUserNotification> => {
    const response = await deleteNotification(id);
    return response;
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNewNotifications(state) {
      state.newNotifications = 0;
    },
    resetNotifications(state) {
      state.notifications = [];
      state.newNotifications = 0;
      state.currentPage = 1;
      state.fetching = false;
      state.alreadyFetched = false;
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getNotificationsAsync.fulfilled, (state, action) => {
        state.notifications.push(...action.payload.rows);
        action.payload.rows.forEach((n) => {
          if (n.new) {
            state.newNotifications -= 1;
          }
        });
        state.count = action.payload.count;
        state.fetching = false;
        state.alreadyFetched = true;
        state.currentPage += 1;
      })
      .addCase(getNotificationsAsync.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(checkNewNotificationsAsync.fulfilled, (state, action) => {
        state.newNotifications = action.payload.newNotificationsNumber;
      })
      .addCase(setNotificationAsSeenAsync.fulfilled, (state, action) => {
        const seenNotificationId = action.payload.id;
        state.notifications.forEach((notification) => {
          if (notification.id === seenNotificationId) {
            notification.seen = true;
          }
        });
      })
      .addCase(deleteNotificationAsync.fulfilled, (state, action) => {
        state.notifications = state.notifications
          .filter((n) => n.id !== action.payload.id);
        state.count -= 1;
        state.fetching = false;
      });
  },
});

export const { resetNewNotifications, resetNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
