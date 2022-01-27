import React from 'react';
import ResponsiveDrawer from '../../components/drawer/responsiveDrawer';
import AccountScreen from '../../features/Account/AccountScreen';
import TransactionsStyled from './style';

const AccountPage = () => (
  <TransactionsStyled>
    <ResponsiveDrawer />
    <AccountScreen />
  </TransactionsStyled>
);

export default AccountPage;
