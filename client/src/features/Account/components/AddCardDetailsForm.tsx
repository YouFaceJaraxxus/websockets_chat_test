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
} from './ui/AddCardDetailsFormStyle';
import { setPaymentMethodAsync } from '../../Auth/slices/paymentSlice';
import { useAppDispatch } from '../../../store/hooks';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const AddCardDetailsForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loadingCardValidation, setLoadingCardValidation] = useState(false);
  const stripe = useStripe();
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
        dispatch(setPaymentMethodAsync(id)).then((response) => {
          if (response.payload != null) {
            dispatch(
              openNotification({
                isOpen: true,
                messageBody: t('account.card-successfully-added'),
                severity: 'success',
              }),
            );
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
          messageBody: 'Your Name on Card is incomplete',
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
        <h2>{t('account.add-new-card')}</h2>
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
          {t('account.add-card')}
        </AddNewCardButtonStyled>
      </form>
    </FormHolderStyled>
  );
};

export default AddCardDetailsForm;
