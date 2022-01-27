import React from 'react';
import ResponsiveDrawer from '../../components/drawer/responsiveDrawer';
import DashboardScreen from '../../features/Dashboard/DashboardScreen';
import DashbordStyled from './style';

const DashboardPage = () => (
  <DashbordStyled>
    <ResponsiveDrawer />
    <DashboardScreen />
  </DashbordStyled>
);

export default DashboardPage;
