import { ITask } from './tasks/task';

interface ITicketsResponse {
  tickets: ITask[];
  count: number;
}

export type { ITicketsResponse };
export default {};
