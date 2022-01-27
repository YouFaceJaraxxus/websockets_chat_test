import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { ICreateComment } from '../createComment.model';
import { IComment } from './comment';

const baseService = new BaseService();
const TICKET_BASE_URL = 'ticket';

const getComments = async (id:number, data = {}, query = {}): Promise<IComment[]> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/comments`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IComment[]> = await baseService.get(url, data);
  return response.data;
};

const createComment = async (id: number, data: ICreateComment, query = {}): Promise<IComment> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/comments`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IComment> = await baseService.post(url, data, {});
  return response.data;
};

export { getComments, createComment };
export default {};
