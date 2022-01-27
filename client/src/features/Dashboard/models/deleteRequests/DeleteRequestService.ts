import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { IDeleteRequest } from './deleteRequest';

const baseService = new BaseService();
const TICKET_BASE_URL = 'ticket';

const getDeleteRequests = async (id:number, data = {}, query = {}): Promise<IDeleteRequest[]> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/delete-requests`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IDeleteRequest[]> = await baseService.get(url, data);
  return response.data;
};

const createDeleteRequest = async (id: number, data = {}, query = {}): Promise<IDeleteRequest> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/delete-requests`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IDeleteRequest> = await baseService.post(url, data, {});
  return response.data;
};

const respondToDeleteRequest = async (
  id: number,
  approved: boolean,
  query = {},
): Promise<IDeleteRequest> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/delete-requests/${id}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IDeleteRequest> = await baseService.put(url, { approved }, {});
  return response.data;
};

export { getDeleteRequests, createDeleteRequest, respondToDeleteRequest };
export default {};
