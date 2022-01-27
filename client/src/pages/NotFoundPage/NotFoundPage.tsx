import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Page from '../Page';
import {
  BackHomeStyle,
  ErrorIconStyle,
  ErrorStyle,
  RootStyle,
  StatusCodeStyle,
} from './style';
import logo from '../../assets/icons/logo.svg';
import { BackgroundIcons } from '../../features/Dashboard/DashboardStyle';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <RootStyle>
        <BackgroundIcons backColor="#948cfc36">
          <ErrorIconStyle>!</ErrorIconStyle>
        </BackgroundIcons>
        <ErrorStyle>{t('error-page.error')}</ErrorStyle>
        <StatusCodeStyle>404</StatusCodeStyle>
        <p>{t('error-page.not-found')}</p>
        <Link to="/dashboard">
          <BackHomeStyle>{t('error-page.back-to-home')}</BackHomeStyle>
        </Link>
        <img
          src={logo}
          alt="logo"
          style={{
            padding: '10px',
            maxWidth: '220px',
            width: '100%',
            display: 'flex',
            margin: '0px auto',
          }}
        />
      </RootStyle>
    </Page>
  );
};

export default NotFoundPage;
