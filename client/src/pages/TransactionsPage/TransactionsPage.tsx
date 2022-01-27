import React from 'react';
import ResponsiveDrawer from '../../components/drawer/responsiveDrawer';
import TransactionsScreen from '../../features/Transactions/TransactionsScreen';
import TransactionsStyled from './style';

const TransactionsPage = () => (
  <TransactionsStyled>
    <ResponsiveDrawer />
    <TransactionsScreen />
  </TransactionsStyled>
);

export default TransactionsPage;
