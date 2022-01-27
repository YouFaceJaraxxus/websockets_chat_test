import * as React from 'react';
import { NotificationsIcon } from '../../../assets/icons';
import { CountBadge, NotificationsWrapper } from './ui/NotificationsToggleStyle';

const NotificationsToggle = ({ value, onClick }) => (
  <NotificationsWrapper onClick={onClick}>
    <NotificationsIcon />
    <CountBadge>
      {value}
    </CountBadge>
  </NotificationsWrapper>
);
export default NotificationsToggle;
