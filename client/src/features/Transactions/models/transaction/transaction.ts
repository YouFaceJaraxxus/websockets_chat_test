import { IUser } from '../../../Auth/models/user/user';

interface ITransaction {
  id: number;
  transactionId: string;
  amount: string;
  currency: string;
  status: string;
  package: string;
  userId: number;
  user: IUser;
  createdAt: Date;
}

export type { ITransaction };
export default {};
