import React from 'react';
import ResponsiveDrawer from '../../components/drawer/responsiveDrawer';
import UsersScreen from '../../features/Users/UsersScreen';
import TransactionsStyled from './style';

const UsersPage = () => (
  <TransactionsStyled>
    <ResponsiveDrawer />
    <UsersScreen />
  </TransactionsStyled>
);

export default UsersPage;
