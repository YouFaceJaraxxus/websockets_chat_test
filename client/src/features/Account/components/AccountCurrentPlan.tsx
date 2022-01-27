/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ISubscription } from '../../Auth/models/payment/subscriptionModel';
import {
  cancelSubscriptionAsync,
  getUserSubscriptionsAsync,
  retrySubscriptionAsync,
} from '../../Auth/slices/authSlice';
import {
  TableSpinner,
  TableSpinnerWrapper,
} from '../../Dashboard/ui/TableDataStyle';
import {
  CurrentPlanWrapper,
  NoSubscriptions,
  SubscriptionRow,
  SubscriptionStatus,
  SubscriptionTitle,
  SubscriptionItem,
  SubscriptionWrapper,
  SubscriptionsTasksLeft,
  TasksLeftText,
  SubscriptionType,
  CancelSubscription,
  CancelSubscriptionText,
  CanceledSubscriptionNote,
  IconWrapper,
  AddOnTitle,
  ChangePlanButton,
  ChangePlanDisabledButton,
  RetryPayment,
  RetryPaymentInfo,
  RetryPaymentText,
  RetryPaymentAction,
  RetryPaymentButtonText,
  RetrySubscriptionSpinner,
} from './ui/AccountCurrentPlanStyle';
import checklist from '../../../assets/icons/checklist.svg';
import {
  CancelSubscriptionIcon,
  DiscountFailedRetryIcon,
  DiscountFailedWarningIcon,
} from '../../../assets/icons';
import { getTasksAsync } from '../../Dashboard/models/tasks/tasksSlice';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { AccountPlanTitle } from './ui/AccountPlanStyle';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import useConfirmPayment from '../../Payment/hooks/confirmPaymentHook';
import {
  selectPaymentConfirmationData,
  updateConfirmationData,
} from '../../Auth/slices/paymentSlice';
import { SendOrderPayload } from '../../Auth/services/paymentService';

const MONTHLY = 'MONTHLY';
const ONE_TIME = 'ONE_TIME';
const ACTIVE = 'active';
const SELECT_PLAN_PAGE = 'selectPlan';
const AccountCurrentPlan = ({ setCurrentMyPlanPage }) => {
  const { t } = useTranslation();
  const { payload: payloadData, execute } = useAppSelector(
    selectPaymentConfirmationData,
  );
  const { userSubscriptions, isLoading, isRetryingSubscription } =
    useAppSelector((state) => state.auth);
  const { count } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const [isChangePlanDisabled, setIsChangePlanDisabled] = useState(false);

  const getUserSubscriptions = () => {
    dispatch(getUserSubscriptionsAsync()).then((response) => {
      if (response.payload) {
        const subs = response.payload as ISubscription[];
        subs.forEach((sub) => {
          if (
            sub.type === MONTHLY &&
            sub.users_subscriptions.canceledAt != null
          ) {
            setIsChangePlanDisabled(true);
          }
        });
      }
    });
  };

  const activeTasksFilter = {
    isBlocked: false,
    dateArchived: false,
    statusId: 2,
  };

  useEffect(() => {
    dispatch(getTasksAsync({ where: activeTasksFilter }));
    getUserSubscriptions();
  }, []);

  const renderTasksLeft = (subscription: ISubscription) => {
    const subtract = count || 0;
    return subscription.type === MONTHLY
      ? subscription.maxActiveTickets - subtract
      : 0;
  };

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    cancelText: '',
    IconComponent: null,
    type: '',
    method: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false,
    });
  };

  const cancelSubscription = (subscription: ISubscription) => {
    dispatch(cancelSubscriptionAsync(subscription.id)).then((response) => {
      if (response.payload) {
        dispatch(
          openNotification({
            isOpen: true,
            messageBody: t('account.subscription-canceled'),
            severity: 'success',
          }),
        );
        getUserSubscriptions();
        setIsChangePlanDisabled(true);
      }
    });
    closeConfirmDialog();
  };

  const openConfirmCancelDialog = (subscription: ISubscription) => {
    const confirmDialogConfig = {
      dialogMessage: t('account.cancel-subscription'),
      actionText: t('global.yes'),
      cancelText: t('global.no'),
      IconComponent: CancelSubscriptionIcon,
      type: 'red',
      method: () => {
        cancelSubscription(subscription);
      },
    };
    setConfirmDialog({
      open: true,
      ...confirmDialogConfig,
    });
  };

  const retrySubscription = () => {
    dispatch(retrySubscriptionAsync()).then(
      (response: any & SendOrderPayload) => {
        if (response.payload) {
          dispatch(updateConfirmationData(response.payload));
        }
      },
    );
  };

  const renderSubscription = (subscription: ISubscription) => {
    if (subscription.users_subscriptions.status !== ACTIVE) return null;
    switch (subscription.type) {
      case ONE_TIME:
      case MONTHLY:
        return (
          <>
            <SubscriptionRow
              sx={{
                marginBottom: '20px',
                '@media (max-width:500px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <SubscriptionTitle>{subscription.name}</SubscriptionTitle>
              <SubscriptionStatus>{t('account.active-uppercase')}</SubscriptionStatus>
            </SubscriptionRow>
            <SubscriptionRow sx={{ paddingBottom: '10px' }}>
              <SubscriptionsTasksLeft>
                <Avatar
                  alt="Check List Icon"
                  src={checklist}
                  sx={{
                    width: 25,
                    height: 25,
                    marginRight: '5%',
                    paddingBottom: '2%',
                  }}
                />
                <TasksLeftText>
                  {renderTasksLeft(subscription)}
                  {' '}
                  {t('account.tasks-left')}
                </TasksLeftText>
              </SubscriptionsTasksLeft>
              <SubscriptionType>
                {subscription.type === ONE_TIME
                  ? t('account.one-time-payment')
                  : t('account.monthly-payment')}
              </SubscriptionType>
            </SubscriptionRow>
          </>
        );
      default:
        return (
          <SubscriptionRow>
            <AddOnTitle>
              +&nbsp;
              {subscription.name}
            </AddOnTitle>
          </SubscriptionRow>
        );
    }
  };

  useConfirmPayment(
    payloadData,
    execute,
    () => {
      dispatch(
        openNotification({
          isOpen: true,
          messageBody: t('account.payment-successful'),
          severity: 'success',
        }),
      );
    },
    () => {
      dispatch(
        openNotification({
          isOpen: true,
          messageBody: t('account.retry-payment-failed'),
          severity: 'error',
        }),
      );
    },
  );

  const renderCanceledSubscriptionNote = (validTo: Date) => `${t('account.canceled-sub-note')} ${moment(validTo).format(
    'DD/MM/YYYY',
  )}`;

  return (
    <>
      <AccountPlanTitle>{t('account.current-plan')}</AccountPlanTitle>
      <CurrentPlanWrapper>
        {isLoading ? (
          <TableSpinnerWrapper>
            <TableSpinner color="primary" />
          </TableSpinnerWrapper>
        ) : userSubscriptions != null && userSubscriptions.length > 0 ? (
          userSubscriptions.map(
            (subscription) => subscription.users_subscriptions.status === ACTIVE && (
            <SubscriptionItem key={subscription.id}>
              <SubscriptionWrapper>
                {renderSubscription(subscription)}
              </SubscriptionWrapper>
              {subscription.type === MONTHLY &&
                    subscription?.users_subscriptions?.paymentFailed && (
                      <RetryPayment>
                        <RetryPaymentInfo>
                          <IconWrapper
                            sx={{ marginRight: '2%', paddingBottom: '1px' }}
                          >
                            <DiscountFailedWarningIcon />
                          </IconWrapper>
                          <RetryPaymentText>
                            {t('account.payment-failed-please-retry')}
                          </RetryPaymentText>
                        </RetryPaymentInfo>
                        <RetryPaymentAction onClick={retrySubscription}>
                          {isRetryingSubscription ? (
                            <RetrySubscriptionSpinner color="primary" />
                          ) : (
                            <>
                              <IconWrapper sx={{ paddingBottom: '1px' }}>
                                <DiscountFailedRetryIcon />
                              </IconWrapper>
                              <RetryPaymentButtonText>
                                {t('account.retry-payment')}
                              </RetryPaymentButtonText>
                            </>
                          )}
                        </RetryPaymentAction>
                      </RetryPayment>
              )}

              {subscription?.type === MONTHLY &&
                    subscription?.users_subscriptions?.canceledAt == null && (
                      <CancelSubscription
                        onClick={() => {
                          openConfirmCancelDialog(subscription);
                        }}
                      >
                        <IconWrapper
                          sx={{ marginRight: '1%', paddingBottom: '1px' }}
                        >
                          <CancelSubscriptionIcon width={22} height={18} />
                        </IconWrapper>
                        <CancelSubscriptionText>
                          {t('account.cancel-subscription')}
                        </CancelSubscriptionText>
                      </CancelSubscription>
              )}
              {subscription?.type === MONTHLY &&
                    subscription?.users_subscriptions?.canceledAt != null && (
                      <CanceledSubscriptionNote>
                        {renderCanceledSubscriptionNote(
                          subscription.users_subscriptions.validTo,
                        )}
                      </CanceledSubscriptionNote>
              )}
            </SubscriptionItem>
            ),
          )
        ) : (
          <NoSubscriptions>{t('account.no-user-subscriptions-available')}</NoSubscriptions>
        )}
        {
          isChangePlanDisabled ?
            (
              <Tooltip
                title={t('account.cant-change-plan')}
                placement="top"
                arrow
              >
                <ChangePlanDisabledButton
                  type="button"
                >
                  {t('account.change-plan')}
                </ChangePlanDisabledButton>
              </Tooltip>
            )
            :
            (
              <ChangePlanButton
                type="button"
                onClick={() => {
                  if (!isChangePlanDisabled)setCurrentMyPlanPage(SELECT_PLAN_PAGE);
                }}
              >
                {t('account.change-plan')}
              </ChangePlanButton>
            )
        }
      </CurrentPlanWrapper>
      {confirmDialog.open && (
        <ConfirmationDialog
          isOpen={confirmDialog.open}
          handleAcceptConfirmation={confirmDialog.method}
          handleCloseConfirmation={closeConfirmDialog}
          confirmationTitle={confirmDialog.dialogMessage}
          icon={<confirmDialog.IconComponent />}
          approveText={confirmDialog.actionText}
          declineText={confirmDialog.cancelText}
          type={confirmDialog.type}
        />
      )}
    </>
  );
};
export default AccountCurrentPlan;
