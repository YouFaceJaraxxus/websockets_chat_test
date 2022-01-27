import { IUser } from '../../Auth/models/user/user';

interface IGetUsersResponse{
  users: IUser[];
  total: number;
}

export type { IGetUsersResponse };
export default {};
