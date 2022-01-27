import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { AccountPlanWrapper } from './ui/AccountPlanStyle';
import AccountCurrentPlan from './AccountCurrentPlan';
import AccountSelectPlan from './AccountSelectPlan';
import stripeTestPromise from '../../../services/common/stripe';

const CURRENT_PLAN_PAGE = 'currentPlan';
const SELECT_PLAN_PAGE = 'selectPlan';
const AccountPaymentDetails = () => {
  const [currentPage, setCurrentPage] = useState(CURRENT_PLAN_PAGE);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case CURRENT_PLAN_PAGE:
        return (
          <Elements stripe={stripeTestPromise}>
            <AccountCurrentPlan setCurrentMyPlanPage={setCurrentPage} />
          </Elements>
        );
      case SELECT_PLAN_PAGE:
        return (
          <>
            <AccountSelectPlan setCurrentMyPlanPage={setCurrentPage} />
          </>
        );
      default:
        return (
          <>
            <AccountCurrentPlan setCurrentMyPlanPage={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <>
      <AccountPlanWrapper>{renderCurrentPage()}</AccountPlanWrapper>
    </>
  );
};

export default AccountPaymentDetails;
