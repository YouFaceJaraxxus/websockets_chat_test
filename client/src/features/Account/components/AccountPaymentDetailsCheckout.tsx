import * as React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { CompletePaymentDetailsHolderStyled } from './ui/AccountPaymentDetailsStyle';
import OrderDetailsPlan from './OrderDetailsPlan';
import AccountPaymentDetails from './AccountPaymentDetails';
import stripeTestPromise from '../../../services/common/stripe';

const AccountPaymentDetailsCheckout = ({
  setCurrentSelectPlanPage,
}) => (
  <CompletePaymentDetailsHolderStyled>
    <AccountPaymentDetails />
    <Elements stripe={stripeTestPromise}>
      <OrderDetailsPlan setCurrentSelectPlanPage={setCurrentSelectPlanPage} />
    </Elements>
  </CompletePaymentDetailsHolderStyled>
);

export default AccountPaymentDetailsCheckout;
