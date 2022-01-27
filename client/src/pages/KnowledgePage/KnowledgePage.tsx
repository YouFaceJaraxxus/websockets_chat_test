import React from 'react';
import ResponsiveDrawer from '../../components/drawer/responsiveDrawer';
import KnowledgeScreen from '../../features/Knowledge/KnowledgeScreen';
import TransactionsStyled from './style';

const KnowledgePage = () => (
  <TransactionsStyled>
    <ResponsiveDrawer />
    <KnowledgeScreen />
  </TransactionsStyled>
);

export default KnowledgePage;
