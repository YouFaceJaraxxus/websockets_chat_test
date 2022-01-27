import { AxiosResponse } from 'axios';
import BaseService from '../../../services/common/BaseService';
import { IGetPaymentMethodsResponse } from '../models/getPaymentMethodsResponse';
import { IRemovePaymentMethodResponse } from '../models/removePaymentMethodResponse';
import { ISetDefaultPaymentMethodResponse } from '../models/setDefaultPaymentMethodResponse';

export interface SendOrderPayload {
  requiredConfirmation: boolean;
  paymentIntentId: string;
  userSubscriptions: any[];
}

const getPaymentMethods = async (
  query = {},
): Promise<IGetPaymentMethodsResponse> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user/payment_methods');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IGetPaymentMethodsResponse> =
    await baseService.get(url, {});
  return response.data;
};

const setPayment = async (payment_method, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user/payment_method');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(
    url,
    { payment_method },
    {},
  );
  return response.data;
};

const setDefaultPayment = async (
  default_payment_method: string,
  query = {},
): Promise<ISetDefaultPaymentMethodResponse> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user/payment_method');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ISetDefaultPaymentMethodResponse> =
    await baseService.put(url, { default_payment_method }, {});
  return response.data;
};

const removePaymentMethod = async (
  payment_method: string,
  query = {},
): Promise<IRemovePaymentMethodResponse> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user/payment_method');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IRemovePaymentMethodResponse> =
    await baseService.delete(url, { data: { payment_method } });
  return response.data;
};

const sendOrder = async (
  orderDetails,
  query = {},
): Promise<SendOrderPayload> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('subscription');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, orderDetails, {});
  return response.data;
};

const updateOrder = async (orderDetails?, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('subscription/update');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.put(url, orderDetails, {});
  return response.data;
};

const checkCoupon = async (coupon, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('subscription/check-coupon');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, coupon, {});
  return response.data;
};

const getUserMonthlySubStripeData = async () => {
  const baseService = new BaseService();
  const path = baseService.url.build('subscription/user/monthly/stripe-data');
  const url = BaseService.combine(path, '');
  const response: AxiosResponse = await baseService.get(url, {});
  return response.data;
};

export {
  setPayment,
  setDefaultPayment,
  sendOrder,
  updateOrder,
  getPaymentMethods,
  removePaymentMethod,
  checkCoupon,
  getUserMonthlySubStripeData,
};
