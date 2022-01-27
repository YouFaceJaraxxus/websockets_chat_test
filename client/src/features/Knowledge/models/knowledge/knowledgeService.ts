import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { ICreateKnowledge } from '../createKnowledge';
import { IKnowledge } from './knowledge';

const baseService = new BaseService();
const KNOWLEDGE_BASE_URL = 'knowledge';

const getKnowledges = async (query = {}): Promise<IKnowledge[]> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(KNOWLEDGE_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IKnowledge[]> = await baseService.get(url, {});
  return response.data;
};

const createKnowledge = async (data: ICreateKnowledge, query = {}): Promise<IKnowledge> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(KNOWLEDGE_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IKnowledge> = await baseService.post(url, data, {});
  return response.data;
};

const deleteKnowledge = async (knowledgeId, query = {}): Promise<IKnowledge> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`knowledge/${knowledgeId}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.delete(url, {});
  return response.data;
};

export { getKnowledges, createKnowledge, deleteKnowledge };
export default {};
