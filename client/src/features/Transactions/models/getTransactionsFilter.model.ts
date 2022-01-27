interface IGetTransactionsFilter {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: string;
  sort?: ISort;
  where?: any;
}

interface ISort {
  title?: string;
  createdAt?: string;
  dueDate?: string;
  priorityId?: string;
}

export type { IGetTransactionsFilter, ISort };
export default {};
