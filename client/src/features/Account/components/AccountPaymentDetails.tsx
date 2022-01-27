import * as React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { AccountPaymentDetailsWrapper } from './ui/AccountPaymentDetailsStyle';
import MyCards from './MyCards';
import AddCardDetailsForm from './AddCardDetailsForm';
import stripeTestPromise from '../../../services/common/stripe';

const AccountPaymentDetails = ({
  type = 'multi',
}) => (
  <AccountPaymentDetailsWrapper type={type}>
    <MyCards />
    <Elements stripe={stripeTestPromise}>
      <AddCardDetailsForm />
    </Elements>
  </AccountPaymentDetailsWrapper>
);

export default AccountPaymentDetails;
