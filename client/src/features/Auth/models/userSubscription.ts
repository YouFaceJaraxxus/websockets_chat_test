import { ISubscription } from './payment/subscriptionModel';
import { IUser } from './user/user';

interface IUserSubscriptions {
  id: number;
  subscriptionPlan: ISubscription;
  subscriptionPlanId: number;
  user: IUser;
  userId: number;
  validFrom: Date;
  validTo: Date;
  paymentFailed: boolean;
  subscriptionId: string;
  canceledAt: Date;
}

export type { IUserSubscriptions };
export default {};
