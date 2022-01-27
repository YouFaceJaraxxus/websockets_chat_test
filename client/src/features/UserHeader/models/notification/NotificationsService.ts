import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { ICheckNewNotificationsResponse } from '../checkNewNotificationsResponse';
import { IGetNotificationsFilter } from '../getNotificationsFilter';
import { IGetNotificationsResponse } from '../getNotificationsResponse';
import { IUserNotification } from './notification';

const baseService = new BaseService();
const NOTIFICATIONS_BASE_URL = 'notifications';
const CHECK_NEW_NOTIFICATIONS_URL = 'check';

const getNotifications = async (query: IGetNotificationsFilter):
Promise<IGetNotificationsResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(NOTIFICATIONS_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IGetNotificationsResponse> = await baseService.get(url, {});
  return response.data;
};

const checkNewNotifications = async (): Promise<ICheckNewNotificationsResponse> => {
  const queryString = baseService.qs.stringify({});
  const path = baseService.url.build(`${NOTIFICATIONS_BASE_URL}/${CHECK_NEW_NOTIFICATIONS_URL}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ICheckNewNotificationsResponse> = await baseService.get(url, {});
  return response.data;
};

const setNotificationAsSeen = async (id: number): Promise<IUserNotification> => {
  const queryString = baseService.qs.stringify({});
  const path = baseService.url.build(`${NOTIFICATIONS_BASE_URL}/${id}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IUserNotification> = await baseService.put(url, {}, {});
  return response.data;
};

const deleteNotification = async (id: number): Promise<IUserNotification> => {
  const queryString = baseService.qs.stringify({});
  const path = baseService.url.build(`${NOTIFICATIONS_BASE_URL}/${id}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IUserNotification> = await baseService.delete(url, {});
  return response.data;
};

export {
  getNotifications,
  checkNewNotifications,
  deleteNotification,
  setNotificationAsSeen,
};
export default {};
