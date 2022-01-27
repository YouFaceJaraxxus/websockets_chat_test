import { AxiosResponse } from 'axios';
import BaseService from '../../services/common/BaseService';
import { IGetUsersQuery } from './models/getUsersQuery';
import { IGetUsersResponse } from './models/getUsersResponse';

const getUsers = async (queryParams: IGetUsersQuery): Promise<IGetUsersResponse> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(queryParams);
  const path = baseService.url.build('user');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IGetUsersResponse> = await baseService.get(url, {});
  return response.data;
};

const deleteUser = async (userId, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`user/${userId}/delete`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.delete(url, {});
  return response.data;
};

const blockUser = async (userId, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`user/${userId}/block`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.put(url, {}, {});
  return response.data;
};

const unblockUser = async (userId, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`user/${userId}/unblock`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.put(url, {}, {});
  return response.data;
};

export { getUsers, deleteUser, blockUser, unblockUser };
