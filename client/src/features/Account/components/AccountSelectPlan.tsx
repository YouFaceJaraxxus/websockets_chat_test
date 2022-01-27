import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@material-ui/icons';
import {
  AccountSelectPlanWrapper,
} from './ui/AccountSelectPlanStyle';
import AccountSelectingPlans from './AccountSelectingPlans';
import AccountCheckout from './AccountCheckout';
import { AccountPlanTitle } from './ui/AccountPlanStyle';
import { IconWrapperPointer } from './ui/AccountCurrentPlanStyle';
import OrderCompleted from '../../../components/orderCompleted/OrderCompleted';

const CURRENT_PLAN_PAGE = 'currentPlan';
const SELECTING_PLANS_PAGE = 'selectingPlans';
const CHECKOUT_PAGE = 'checkout';
const AccountSelectPlan = ({
  setCurrentMyPlanPage,
}) => {
  const [currentPage, setCurrentPage] = useState(SELECTING_PLANS_PAGE);
  const { t } = useTranslation();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case (SELECTING_PLANS_PAGE): return (
        <AccountSelectingPlans setCurrentSelectPlanPage={setCurrentPage} />
      );
      case (CHECKOUT_PAGE): return (
        <AccountCheckout setCurrentSelectPlanPage={setCurrentPage} />
      );
      default: return (
        <OrderCompleted
          buttonAction={() => setCurrentMyPlanPage(CURRENT_PLAN_PAGE)}
          buttonText={t('account.go-to-my-plan')}
        />
      );
    }
  };

  const escapeLinter = () => {
    if (false) {
      setCurrentMyPlanPage(null);
    }
  };

  return (
    <>
      {
        currentPage === SELECTING_PLANS_PAGE && (
          <AccountPlanTitle>
            <IconWrapperPointer
              sx={{ paddingBottom: '0.4%', marginRight: '1%' }}
              onClick={() => setCurrentMyPlanPage(CURRENT_PLAN_PAGE)}
            >
              <ArrowBack />
            </IconWrapperPointer>
            {t('account.select-a-plan')}
          </AccountPlanTitle>
        )
      }
      <AccountSelectPlanWrapper onClick={escapeLinter}>
        {renderCurrentPage()}
      </AccountSelectPlanWrapper>
    </>
  );
};

export default AccountSelectPlan;
