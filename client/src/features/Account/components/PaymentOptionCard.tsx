import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { CardIconGreen, GreenIcon } from '../../../assets/icons/index';
import {
  ActivePackageStyled,
  DiscountCodeHolder,
  DiscountNamePercentHolder,
  LastElementHolder,
  OptionImageHolderStyled,
  OptionNameStyled,
  OptionPriceStyled,
  OptionValuesHolderStyled,
  PaymentOptionStyled,
} from './ui/PaymentOptionCardStyle';
import { selectActiveSubscription } from '../../Auth/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { checkCoupon } from '../../Auth/services/paymentService';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { priceFormatter } from '../../../common/formatter';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const PaymentOptionCard = ({
  price,
  name,
  icon,
  options,
  subscription,
  setSelectedPackages,
  setActiveCard,
  activeCard,
  setDiscountModalOpen,
  discount,
  scrollOnClick,
}) => {
  const userSubscriptions = useAppSelector(selectActiveSubscription);
  const [coupon, setCoupon] = useState(discount);
  const { t } = useTranslation();
  const [confirmUpdateDialog, setConfirmUpdateDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
    type: '',
    method: null,
  });

  const dispatch = useAppDispatch();

  const closeConfirmUpdateDialog = () => {
    setConfirmUpdateDialog({
      ...confirmUpdateDialog,
      open: false,
    });
  };

  const addPackage = async (monthly) => {
    setActiveCard(subscription);
    scrollOnClick();
    await setSelectedPackages(subscription);
    closeConfirmUpdateDialog();

    if (monthly) {
      dispatch(openNotification({
        isOpen: true,
        severity: 'success',
        messageBody: t('account.plan-changed'),
      }));
    }
  };

  const openConfirmUpdateDialog = () => {
    const monthly = userSubscriptions.find((item) => {
      if (item.type === 'MONTHLY') {
        return item;
      }
      return false;
    });

    if (monthly) {
      if (monthly.id !== subscription.id) {
        const confirmDialogConfig = {
          dialogMessage:
              monthly.price > subscription.price
                ? t('account.selected-plan-change-lower')
                : t('account.selected-plan-change-higher'),
          actionText: t('account.confirm'),
          IconComponent: CardIconGreen,
          type: 'green',
          method: () => {
            addPackage(monthly);
          },
        };
        setConfirmUpdateDialog({
          open: true,
          ...confirmDialogConfig,
        });
      }
    } else {
      addPackage(monthly);
    }
  };

  const openDiscountModal = () => {
    setDiscountModalOpen(true);
  };

  useEffect(() => {
    const monthly = userSubscriptions.find((item) => {
      if (item.type === 'MONTHLY' && item.name === name) {
        return item;
      }

      return false;
    });

    if (monthly && monthly.users_subscriptions.coupon) {
      checkCoupon({ coupon: monthly.users_subscriptions.coupon }).then(
        (response) => {
          if (response != null) {
            /* eslint-disable @typescript-eslint/naming-convention */
            const { percent_off, id, amount_off } = response;
            setCoupon({
              couponName: id,
              percentage: percent_off,
              amountOff: amount_off ? amount_off / 100 : null,
              products: response?.applies_to?.products,
              data: response,
            });
          }
        },
      );
    }
  }, []);

  return (
    <PaymentOptionStyled
      className={
        activeCard?.name === name ||
        (userSubscriptions.length && userSubscriptions[0].name === name)
          ? 'active'
          : null
      }
      onClick={openConfirmUpdateDialog}
    >
      <OptionImageHolderStyled>{icon}</OptionImageHolderStyled>
      <OptionNameStyled>{name}</OptionNameStyled>
      <OptionPriceStyled>
        {priceFormatter.format(price)}
        /mo
      </OptionPriceStyled>
      {options &&
        options.map((option) => (
          <OptionValuesHolderStyled>
            <div>{option.icon}</div>
            <p>{option.text}</p>
          </OptionValuesHolderStyled>
        ))}
      <LastElementHolder>
        {userSubscriptions.length && userSubscriptions[0].name === name ? (
          <DiscountCodeHolder>
            <p>{t('account.have-a-discount-code')}</p>
            <button
              type="submit"
              onClick={(e) => {
                openDiscountModal();
                e.stopPropagation();
              }}
            >
              {t('account.apply-here')}
            </button>
          </DiscountCodeHolder>
        ) : null}

        {(coupon?.couponName || discount?.couponName) &&
        userSubscriptions.length &&
        userSubscriptions[0].name === name ? (
          <DiscountNamePercentHolder>
            <p>
              {discount.couponName.length
                ? discount.couponName
                : coupon.couponName}
            </p>
            {/* eslint-disable-next-line no-nested-ternary */}
            {(discount.percentage || coupon.percentage) &&
            !discount.amountOff ? (
              <p>
                -
                {discount.percentage ? discount.percentage : coupon.percentage}
                %
              </p>
              ) : (discount.amountOff || coupon.amountOff) &&
              !discount.percentage ? (
                <p>
                  -
                  {discount.amountOff
                    ? priceFormatter.format(discount.amountOff)
                    : priceFormatter.format(coupon.amountOff)}
                </p>
                ) : null}
          </DiscountNamePercentHolder>
          ) : null}
        {userSubscriptions.length && userSubscriptions[0].name === name ? (
          <ActivePackageStyled>
            <GreenIcon />
            {t('account.currently-active')}
          </ActivePackageStyled>
        ) : (
          <Button
            variant="contained"
            type="submit"
          >
            {t('account.select-package')}
          </Button>
        )}
      </LastElementHolder>
      {confirmUpdateDialog.open && (
        <ConfirmationDialog
          isOpen={confirmUpdateDialog.open}
          handleAcceptConfirmation={confirmUpdateDialog.method}
          handleCloseConfirmation={closeConfirmUpdateDialog}
          confirmationTitle={confirmUpdateDialog.dialogMessage}
          icon={<confirmUpdateDialog.IconComponent />}
          approveText={confirmUpdateDialog.actionText}
          declineText={t('account.cancel')}
          type={confirmUpdateDialog.type}
        />
      )}
    </PaymentOptionStyled>
  );
};

export default PaymentOptionCard;
