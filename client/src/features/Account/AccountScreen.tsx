import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ComponentsHolder,
  BoxStyle,
  AccountHeaderStyled,
  AccountHeaderPStyled,
  IconBackground,
} from './AccountStyle';
import { UsersIconSingle } from '../../assets/icons/index';
import AccountTabs from './components/AccountTabs';
import UserHeader from '../UserHeader/UserHeader';

const AccountScreen = () => {
  const { t } = useTranslation();
  return (
    <BoxStyle>
      <UserHeader />
      <ComponentsHolder>
        <AccountHeaderStyled>
          <IconBackground>
            <UsersIconSingle />
          </IconBackground>
          <AccountHeaderPStyled>{t('account.my-account')}</AccountHeaderPStyled>
        </AccountHeaderStyled>
        <AccountTabs />
      </ComponentsHolder>
    </BoxStyle>
  );
};

export default AccountScreen;
