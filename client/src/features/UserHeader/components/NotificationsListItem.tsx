import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  INotification,
  IUserNotification,
  NotificationsTypeEnum,
  SubscriptionNotificationsTypeEnum,
  TicketCommentsNotificationsTypeEnum,
  TicketNotificationsTypeEnum,
  UserActionsNotificationsTypeEnum,
} from '../models/notification/notification';
import {
  ListItemWrapper,
  UserIconWrapper,
  Body,
  NotificationsAvatar,
  Author,
  StatusDate,
  SDate,
  SIcon,
  DescriptionWrapper,
  DeleteWrapper,
  AuthorStatusRow,
  DescriptionDeleteRow,
  BolderPrimary,
  Regular,
  BolderError,
  Bolder,
} from './ui/NotificationsListItemStyle';
import account from '../../../assets/icons/account.svg';
import { NotificationDeleteIcon, NotificationNotSeenIcon } from '../../../assets/icons';
import { getAssetPresignedUrl } from '../../Dashboard/models/assets/AssetsService';
import { Spinner } from '../../Dashboard/ui/SaveTaskModalStyle';
import { IUser } from '../../Auth/models/user/user';
import { ACCOUNT_PATH, DASHBOARD_PATH, HOME_PATH, ACCOUNT_PAYMENT_PATH, USERS_PATH } from '../../../routes/path-constants';
import { getTaskById } from '../../Dashboard/models/tasks/TaskService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectTask } from '../../Dashboard/models/tasks/tasksSlice';
import { selectUser } from '../../Auth/slices/authSlice';
import { setNotificationAsSeenAsync } from '../models/notification/notificationsSlice';
import { parseDate } from '../../../common/util';
import { ITask } from '../../Dashboard/models/tasks/task';

const sListItem = ({ notification, handleDelete, handleClose } : {
  notification: IUserNotification,
  handleDelete: (id: number) => void,
  handleClose: () => void }) => {
  const { t } = useTranslation();
  const { author } = notification.notification;
  const [userImage, setUserImage] = useState({
    imgSrc: null,
    loading: false,
  });
  const history = useHistory();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const [seen, setSeen] = useState(notification.seen);

  const getUserIcon = (user: IUser) => {
    if (user && user.profileImageId) {
      setUserImage({
        ...userImage,
        loading: true,
      });
      getAssetPresignedUrl(user.profileImageId)
        .then((presigned) => {
          setUserImage({
            imgSrc: presigned.preSignedUrl,
            loading: false,
          });
        }).catch(() => {
          setUserImage({
            imgSrc: null,
            loading: false,
          });
        });
    }
  };

  useEffect(() => {
    getUserIcon(notification.notification.author);
  }, []);

  const viewNotification = () => {
    if (!seen) {
      dispatch(setNotificationAsSeenAsync(notification.id));
      setSeen(true);
    }
  };

  const navigateToTicket = (ticket: ITask) => {
    const ticketId = ticket.id;
    const path = history.location.pathname;
    if (path === '/' || path.includes('dashboard')) {
      getTaskById(ticketId)
        .then((task) => {
          dispatch(selectTask(task));
        });
    } else {
      history.push({
        pathname: `${DASHBOARD_PATH}`,
        state: { id: ticketId },
      });
    }
    viewNotification();
    handleClose();
  };

  const navigateToComment = (ticketNotification: INotification) => {
    const ticketId = ticketNotification.ticketComment.ticketComment.ticket.id;
    const path = history.location.pathname;
    if (path === HOME_PATH || path.includes(DASHBOARD_PATH)) {
      getTaskById(ticketId)
        .then((task) => {
          dispatch(selectTask(task));
        });
    } else {
      history.push({
        pathname: `${DASHBOARD_PATH}`,
        state: { id: ticketId },
      });
    }
    viewNotification();
    handleClose();
  };

  const navigateToPayment = () => {
    const path = history.location.pathname;
    if (path !== '/' && !path.includes(ACCOUNT_PAYMENT_PATH)) {
      history.push(ACCOUNT_PAYMENT_PATH);
    }
    viewNotification();
    handleClose();
  };

  const navigateToUsersList = () => {
    const path = history.location.pathname;
    if (path !== '/' && !path.includes(USERS_PATH)) {
      history.push(USERS_PATH);
    }
    viewNotification();
    handleClose();
  };

  const navigateToAccount = () => {
    const path = history.location.pathname;
    if (path !== '/' && !path.includes(ACCOUNT_PATH)) {
      history.push(ACCOUNT_PATH);
    }
    viewNotification();
    handleClose();
  };

  const parseAction = () => {
    switch (notification.notification.type) {
      case (NotificationsTypeEnum.TICKET): {
        const { tickets } = notification.notification;
        if (tickets.length > 1) {
          return () => viewNotification();
        }
        const ticket = tickets[0];
        if (ticket.type !== TicketNotificationsTypeEnum.DELETED) {
          return () => { navigateToTicket(ticket.ticket); };
        }
        return () => viewNotification();
      }
      case (NotificationsTypeEnum.TICKET_COMMENT): {
        return () => { navigateToComment(notification.notification); };
      }
      case (NotificationsTypeEnum.SUBSCRIPTION): {
        return () => { navigateToPayment(); };
      }
      case (NotificationsTypeEnum.USER_ACTION): {
        const { userAction } = notification.notification;
        if (userAction) {
          switch (userAction.type) {
            case (UserActionsNotificationsTypeEnum.SELF_DELETED): {
              return () => { navigateToUsersList(); };
            }
            default: {
              return () => { navigateToAccount(); };
            }
          }
        }
        return () => viewNotification();
      }
      default: return () => viewNotification();
    }
  };

  const parseEditedItems = (edits: string[]) => {
    if (edits.length === 1) return edits[0];
    if (edits.length === 2) return `${edits[0]} and ${edits[1]}`;

    let editReturn = edits.slice(0, edits.length - 1).join(', ');
    editReturn += ` and ${edits[edits.length - 1]}`;
    return editReturn;
  };

  const parseContent = () => {
    switch (notification.notification.type) {
      case (NotificationsTypeEnum.TICKET): {
        const { tickets } = notification.notification;
        if (tickets) {
          let ticket = null;
          let mainPart;
          if (tickets.length > 1) {
            return (
              <>
                <BolderPrimary>
                  {tickets.length}
                  {' '}
                  {t('notifications.new-tasks')}
                </BolderPrimary>
                &nbsp;
                <Regular>
                  {t('notifications.have-been-created')}
                </Regular>
              </>
            );
          }
          [ticket] = tickets;
          switch (ticket.type) {
            case (TicketNotificationsTypeEnum.ASSIGNED): {
              if (currentUser.isAdmin) {
                mainPart = (
                  <>
                    <BolderPrimary>{t('notifications.you')}</BolderPrimary>
                    &nbsp;
                    <Regular>{t('notifications.you-have-been-assigned')}</Regular>
                  </>
                );
              } else {
                mainPart = (
                  <>
                    <BolderPrimary>
                      {ticket.ticket.assignedTo.firstname}
                      &nbsp;
                      {ticket.ticket.assignedTo.lastname}
                    </BolderPrimary>
                      &nbsp;
                    <Regular>{t('notifications.has-been-assigned')}</Regular>
                  </>
                );
              }
              break;
            }
            case (TicketNotificationsTypeEnum.BLOCKED): {
              mainPart = <Regular>{t('notifications.has-blocked')}</Regular>;
              break;
            }
            case (TicketNotificationsTypeEnum.COMPLETED): {
              mainPart = <Regular>{t('notifications.has-completed-your-task')}</Regular>;
              break;
            }
            case (TicketNotificationsTypeEnum.CREATED): {
              mainPart = <Regular>{t('notifications.has-created')}</Regular>;
              break;
            }
            case (TicketNotificationsTypeEnum.DELETE_REQUEST): {
              mainPart = <Regular>{t('notifications.requested-a-deletion')}</Regular>;
              break;
            }
            case (TicketNotificationsTypeEnum.EDITED): {
              const { data } = ticket;
              if (data) {
                const dataParsed = JSON.parse(data);
                if (dataParsed && dataParsed.changes as string[]) {
                  mainPart = (
                    <Regular>
                      {t('notifications.changed')}
                      {' '}
                      <Bolder>
                        {parseEditedItems(dataParsed.changes)}
                      </Bolder>
                      &nbsp;
                      {t('notifications.in-your-task')}
                    </Regular>
                  );
                }
              } else mainPart = <Regular>{t('notifications.has-edited-your-task')}</Regular>;
              break;
            }
            default: {
              mainPart = (
                <>
                  <Regular>{t('notifications.has')}</Regular>
                    &nbsp;
                  <BolderError>{t('notifications.deleted')}</BolderError>
                    &nbsp;
                  <Regular>{t('notifications.your-task')}</Regular>
                </>
              );
            }
          }
          return (
            <>
              {mainPart}
              &nbsp;
              <BolderPrimary>{ticket.ticket.title}</BolderPrimary>
            </>
          );
        }
        return null;
      }
      case (NotificationsTypeEnum.TICKET_COMMENT): {
        const { ticketComment } = notification.notification;
        let mainPart;
        const { title } = ticketComment.ticketComment.ticket;
        switch (ticketComment.type) {
          case (TicketCommentsNotificationsTypeEnum.CREATED): {
            mainPart = (
              <Regular>
                {t('notifications.has-left-a-comment')}
                {' '}
                {currentUser.isAdmin ? t('notifications.his') : t('notifications.your')}
                {' '}
                {t('notifications.task')}
              </Regular>
            );
            break;
          }
          default: {
            mainPart = <Regular>{t('notifications.left-you-a-comment-at')}</Regular>;
          }
        }

        return (
          <>
            {mainPart}
            &nbsp;
            <BolderPrimary>{title}</BolderPrimary>
          </>
        );
      }
      case (NotificationsTypeEnum.SUBSCRIPTION): {
        const { subscription } = notification.notification;
        const paymentFailedMsg = t('notifications.payment-failed-1');
        const paymentFailedMsgThreeTime = t('notifications.payment-failed-2');
        if (currentUser.isAdmin) {
          return (
            <>
              <Regular>
                {t('notifications.payment-for-user')}
              </Regular>
                &nbsp;
              <BolderPrimary>{`${author.firstname} ${author.lastname}`}</BolderPrimary>
                &nbsp;
              <Regular>{t('notifications.has')}</Regular>
                &nbsp;
              <BolderError>{t('notifications.failed')}</BolderError>
            </>
          );
        }
        switch (subscription.type) {
          case (SubscriptionNotificationsTypeEnum.SECOND_FAILED_PAYMENT_RETRY): {
            return <BolderError>{paymentFailedMsg}</BolderError>;
          }
          case (SubscriptionNotificationsTypeEnum.THIRD_FAILED_PAYMENT_RETRY): {
            return <BolderError>{paymentFailedMsg}</BolderError>;
          }
          default: {
            return <BolderError>{paymentFailedMsgThreeTime}</BolderError>;
          }
        }
      }
      case (NotificationsTypeEnum.USER_ACTION): {
        const { userAction } = notification.notification;
        switch (userAction.type) {
          case (UserActionsNotificationsTypeEnum.SELF_DELETED): {
            return (
              <>
                <Regular>{t('notifications.has')}</Regular>
                  &nbsp;
                <BolderError>{t('notifications.deleted')}</BolderError>
                  &nbsp;
                <Regular>{t('notifications.account')}</Regular>
              </>
            );
          }
          default: {
            if (currentUser.isAdmin) {
              return (
                <>
                  <Regular>
                    {t('notifications.the-user-account')}
                  </Regular>
                  &nbsp;
                  <BolderPrimary>{`${author.firstname} ${author.lastname}`}</BolderPrimary>
                  &nbsp;
                  <Regular>
                    {t('notifications.has-been-blocked')}
                  </Regular>
                </>
              );
            }
            return (
              <BolderError>
                {t('notifications.your-account-blocked')}
              </BolderError>
            );
          }
        }
      }
      default: {
        return null;
      }
    }
  };

  const renderDate = (date: Date) => {
    const { result, shouldTranslate } = parseDate(date);
    return shouldTranslate ? t(result) : result;
  };

  return (
    author != null ? (
      <ListItemWrapper onClick={parseAction()}>
        <UserIconWrapper>
          {
          // eslint-disable-next-line no-nested-ternary
          userImage.loading ?
            (
              <Spinner color="primary" />
            )
            :
            userImage && userImage.imgSrc ?
              (
                <NotificationsAvatar backgroundColor="white" size="30px">
                  <Avatar
                    alt="Account Icon"
                    src={userImage.imgSrc}
                    sx={{ width: 30, height: 30, margin: '0px auto' }}
                  />
                </NotificationsAvatar>
              ) :
              (
                <NotificationsAvatar backgroundColor="#EEEFFF" size="30px" sx={{ width: '30px', height: '30px' }}>
                  <Avatar
                    alt="Account Icon"
                    src={account}
                    sx={{ width: 20, height: 20, margin: '0px auto' }}
                  />
                </NotificationsAvatar>
              )
        }
        </UserIconWrapper>
        <Body>
          <AuthorStatusRow>
            <Author>{`${author.firstname} ${author.lastname}`}</Author>
            <StatusDate>
              {!seen && (
              <SIcon>
                <NotificationNotSeenIcon />
              </SIcon>
              )}
              <SDate>
                {renderDate(notification.notification.createdAt)}
              </SDate>
            </StatusDate>
          </AuthorStatusRow>
          <DescriptionDeleteRow sx={{ marginTop: '2%' }}>
            <DescriptionWrapper>
              {parseContent()}
            </DescriptionWrapper>
            <DeleteWrapper onClick={(e) => { e.stopPropagation(); handleDelete(notification.id); }}>
              <NotificationDeleteIcon />
            </DeleteWrapper>
          </DescriptionDeleteRow>
        </Body>
      </ListItemWrapper>
    )
      :
      null
  );
};
export default sListItem;
