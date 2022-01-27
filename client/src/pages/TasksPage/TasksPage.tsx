import React from 'react';
import ResponsiveDrawer from '../../components/drawer/responsiveDrawer';
import TasksScreen from '../../features/TaskArchive/TasksScreen';
import TransactionsStyled from './style';

const TasksPage = () => (
  <TransactionsStyled>
    <ResponsiveDrawer />
    <TasksScreen />
  </TransactionsStyled>
);

export default TasksPage;
