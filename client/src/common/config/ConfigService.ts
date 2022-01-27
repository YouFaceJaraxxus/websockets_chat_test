import { AxiosResponse } from 'axios';
import BaseService from '../../services/common/BaseService';
import { IConfig } from './config';

const baseService = new BaseService();
const CONFIG_BASE_URL = 'config-map';

const getConfigs = async (data = {}, query = {}): Promise<IConfig> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(CONFIG_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IConfig> = await baseService.get(url, data);
  return response.data;
};

export { getConfigs };
export default {};
