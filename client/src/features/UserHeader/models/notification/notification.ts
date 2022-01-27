import { IUser } from '../../../Auth/models/user/user';
import { IComment } from '../../../Dashboard/models/comments/comment';
import { ITask } from '../../../Dashboard/models/tasks/task';

interface IUserNotification {
  id: number;
  notification: INotification;
  notificationId: number;
  user: IUser;
  userId: number;
  new: boolean;
  seen: boolean;
}

interface INotification {
  id: number;
  type: string;
  users: IUser[],
  tickets: INotificationTask[];
  ticketComment: INotificationTicketComment;
  subscription: INotificationSubscription;
  userAction: INotificationUserAction;
  author: IUser;
  authorId: number;
  createdAt: Date;
}

enum NotificationsTypeEnum {
  TICKET = 'TICKET',
  TICKET_COMMENT = 'TICKET_COMMENT',
  USER_ACTION = 'USER_ACTION',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

interface INotificationTask {
  type: TicketNotificationsTypeEnum;
  ticket: ITask;
  data: any;
}

enum TicketNotificationsTypeEnum {
  CREATED = 'CREATED',
  ASSIGNED = 'ASSIGNED',
  DELETED = 'DELETED',
  EDITED = 'EDITED',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
  DELETE_REQUEST = 'DELETE_REQUEST',
}

interface ITicketComment extends IComment{
  ticket: ITask;
}

interface INotificationTicketComment {
  type: TicketCommentsNotificationsTypeEnum;
  ticketComment: ITicketComment;
}

enum TicketCommentsNotificationsTypeEnum {
  CREATED = 'CREATED',
}

interface INotificationSubscription {
  type: SubscriptionNotificationsTypeEnum;
}

enum SubscriptionNotificationsTypeEnum {
  FIRST_FAILED_PAYMENT_RETRY = 'FIRST_FAILED_PAYMENT_RETRY',
  SECOND_FAILED_PAYMENT_RETRY = 'SECOND_FAILED_PAYMENT_RETRY',
  THIRD_FAILED_PAYMENT_RETRY = 'THIRD_FAILED_PAYMENT_RETRY',
}

interface INotificationUserAction {
  type: UserActionsNotificationsTypeEnum;
}

enum UserActionsNotificationsTypeEnum {
  BLOCKED_PAYMENT_FAILED = 'BLOCKED_PAYMENT_FAILED',
  SELF_DELETED = 'SELF_DELETED',
}

export type {
  INotification,
  IUserNotification,
  INotificationTicketComment,
  INotificationSubscription,
  INotificationUserAction,
};
export {
  NotificationsTypeEnum,
  TicketNotificationsTypeEnum,
  TicketCommentsNotificationsTypeEnum,
  SubscriptionNotificationsTypeEnum,
  UserActionsNotificationsTypeEnum,
};
export default {};
