import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeNotification } from './model/globalNotificationSlice';
import Notification from './notification';

export default function GlobalNotification() {
  const { isOpen, severity, messageBody } = useAppSelector((state) => state.globalNotification);
  const dispatch = useAppDispatch();
  return (
    <Notification
      handleClose={() => { dispatch(closeNotification()); }}
      isOpen={isOpen}
      severity={severity}
      messageBody={messageBody}
    />
  );
}
