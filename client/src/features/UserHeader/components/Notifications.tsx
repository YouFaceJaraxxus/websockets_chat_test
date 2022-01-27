import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Slide } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  CustomNotificationsWrapper,
  TitleWrapper,
  TitleIconTextWrapper,
  NotificationsList,
  NoNotifications,
  TitleText,
} from './ui/NotificationsStyle';
import {
  IconWrapper,
} from '../../Dashboard/ui/TaskOverviewModalStyle';
import {
  CloseIcon,
  DeleteIcon,
  NotificationsIcon,
} from '../../../assets/icons';
import { IconWrapperPointer } from '../../Dashboard/ui/SaveTaskModalStyle';
import NotificationsListItem from './NotificationsListItem';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { TableSpinner, TableSpinnerWrapper } from '../../Dashboard/ui/TableDataStyle';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { deleteNotificationAsync, getNotificationsAsync } from '../models/notification/notificationsSlice';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

// this padding is a couple of pixels of padding
// for detecting scrolling to bottom of notifications list
const PADDING = 2;
const LIMIT = 10;
const Notifications = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const toggleNotification = (
    success: boolean,
    messageBody: string,
  ) => {
    dispatch(openNotification({
      isOpen: true,
      messageBody,
      severity: success ? 'success' : 'error',
    }));
  };

  const closeModal = () => {
    handleClose();
  };
  const {
    notifications,
    fetching,
    currentPage,
    alreadyFetched,
    count,
  } = useAppSelector((state) => state.notifications);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
    method: null,
    type: '',
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const deleteNotification = (id) => {
    closeConfirmDialog();
    dispatch(deleteNotificationAsync(id))
      .then((response) => {
        if (response.payload) {
          toggleNotification(true, t('notifications.notification-deleted'));
        }
      });
  };

  const openConfirmDeleteDialog = (id) => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('notifications.delete-this-notification'),
      actionText: t('notifications.delete'),
      IconComponent: DeleteIcon,
      method: () => { deleteNotification(id); },
      type: 'red',
    });
  };

  const handleNotificationsScroll = (e) => {
    const bottom = e
      .target
      .scrollHeight - (Math.ceil(e.target.scrollTop) + e.target.clientHeight) <= PADDING;
    if (bottom) {
      if (!fetching) {
        if (currentPage - 1 < count / LIMIT) { dispatch(getNotificationsAsync(currentPage)); }
      }
    }
  };

  return (
    <>

      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Slide in={open} direction="left" mountOnEnter unmountOnExit>
          <CustomNotificationsWrapper onScroll={handleNotificationsScroll}>
            <TitleWrapper>
              <TitleIconTextWrapper>
                <IconWrapper>
                  <NotificationsIcon />
                </IconWrapper>
                <TitleText>
                  {t('notifications.notifications')}
                </TitleText>
              </TitleIconTextWrapper>
              <IconWrapperPointer sx={{ margin: 'auto 3% auto auto' }} onClick={closeModal}>
                <CloseIcon />
              </IconWrapperPointer>
            </TitleWrapper>
            <NotificationsList>
              {
            // eslint-disable-next-line no-nested-ternary
            !alreadyFetched ?
              (
                <TableSpinnerWrapper>
                  <TableSpinner color="primary" />
                </TableSpinnerWrapper>
              )
              : (
                <>
                  {
                  notifications && notifications.length > 0 ?
                    notifications.map((notification) => (
                      <NotificationsListItem
                        notification={notification}
                        key={notification.id}
                        handleDelete={() => { openConfirmDeleteDialog(notification.id); }}
                        handleClose={closeModal}
                      />
                    ))
                    :
                    (
                      <NoNotifications>
                        {t('notifications.no-new-notifications')}
                      </NoNotifications>
                    )
                }
                  {
                  alreadyFetched && fetching &&
                  (
                    <TableSpinnerWrapper>
                      <TableSpinner color="primary" />
                    </TableSpinnerWrapper>
                  )
                }
                </>
              )
}
            </NotificationsList>
          </CustomNotificationsWrapper>

        </Slide>
      </Modal>
      {confirmDialog.open && (
      <ConfirmationDialog
        isOpen={confirmDialog.open}
        handleAcceptConfirmation={confirmDialog.method}
        handleCloseConfirmation={closeConfirmDialog}
        confirmationTitle={confirmDialog.dialogMessage}
        icon={<confirmDialog.IconComponent />}
        approveText={confirmDialog.actionText}
        declineText="Cancel"
        type={confirmDialog.type}
      />
      )}
    </>
  );
};

export default Notifications;
