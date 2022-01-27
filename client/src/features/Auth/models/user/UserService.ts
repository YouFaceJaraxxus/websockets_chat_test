import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { IGetUsersResponse } from '../../../Users/models/getUsersResponse';
import { ISubscription } from '../payment/subscriptionModel';
import { IUserSubscriptions } from '../userSubscription';
import { IUser } from './user';

const baseService = new BaseService();
const AUTH_BASE_URL = 'auth';
const USER_BASE_URL = 'user';
const SUBSCRIPTION_URL = 'subscription';
const SUBSCRIPTIONS_URL = 'subscriptions';
const login = async (data = {}, query = {}): Promise<IUser> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${AUTH_BASE_URL}/login`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IUser> = await baseService.post(url, data, {});
  return response.data;
};
const getAdminUsers = async (query = {}): Promise<IUser[]> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${USER_BASE_URL}/admins`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IUser[]> = await baseService.get(url, {});
  return response.data;
};
const getUsers = async (query = {}): Promise<IGetUsersResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${USER_BASE_URL}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IGetUsersResponse> = await baseService.get(
    url,
    {},
  );
  return response.data;
};
const getUserSubscriptions = async (query = {}): Promise<ISubscription[]> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${USER_BASE_URL}/${SUBSCRIPTIONS_URL}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ISubscription[]> = await baseService.get(
    url,
    {},
  );
  return response.data;
};
const cancelSubscription = async (
  subscriptionId: number,
  query = {},
): Promise<IUserSubscriptions> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${SUBSCRIPTION_URL}/${subscriptionId}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IUserSubscriptions> = await baseService.delete(
    url,
    {},
  );
  return response.data;
};
export {
  login,
  getAdminUsers,
  getUsers,
  getUserSubscriptions,
  cancelSubscription,
};
export default {};
