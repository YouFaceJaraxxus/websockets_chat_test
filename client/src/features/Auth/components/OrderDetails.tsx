import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import {
  ButtonApplyCodeStyled,
  ButtonBackSolutionsStyled,
  ButtonsOrderHolderStyled,
  DiscountCodeHolderStyled,
  OrderDetailsHolder,
  OrderDetailsHolderStyled,
  TableFormCardSpinner,
  TableFormCardSpinnerWrapper,
} from '../ui/orderDetailsStyle';
import OrderDetailsTable from './OrderDetailsTable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectCheckoutDetails,
  selectPaymentConfirmationData,
  setSendOrderAsync,
} from '../slices/paymentSlice';
import { NavigateIcon } from '../../../assets/icons';
import {
  ORDERCOMPLETEDSTEP_PATH,
  PAYMENT_PATH,
} from '../../../routes/path-constants';
import { checkCoupon } from '../services/paymentService';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import useConfirmPayment from '../../Payment/hooks/confirmPaymentHook';

enum CouponMsgColor {
  ERROR = '#e74c3c',
  SUCCESS = '#2ECC71',
}

const OrderDetails = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { payload: payloadData, execute } = useAppSelector(
    selectPaymentConfirmationData,
  );
  const [couponAddMsg, setCouponAddMsg] = useState(null);

  const { handleSubmit, control, getValues } = useForm();
  const checkoutDetails = useAppSelector(selectCheckoutDetails);
  const [discount, setDiscount] = useState({
    couponName: '',
    percentage: 0,
    amountOff: 0,
    products: null,
    data: null,
  });
  const [loadingCardValidation, setLoadingCardValidation] = useState(false);
  const discountRequired = t('account.discount-code-required');

  const generateCouponMessage = (couponData) => {
    const options: any = {};
    if (couponData.duration === 'repeating') {
      options.months = couponData.duration_in_months;
    }

    const message = t(`couponCheck.${couponData.duration}`, options);

    return message;
  };

  const hasApplicableProducts = (products) => checkoutDetails.find((row) => {
    if (products && products.length &&
        products.some((item) => item === row.productId)) {
      return true;
    } if (!products) {
      return true;
    }

    return false;
  });

  const onSubmit = () => {
    const values = getValues();
    const { coupon } = values;
    checkCoupon({ coupon }).then((response) => {
      if (response != null) {
        /* eslint-disable @typescript-eslint/naming-convention */
        const { percent_off, id, amount_off, name: couponName } = response;
        const notificationMessageBody = `${t('account.valid-coupon-part-1')} ${couponName} ${t('account.valid-coupon-part-2')}`;
        dispatch(openNotification({
          isOpen: true,
          messageBody: notificationMessageBody,
          severity: 'success',
        }));
        setDiscount({
          couponName: id,
          percentage: percent_off,
          amountOff: amount_off ? amount_off / 100 : null,
          products: response?.applies_to?.products,
          data: response,
        });
        if (hasApplicableProducts(response?.applies_to?.products)) {
          const cpnMsg = generateCouponMessage(response);

          if (cpnMsg) {
            setCouponAddMsg({
              color: CouponMsgColor.SUCCESS,
              message: cpnMsg,
            });
          }
        } else {
          setCouponAddMsg({
            color: CouponMsgColor.ERROR,
            message: t('couponCheck.no-applicable-products'),
          });
        }
      }
    }).catch(() => {
      setDiscount({
        couponName: '',
        percentage: 0,
        amountOff: 0,
        products: null,
        data: null,
      });
      setCouponAddMsg({
        color: CouponMsgColor.ERROR,
        message: t('account.invalid-coupon'),
      });
    });
  };

  useConfirmPayment(
    payloadData,
    execute,
    () => {
      setLoadingCardValidation(false);
      history.push(ORDERCOMPLETEDSTEP_PATH);
    },
    () => {
      setLoadingCardValidation(false);
      dispatch(openNotification({
        isOpen: true,
        severity: 'error',
        messageBody: t('account.something-went-wrong-pay'),
      }));
    },
    false,
  );

  const sendOrder = () => {
    setLoadingCardValidation(true);
    const items = [];
    const coupon = discount.couponName;
    checkoutDetails.forEach((detail) => {
      items.push(detail.id);
    });
    let orderDetails;
    if (coupon !== '') {
      orderDetails = {
        items,
        coupon,
      };
    } else {
      orderDetails = {
        items,
      };
    }
    dispatch(setSendOrderAsync(orderDetails)).then((response) => {
      if (!response.payload) {
        setLoadingCardValidation(false);
      }
    });
  };

  const returnBack = () => {
    history.push(PAYMENT_PATH);
  };

  return (
    <OrderDetailsHolder type="account">
      {loadingCardValidation ? (
        <TableFormCardSpinnerWrapper>
          <TableFormCardSpinner color="primary" />
        </TableFormCardSpinnerWrapper>
      ) : null}
      <DiscountCodeHolderStyled>
        <h2>{t('account.your-discount-code')}</h2>
        <form
          noValidate
          autoComplete="off"
          style={{ display: 'flex', alignItems: 'stretch', gap: '10px' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="coupon"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={onChange}
                fullWidth
                label={t('account.your-discount-code')}
                id="outlined-basic"
              />
            )}
            rules={{
              required: discountRequired,
            }}
          />
          <ButtonApplyCodeStyled type="submit">
            {t('account.apply-code')}
          </ButtonApplyCodeStyled>
        </form>
        {couponAddMsg && (
        <p style={{ color: couponAddMsg.color, fontSize: '13px' }}>{couponAddMsg.message}</p>
        )}
      </DiscountCodeHolderStyled>
      <OrderDetailsHolderStyled>
        <h2>{t('account.order-details')}</h2>
        <OrderDetailsTable
          checkoutDetails={checkoutDetails}
          discount={discount}
        />
      </OrderDetailsHolderStyled>
      <ButtonsOrderHolderStyled>
        <ButtonBackSolutionsStyled type="submit" onClick={returnBack}>
          {t('account.back-to-solutions')}
        </ButtonBackSolutionsStyled>
        <ButtonApplyCodeStyled type="submit" onClick={sendOrder}>
          {t('account.make-order')}
          <NavigateIcon />
        </ButtonApplyCodeStyled>
      </ButtonsOrderHolderStyled>
    </OrderDetailsHolder>
  );
};

export default OrderDetails;
