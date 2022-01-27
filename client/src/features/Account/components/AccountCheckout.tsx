import React from 'react';
import { AccountCheckoutWrapper } from './ui/AccountCheckoutStyle';
import AccountPaymentDetailsCheckout from './AccountPaymentDetailsCheckout';

const AccountCheckout = ({ setCurrentSelectPlanPage }) => {
  const escapeLinter = () => {
    if (false) {
      setCurrentSelectPlanPage(null);
    }
  };
  return (
    <>
      <AccountCheckoutWrapper onClick={escapeLinter}>
        <AccountPaymentDetailsCheckout setCurrentSelectPlanPage={setCurrentSelectPlanPage} />
      </AccountCheckoutWrapper>
    </>
  );
};
export default AccountCheckout;
