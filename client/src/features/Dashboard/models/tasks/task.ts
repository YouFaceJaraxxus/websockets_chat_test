import { IUser } from '../../../Auth/models/user/user';
import { IAttachment } from '../attachments/attachment';
import { IComment } from '../comments/comment';
import { IDeleteRequest } from '../deleteRequests/deleteRequest';
import { ITicketVisit } from '../ticketVisits/ticketVisit';

interface ITask {
  id: number;
  title: string;
  productId: number;
  taskTypeId: number;
  dueDate: Date;
  priorityId: number;
  objectId: number;
  subject: string;
  description: string;
  statusId: number;
  createdAt: Date;
  dateCompleted: Date;
  dateArchived: Date | string;
  isBlocked: boolean;
  createdById: number;
  assignedToId: number;
  createdBy: IUser;
  assignedTo: IUser;
  ticketAttachments: IAttachment[];
  ticketVisits: ITicketVisit[];
  ticketComments: IComment[];
  ticketDeleteRequests: IDeleteRequest[];
}

export type { ITask };
export default {};
