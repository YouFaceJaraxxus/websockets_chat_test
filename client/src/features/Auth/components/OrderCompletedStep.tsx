import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../ui/style';
import { LogoIcon } from '../../../assets/icons/index';
import OrderCompleted from '../../../components/orderCompleted/OrderCompleted';
import { DASHBOARD_PATH } from '../../../routes/path-constants';
import { useAppDispatch } from '../../../store/hooks';
import { getUserSubscriptionsAsync } from '../slices/authSlice';

const OrderCompletedStep = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { holder } = useStyles();
  const dispatch = useAppDispatch();

  const redirectToDashboard = () => {
    dispatch(getUserSubscriptionsAsync())
      .then((response) => {
        if (response.payload) {
          history.push(DASHBOARD_PATH);
        }
      });
  };

  return (
    <div className={holder}>
      <LogoIcon />
      <OrderCompleted
        buttonText={t('personal.continue')}
        buttonAction={redirectToDashboard}
      />
    </div>
  );
};
export default OrderCompletedStep;
