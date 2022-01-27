import { IUser } from '../../../Auth/models/user/user';

interface IDeleteRequest {
  id: number;
  approved: boolean;
  userId: number;
  ticketId: number;
  createdAt?: Date;
  user?: IUser;
  text?: string;
  type?: string;
}

export type { IDeleteRequest };
export default {};
