import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ComponentsHolder,
  BoxStyle,
  UsersHeaderStyled,
  UsersHeaderPStyled,
  IconBackground,
} from './UsersStyle';
import { UsersIconPage } from '../../assets/icons/index';
import UsersTable from './components/usersTable';
import UserHeader from '../UserHeader/UserHeader';

const UsersScreen = () => {
  const { t } = useTranslation();
  return (
    <BoxStyle>
      <UserHeader />
      <ComponentsHolder>
        <UsersHeaderStyled>
          <IconBackground>
            <UsersIconPage />
          </IconBackground>
          <UsersHeaderPStyled>{t('users.users')}</UsersHeaderPStyled>
        </UsersHeaderStyled>
        <UsersTable />
      </ComponentsHolder>
    </BoxStyle>
  );
};

export default UsersScreen;
