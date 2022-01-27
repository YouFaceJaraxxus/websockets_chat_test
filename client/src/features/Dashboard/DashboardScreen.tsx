import React, { useEffect } from 'react';
import StatsCard from './components/StatsCard';
import KnowledgeBitesCard from './components/KnowledgeBitesCard';
import TransactionsCard from './components/TransactionsCard';
import TasksTable from './components/TasksTable';
import { BoxStyle, ComponentsHolder } from './DashboardStyle';
import UserHeader from '../UserHeader/UserHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserSubscriptionsAsync, selectUser } from '../Auth/slices/authSlice';
import { getKnowledgesAsync } from '../Knowledge/models/knowledge/knowledgesSlice';
import { checkNewNotificationsAsync } from '../UserHeader/models/notification/notificationsSlice';

const DashboardScreen = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkNewNotificationsAsync());
    dispatch(getKnowledgesAsync({}));
    if (!user.isAdmin) {
      dispatch(getUserSubscriptionsAsync());
    }
  }, []);
  return (
    <BoxStyle>
      <UserHeader />
      <ComponentsHolder>
        <StatsCard isAdmin={user.isAdmin} />
        {
          user.isAdmin ?
            <TransactionsCard />
            :
            <KnowledgeBitesCard />
        }
        <TasksTable />
      </ComponentsHolder>
    </BoxStyle>
  );
};

export default DashboardScreen;
