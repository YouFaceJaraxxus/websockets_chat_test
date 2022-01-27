/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, FormControlLabel, Radio } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  IconWrapperPointer,
  MyCardsList,
  MyCardsListItem,
  MyCardLabelBody,
  MyCardsListItemBody,
  MyCardsListItemCardIcon,
  MyCardsListItemNumbers,
  NoPaymentMethods,
  MyCardsSpinnerWrapper,
  MyCardsSpinner,
  MyCardsTitle,
} from './ui/MyCardsStyle';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { CardIconGreen, CardIconRed, DeleteCardIcon } from '../../../assets/icons';
import { getPaymentMethodsAsync, removePaymentMethodAsync, setDefaultPaymentMethodAsync } from '../../Auth/slices/paymentSlice';
import { IPaymentMethodResponse } from '../../Auth/models/payment/paymentMethod';
import visa from '../../../assets/icons/visa.svg';
import mastercard from '../../../assets/icons/mastercard.svg';
import amex from '../../../assets/icons/amex.svg';
import discover from '../../../assets/icons/discover.svg';
import jcb from '../../../assets/icons/jcb.svg';
import dinersClub from '../../../assets/icons/diners.svg';
import unionPay from '../../../assets/icons/unionpay.svg';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const cardBrandMap = new Map([
  ['amex', amex],
  ['discover', discover],
  ['JCB', jcb],
  ['visa', visa],
  ['mastercard', mastercard],
  ['dinersClub', dinersClub],
  ['unionPay', unionPay],
]);

const MyCards = () => {
  const {
    paymentMethods,
    selectedPaymentMethod,
    isLoadingPayments,
  } = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const toggleNotification = (success: boolean, messageBody: string) => {
    if (success) {
      dispatch(openNotification({
        isOpen: true,
        messageBody,
        severity: 'success',
      }));
    }
  };

  const getUserCards = () => {
    dispatch(getPaymentMethodsAsync());
  };

  useEffect(() => {
    getUserCards();
  }, []);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
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

  const deleteCard = (payment: IPaymentMethodResponse) => {
    dispatch(removePaymentMethodAsync(payment.id))
      .then((response) => {
        if (response.payload) {
          toggleNotification(true, t('account.card-deleted'));
        }
      });
    closeConfirmDialog();
  };

  const openConfirmDeleteDialog = (payment: IPaymentMethodResponse) => {
    const confirmDialogConfig = {
      dialogMessage: t('account.delete-this-card'),
      actionText: t('account.delete'),
      IconComponent: CardIconRed,
      type: 'red',
      method: () => { deleteCard(payment); },
    };
    setConfirmDialog({
      open: true,
      ...confirmDialogConfig,
    });
  };

  const selectCard = (payment: IPaymentMethodResponse) => {
    dispatch(setDefaultPaymentMethodAsync(payment.id))
      .then((response) => {
        if (response.payload) {
          toggleNotification(true, t('account.default-payment-changed'));
        }
      });
    closeConfirmDialog();
  };

  const openConfirmSelectDialog = (payment: IPaymentMethodResponse) => {
    const confirmDialogConfig = {
      dialogMessage: t('account.make-this-card-primary'),
      actionText: t('account.confirm'),
      IconComponent: CardIconGreen,
      type: 'green',
      method: () => { selectCard(payment); },
    };
    setConfirmDialog({
      open: true,
      ...confirmDialogConfig,
    });
  };

  const handleSelection = (payment: IPaymentMethodResponse) => {
    openConfirmSelectDialog(payment);
  };

  const isSelected = (payment: IPaymentMethodResponse) => payment &&
  payment.id === selectedPaymentMethod?.id;
  const isFailed = (payment: IPaymentMethodResponse) => payment &&
  payment.failed === true;

  const renderBgColor = (payment: IPaymentMethodResponse) => (
    isFailed(payment) ?
      '#FFE3E4' :
      isSelected(payment) ?
        '#E1F7EB' : 'white');

  const renderToggleColor = (payment: IPaymentMethodResponse) => (
    isFailed(payment) ?
      'error' :
      'success');

  const renderCardIcon = (payment: IPaymentMethodResponse) => {
    const brand = payment?.card?.brand;
    if (brand) {
      const cardIcon = cardBrandMap.get(brand);
      if (cardIcon) {
        return (
          <Avatar
            alt="Card Icon"
            src={cardIcon}
            sx={{
              width: 60,
              height: 40,
              margin: '0px auto',
              borderRadius: '0',
              '@media (max-width:500px)': {
                width: '30px !important',
                height: '20px !important',
              },
              '@media (max-width:400px)': {
                width: '21px !important',
                height: '15px !important',
              },
            }}
          />
        );
      }
      return <CardIconGreen />;
    }
    return <CardIconGreen />;
  };

  return (
    <>
      <MyCardsTitle>{t('account.my-cards')}</MyCardsTitle>
      <MyCardsList>
        {
          isLoadingPayments ?
            (
              <MyCardsSpinnerWrapper>
                <MyCardsSpinner color="primary" />
              </MyCardsSpinnerWrapper>
            )
            :
            paymentMethods &&
          paymentMethods.length > 0 ?
              paymentMethods.map((payment) => (
                <MyCardsListItem key={payment.id}>
                  <MyCardLabelBody>
                    <FormControlLabel
                      sx={{ margin: 'auto auto auto 0' }}
                      value={payment.id}
                      control={(
                        <Radio
                          checked={isSelected(payment)}
                          color={renderToggleColor(payment)}
                        />
                      )}
                      label=""
                      onChange={() => { handleSelection(payment); }}
                    />
                    <MyCardsListItemBody
                      hasborder={!isSelected(payment)}
                      bgcolor={renderBgColor(payment)}
                    >
                      <MyCardsListItemNumbers>
                        XXXX XXXX XXXX
                        {' '}
                        {payment.card.last4}
                      </MyCardsListItemNumbers>
                      <MyCardsListItemCardIcon>
                        {
                      renderCardIcon(payment)
                    }
                      </MyCardsListItemCardIcon>
                    </MyCardsListItemBody>
                  </MyCardLabelBody>
                  {
                !isSelected(payment) &&
                (
                  <IconWrapperPointer
                    sx={{ width: '15%' }}
                    onClick={() => { openConfirmDeleteDialog(payment); }}
                  >
                    <DeleteCardIcon />
                  </IconWrapperPointer>
                )
              }
                </MyCardsListItem>
              ))
              : (
                <NoPaymentMethods>
                  {t('account.no-payment-methods-available')}
                </NoPaymentMethods>
              )
}
      </MyCardsList>
      {confirmDialog.open && (
      <ConfirmationDialog
        isOpen={confirmDialog.open}
        handleAcceptConfirmation={confirmDialog.method}
        handleCloseConfirmation={closeConfirmDialog}
        confirmationTitle={confirmDialog.dialogMessage}
        icon={<confirmDialog.IconComponent />}
        approveText={confirmDialog.actionText}
        declineText={t('account.cancel')}
        type={confirmDialog.type}
      />
      )}
    </>
  );
};

export default MyCards;
