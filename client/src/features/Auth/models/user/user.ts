interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  isLogged: boolean;
  isAdmin: boolean;
  verified: boolean;
  customerId: number;
  createdAt: Date;
  updatedAt: Date;
  profileImageId: number;
  status?: string;
  subscriptions?: any[];
  failedPayment: boolean;
  userLevel?: number;
}

export type { IUser };
export default {};
