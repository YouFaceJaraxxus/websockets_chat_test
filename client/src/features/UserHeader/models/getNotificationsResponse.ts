import { IUserNotification } from './notification/notification';

interface IGetNotificationsResponse {
  rows: IUserNotification[];
  count: number;
}

export type { IGetNotificationsResponse };
export default {};
