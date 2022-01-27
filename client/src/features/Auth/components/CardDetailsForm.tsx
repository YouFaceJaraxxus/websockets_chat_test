import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  AddNewCardButtonStyled,
  CardCvvWrapperStyled,
  CardExpiryWrapperStyled,
  CardInputWrapperStyled,
  ExpirationCvvHolderStyled,
  FormHolderStyled,
  InputCardHolderStyled,
  TableFormCardSpinner,
  TableFormCardSpinnerWrapper,
} from '../ui/cardDetailsFormStyle';
import {
  selectPaymentMethods,
  setDefaultPaymentMethodAsync,
  setPaymentMethodAsync,
} from '../slices/paymentSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const CardDetailsForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loadingCardValidation, setLoadingCardValidation] = useState(false);
  const stripe = useStripe();
  const userPaymentMethods = useAppSelector(selectPaymentMethods);
  const elements = useElements();
  const onSubmit = async (e) => {
    const cardHolderName = e.target.name.value;
    e.preventDefault();
    if (cardHolderName.length !== 0) {
      setLoadingCardValidation(true);
      const cardNumber = elements.getElement(CardNumberElement);
      const cardExpiry = elements.getElement(CardExpiryElement);
      const cardCvv = elements.getElement(CardCvcElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
        billing_details: {
          name: cardHolderName,
        },
      });
      if (!error) {
        const { id } = paymentMethod;
        dispatch(setPaymentMethodAsync(id)).then(async (response) => {
          if (response.payload != null) {
            dispatch(
              openNotification({
                isOpen: true,
                messageBody: t('account.card-successfully-added'),
                severity: 'success',
              }),
            );

            if (!userPaymentMethods.length) {
              await dispatch(setDefaultPaymentMethodAsync(id));
            }
          }
        });
        cardNumber.clear();
        cardExpiry.clear();
        cardCvv.clear();
        e.target.name.value = '';
        setLoadingCardValidation(false);
      } else if (error) {
        dispatch(
          openNotification({
            isOpen: true,
            messageBody: error.message,
            severity: 'error',
          }),
        );
        setLoadingCardValidation(false);
      }
    } else {
      dispatch(
        openNotification({
          isOpen: true,
          messageBody: t('card.name-on-card-incomplete'),
          severity: 'error',
        }),
      );
      setLoadingCardValidation(false);
    }
  };
  return (
    <FormHolderStyled>
      {loadingCardValidation ? (
        <TableFormCardSpinnerWrapper>
          <TableFormCardSpinner color="primary" />
        </TableFormCardSpinnerWrapper>
      ) : null}
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <h2>{t('card.card-details')}</h2>
        <CardInputWrapperStyled>
          <CardNumberElement
            options={{
              placeholder: t('card.card-number'),
              style: {
                base: {
                  iconColor: '#bdc3c7',
                  color: 'black',
                  fontWeight: 'normal',
                  fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                  fontSize: '20px',
                  fontSmoothing: 'antialiased',
                  ':-webkit-autofill': {
                    color: '#bdc3c7',
                  },
                  '::placeholder': {
                    color: '#bdc3c7',
                  },
                },
                invalid: {
                  iconColor: '#FFC7EE',
                  color: '#e74c3c',
                },
              },
            }}
          />
        </CardInputWrapperStyled>
        <InputCardHolderStyled
          name="name"
          id="name"
          placeholder={t('card.card-name')}
        />
        <ExpirationCvvHolderStyled>
          <CardExpiryWrapperStyled>
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    iconColor: '#bdc3c7',
                    color: 'black',
                    fontWeight: 'normal',
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '20px',
                    fontSmoothing: 'antialiased',
                    ':-webkit-autofill': {
                      color: '#bdc3c7',
                    },
                    '::placeholder': {
                      color: '#bdc3c7',
                    },
                  },
                  invalid: {
                    iconColor: '#FFC7EE',
                    color: '#e74c3c',
                  },
                },
              }}
            />
          </CardExpiryWrapperStyled>
          <CardCvvWrapperStyled>
            <CardCvcElement
              options={{
                placeholder: t('card.card-cvv'),
                style: {
                  base: {
                    iconColor: '#bdc3c7',
                    color: 'black',
                    fontWeight: 'normal',
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '20px',
                    fontSmoothing: 'antialiased',
                    ':-webkit-autofill': {
                      color: '#bdc3c7',
                    },
                    '::placeholder': {
                      color: '#bdc3c7',
                    },
                  },
                  invalid: {
                    iconColor: '#FFC7EE',
                    color: '#e74c3c',
                  },
                },
              }}
            />
          </CardCvvWrapperStyled>
        </ExpirationCvvHolderStyled>
        <AddNewCardButtonStyled type="submit">
          {t('card.card-add')}
        </AddNewCardButtonStyled>
      </form>
    </FormHolderStyled>
  );
};

export default CardDetailsForm;
