import React from 'react';
import OrderCompleted from '../../../components/orderCompleted/OrderCompleted';

const OrderCompletedWrapper = ({
  buttonAction,
  buttonText,
}) => (
  <OrderCompleted buttonAction={buttonAction} buttonText={buttonText} />
);

export default OrderCompletedWrapper;
