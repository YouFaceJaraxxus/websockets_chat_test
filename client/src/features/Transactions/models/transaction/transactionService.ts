import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { IGetTransactionsResponse } from '../getTransactionsResponse.model';

const baseService = new BaseService();
const TRANSACTIONS_BASE_URL = 'user-transactions';
const USER_TRANSACTIONS_BASE_URL = 'user/transactions';

const getTransactions = async (query = {}): Promise<IGetTransactionsResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(TRANSACTIONS_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IGetTransactionsResponse> = await baseService.get(url, {});
  return response.data;
};

const getUserTransactions = async (query = {}): Promise<IGetTransactionsResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(USER_TRANSACTIONS_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IGetTransactionsResponse> = await baseService.get(url, {});
  return response.data;
};

export { getTransactions, getUserTransactions };
export default {};
