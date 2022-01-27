import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
} from './ui/orderDetailsPlanStyle';
import OrderDetailsTablePlan from './OrderDetailsTablePlan';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  OrderDetailsCreate,
  OrderDetailsUpdate,
  selectCheckoutDetails,
  selectPaymentConfirmationData,
  setSendOrderAsync,
  updateOrderAsync,
} from '../../Auth/slices/paymentSlice';
import { NavigateIcon } from '../../../assets/icons';
import { checkCoupon } from '../../Auth/services/paymentService';
import { selectUser } from '../../Auth/slices/authSlice';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import useConfirmPayment from '../../Payment/hooks/confirmPaymentHook';

const ORDER_COMPLETED = 'orderCompleted';
const SELECTING_PLANS_PAGE = 'selectingPlans';

enum CouponMsgColor {
  ERROR = '#e74c3c',
  SUCCESS = '#2ECC71',
}

const OrderDetailsPlan = ({ setCurrentSelectPlanPage }) => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const [couponAddMsg, setCouponAddMsg] = useState(null);

  const dispatch = useAppDispatch();
  const { payload: payloadData, execute } = useAppSelector(
    selectPaymentConfirmationData,
  );
  const { handleSubmit, control, getValues } = useForm();
  const checkoutDetails = useAppSelector(selectCheckoutDetails);

  const isUpdate = () => {
    let subscriptionId;
    checkoutDetails.forEach((item) => {
      if (item.type === 'MONTHLY') {
        subscriptionId = item.id;
      }
    });

    const monthly = user.subscriptions.find((item) => item.type === 'MONTHLY');

    if (
      monthly &&
        subscriptionId
    ) {
      return true;
    }

    return false;
  };

  const getUpdateType = (): 'upgrade' | 'downgrade' => {
    if (isUpdate()) {
      const newMonthly = checkoutDetails.find((item) => item.type === 'MONTHLY');
      const monthly = user.subscriptions.find((item) => item.type === 'MONTHLY');

      if (newMonthly.price > monthly.price) {
        return 'upgrade';
      }

      return 'downgrade';
    }

    return null;
  };

  /* const [update/!* , setUpdate *!/] = useState(isUpdate()); */
  const [updateType/* , setUpdateType */] = useState(getUpdateType());
  const [discount, setDiscount] = useState({
    couponName: '',
    percentage: 0,
    amountOff: 0,
    products: null,
    data: null,
  });

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

  const [loadingCardValidation, setLoadingCardValidation] = useState(false);
  const discountRequired = t('account.discount-code-required');
  const onSubmit = () => {
    const values = getValues();
    const { coupon } = values;

    checkCoupon({ coupon })
      .then((response) => {
        if (response != null) {
          /* eslint-disable @typescript-eslint/naming-convention */
          const { percent_off, id, amount_off } = response;
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
      })
      .catch(() => {
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
      setCurrentSelectPlanPage(ORDER_COMPLETED);
    },
    () => {
      setLoadingCardValidation(false);
      dispatch(openNotification({
        isOpen: true,
        severity: 'error',
        messageBody:
          t('account.something-wrong-confirm-payment'),
      }));
    },
  );

  const sendOrder = () => {
    setLoadingCardValidation(true);
    let subscriptionId: number;
    const addons: number[] = [];
    const coupon = discount.couponName;

    checkoutDetails.forEach((item) => {
      if (item.type === 'MONTHLY') {
        subscriptionId = item.id;
      } else {
        addons.push(item.id);
      }
    });

    if (
      user.subscriptions.some((item) => item.type === 'MONTHLY') &&
      subscriptionId
    ) {
      // checkoutDetails.forEach((detail) => {
      //   newSubscriptionId.push(detail.id);
      // });
      const orderDetails: OrderDetailsUpdate = {
        newSubscriptionId: subscriptionId,
        addons: addons.length ? addons : undefined,
        coupon: undefined,
      };

      if (coupon !== '') {
        orderDetails.coupon = coupon;
      }

      dispatch(updateOrderAsync(orderDetails)).then((response) => {
        if (!response.payload) {
          setLoadingCardValidation(false);
        }
      });
    } else {
      const items = [...addons];

      if (subscriptionId) {
        items.push(subscriptionId);
      }

      const orderDetails: OrderDetailsCreate = {
        items,
        coupon: undefined,
      };

      if (coupon !== '') {
        orderDetails.coupon = coupon;
      }

      dispatch(setSendOrderAsync(orderDetails)).then((response) => {
        if (!response.payload) {
          setLoadingCardValidation(false);
        }
      });
    }
  };
  const returnBack = () => {
    setCurrentSelectPlanPage(SELECTING_PLANS_PAGE);
  };
  return (
    <OrderDetailsHolder>
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
        <OrderDetailsTablePlan
          /* update={update} */
          checkoutDetails={checkoutDetails}
          discount={discount}
          updateType={updateType}
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

export default OrderDetailsPlan;
