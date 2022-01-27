import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/Dashboard/models/tasks/tasksSlice';
// eslint-disable-next-line import/no-cycle
import configReducer from '../common/config/configSlice';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/Users/usersSlice';
// eslint-disable-next-line import/no-cycle
import authReducer from '../features/Auth/slices/authSlice';
// eslint-disable-next-line import/no-cycle
import knowledgesReducer from '../features/Knowledge/models/knowledge/knowledgesSlice';
// eslint-disable-next-line import/no-cycle
import transactionsReducer from '../features/Transactions/models/transaction/transactionsSlice';
// eslint-disable-next-line import/no-cycle
import notificationsReducer from '../features/UserHeader/models/notification/notificationsSlice';
// eslint-disable-next-line import/no-cycle
import paymentReducer from '../features/Auth/slices/paymentSlice';
// eslint-disable-next-line import/no-cycle
import globalNotificationReducer from '../components/notifications/model/globalNotificationSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    config: configReducer,
    users: usersReducer,
    knowledges: knowledgesReducer,
    transactions: transactionsReducer,
    notifications: notificationsReducer,
    payment: paymentReducer,
    globalNotification: globalNotificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
