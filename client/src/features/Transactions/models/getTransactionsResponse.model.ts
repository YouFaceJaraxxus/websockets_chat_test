import { ITransaction } from './transaction/transaction';

interface IGetTransactionsResponse {
  rows: ITransaction[];
  count: number;
}

export type { IGetTransactionsResponse };
export default {};
