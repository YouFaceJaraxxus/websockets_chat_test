import { IUser } from '../../../Auth/models/user/user';

interface IComment {
  id: number;
  text: string;
  type: 'comment' | 'delete_request' | 'marked_completed' | 'delete_response';
  userId: number;
  ticketId: number;
  createdAt?: Date;
  user?: IUser;
}

export type { IComment };
export default {};
