import React from 'react';
import { useTranslation } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import CardDetailsForm from './components/CardDetailsForm';
import OrderDetails from './components/OrderDetails';
import {
  CardInfoRegisterCheckoutCol,
  CardOrderHolderStyled,
  CheckoutHolderStyled,
  CheckoutTitleStyled,
} from './ui/checkoutStyle';
import { LogoIcon } from '../../assets/icons';
import MyCards from '../Account/components/MyCards';
import stripeTestPromise from '../../services/common/stripe';

const Checkout = () => {
  const { t } = useTranslation();
  return (
    <CheckoutHolderStyled>
      <LogoIcon />
      <CheckoutTitleStyled>{t('account.checkout')}</CheckoutTitleStyled>
      <CardOrderHolderStyled>
        <Elements stripe={stripeTestPromise}>
          <CardInfoRegisterCheckoutCol>
            <MyCards />
            <CardDetailsForm />
          </CardInfoRegisterCheckoutCol>
          <OrderDetails />
        </Elements>
      </CardOrderHolderStyled>
    </CheckoutHolderStyled>
  );
};

export default Checkout;
