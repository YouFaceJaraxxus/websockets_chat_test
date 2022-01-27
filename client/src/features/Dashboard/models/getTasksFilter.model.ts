interface IGetTasksFilter {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: string;
  where?: any;
}

export type { IGetTasksFilter };
export default {};
