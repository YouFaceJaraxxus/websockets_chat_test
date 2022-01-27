import { AxiosResponse } from 'axios';
import BaseService from '../../../../services/common/BaseService';
import { IGetTasksFilter } from '../getTasksFilter.model';
import { ISaveTask } from '../saveTask.model';
import { ITicketsResponse } from '../ticketsResponse';
import { ITaskStatsResponse } from '../taskStatsResponse';
import { ITask } from './task';
import { ITicketVisit } from '../ticketVisits/ticketVisit';
import { IAttachment } from '../attachments/attachment';

const baseService = new BaseService();
const TICKET_BASE_URL = 'ticket';
const TICKET_STATS_URL = 'stats';
const TICKET_ATTACHMENTS_URL = 'attachments';
const TICKET_LAST_VISITED = 'lastVisited';

const getTasks = async (query: IGetTasksFilter): Promise<ITicketsResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(TICKET_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITicketsResponse> = await baseService.get(url, {});
  return response.data;
};

const getTaskById = async (id: number, query = {}): Promise<ITask> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITask> = await baseService.get(url, {});
  return response.data;
};

const getTaskAttachmentsById = async (id: number, query = {}): Promise<IAttachment[]> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/${TICKET_ATTACHMENTS_URL}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IAttachment[]> = await baseService.get(url, {});
  return response.data;
};

const getTaskStats = async (query: {}): Promise<ITaskStatsResponse> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${TICKET_STATS_URL}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITaskStatsResponse> = await baseService.get(url, {});
  return response.data;
};

const createTask = async (data: ISaveTask, query = {}): Promise<ITask> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(TICKET_BASE_URL);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITask> = await baseService.post(url, data, {});
  return response.data;
};

const editTask = async (id: number, data: ISaveTask, query = {}): Promise<ITask> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITask> = await baseService.put(url, data, {});
  return response.data;
};

const archiveTask = async (id: number, data = {}, query = {}): Promise<ITask> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/archive`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITask> = await baseService.put(url, data, {});
  return response.data;
};

const editTaskStatus = async (id: number, statusId: number, query = {}): Promise<ITask> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/status`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITask> = await baseService.put(url, { statusId }, {});
  return response.data;
};

const updateTicketLastVisited = async (id: number, query = {}): Promise<ITicketVisit> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/${TICKET_LAST_VISITED}`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITicketVisit> = await baseService.put(url, {}, {});
  return response.data;
};

const assignTask = async (id: number, userId: number, query = {}): Promise<ITask> => {
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build(`${TICKET_BASE_URL}/${id}/assign`);
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<ITask> = await baseService.put(url, { userId }, {});
  return response.data;
};

export {
  getTasks,
  getTaskById,
  createTask,
  editTask,
  archiveTask,
  editTaskStatus,
  assignTask,
  getTaskStats,
  updateTicketLastVisited,
  getTaskAttachmentsById };
export default {};
