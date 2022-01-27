import { useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { ISubscription } from '../../Auth/models/payment/subscriptionModel';
import { getUserSubscriptionsAsync } from '../../Auth/slices/authSlice';
import { useAppDispatch } from '../../../store/hooks';
import { resetConfirmationData } from '../../Auth/slices/paymentSlice';

const useConfirmPayment = async (
  payload: {
    requiredConfirmation: boolean;
    paymentIntentId: string;
    userSubscriptions: ISubscription[];
  },
  getData: boolean,
  success?: (...any) => void,
  errorCallback?: (...any) => void,
  reloadSubs = true,
): Promise<void> => {
  const dispatch = useAppDispatch();
  const stripe = useStripe();

  const test = async () => {
    if (payload.requiredConfirmation) {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        payload.paymentIntentId,
      );

      if (reloadSubs) {
        await dispatch(getUserSubscriptionsAsync());
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        success();
      } else {
        errorCallback();
      }

      if (error) {
        if (errorCallback) {
          errorCallback();
        }
      }
    } else {
      if (reloadSubs) {
        await dispatch(getUserSubscriptionsAsync());
      }

      success();
    }
    dispatch(resetConfirmationData());
  };

  useEffect(() => {
    if (getData) {
      test();
    }
  }, [getData, payload]);
};

export default useConfirmPayment;
