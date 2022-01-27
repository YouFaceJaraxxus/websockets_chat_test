import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  OrderCompleteWrapper,
  OrderCompleteTitle,
  OrderCompleteImageWrapper,
  OrderCompleteButton,
} from './OrderCompletedStyle';
import orderComplete from '../../assets/icons/orderCompletedImage.png';
import { useAppDispatch } from '../../store/hooks';
import { getUserSubscriptionsAsync } from '../../features/Auth/slices/authSlice';

const OrderCompleted = ({
  buttonAction,
  buttonText,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (

    <OrderCompleteWrapper>
      <OrderCompleteTitle>
        {t('order-completed.order-completed')}
      </OrderCompleteTitle>
      <OrderCompleteImageWrapper>
        <img src={orderComplete} alt="Order complete" />
      </OrderCompleteImageWrapper>
      <OrderCompleteButton onClick={() => {
        dispatch(getUserSubscriptionsAsync()).then(() => buttonAction());
      }}
      >
        {buttonText}
      </OrderCompleteButton>
    </OrderCompleteWrapper>
  );
};

export default OrderCompleted;
