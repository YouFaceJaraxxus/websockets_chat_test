import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { HelloStyle, UserHeaderStyle, UserNameStyle } from './ui/UserHeaderStyle';
import NotificationsToggle from './components/NotificationsToggle';
import Notifications from './components/Notifications';
import { checkNewNotificationsAsync, getNotificationsAsync } from './models/notification/notificationsSlice';
import { selectUser } from '../Auth/slices/authSlice';

const UserHeader = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const {
    newNotifications,
    alreadyFetched,
    fetching,
  } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    dispatch(checkNewNotificationsAsync());
  }, []);
  const openNotifications = () => {
    if (!alreadyFetched && !fetching) {
      dispatch(getNotificationsAsync(1));
    }
    setNotificationsOpen(true);
  };
  const closeNotifications = () => setNotificationsOpen(false);
  return (
    <>
      <UserHeaderStyle>
        <Typography
          variant="h6"
          sx={{
            '@media (max-width: 400px)': {
              position: 'relative',
              left: '3px',
              bottom: '1px',
            },
          }}
        >
          <HelloStyle>
            {t('home-page.hello')}
          </HelloStyle>
          <UserNameStyle>
            {user.isAdmin && (user.firstname ? user.firstname.concat(' ', user.lastname) : t('home-page.admin'))}
            {!user.isAdmin && (user.firstname ? user.firstname.concat(' ', user.lastname) : t('home-page.user'))}
          </UserNameStyle>
        </Typography>
        <NotificationsToggle value={newNotifications} onClick={openNotifications} />
      </UserHeaderStyle>
      <Notifications handleClose={closeNotifications} open={notificationsOpen} />
    </>

  );
};

export default UserHeader;
