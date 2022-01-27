import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiscountModal from './DiscountModal';
import { checkCoupon } from '../../Auth/services/paymentService';
import { updateOrderAsync } from '../../Auth/slices/paymentSlice';
import { useAppDispatch } from '../../../store/hooks';
import PaymentPlans from './PaymentPlans';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const AccountSelectingPlans = ({ setCurrentSelectPlanPage }) => {
  const [discount, setDiscount] = useState({
    couponName: '',
    percentage: 0,
    amountOff: 0,
    products: null,
    data: null,
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const handleDiscountCodeSubmit = () => {
    const coupon = discountCode;
    checkCoupon({ coupon }).then((response) => {
      if (response != null) {
        /* eslint-disable @typescript-eslint/naming-convention */

        dispatch(
          updateOrderAsync({
            coupon,
          }),
        ).then((data) => {
          const { percent_off, id, amount_off, name } = response;
          if (data.payload) {
            setDiscount({
              couponName: id,
              percentage: percent_off,
              amountOff: amount_off ? amount_off / 100 : null,
              products: response?.applies_to?.products,
              data: response,
            });
            const notificationMessageBody = `${t('account.valid-coupon-part-1')} ${name} ${t('account.valid-coupon-part-2')}`;
            dispatch(openNotification({
              isOpen: true,
              messageBody: notificationMessageBody,
              severity: 'success',
            }));
          }
        });
        setDiscountModalOpen(false);
      }
    });
  };

  return (
    <>
      <PaymentPlans
        setCurrentSelectPlanPage={setCurrentSelectPlanPage}
        setDiscountModalOpen={setDiscountModalOpen}
        discount={discount}
      />

      {discountModalOpen && (
        <DiscountModal
          open={discountModalOpen}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          handleClose={() => setDiscountModalOpen(false)}
          handleSubmit={handleDiscountCodeSubmit}
        />
      )}
    </>
  );
};

export default AccountSelectingPlans;
