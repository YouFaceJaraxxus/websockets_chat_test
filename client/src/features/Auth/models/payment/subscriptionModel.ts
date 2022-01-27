interface ISubscription {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  currency: string;
  maxActiveTickets: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  users_subscriptions: IUsersSubscriptions;
}

interface IUsersSubscriptions{
  canceledAt?: Date;
  createdAt?: Date;
  id?: number;
  paymentFailed?: boolean;
  subscriptionId?: string;
  subscriptionPlanId?: number;
  updatedAt?: Date;
  userId?: number;
  validFrom?: Date;
  validTo?: Date;
  coupon?: string;
  status?: string;
}

export type { ISubscription, IUsersSubscriptions };
export default {};
