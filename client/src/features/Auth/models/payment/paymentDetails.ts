interface IPayment {
  id?: number;
  name?: string;
  description?: string;
  type: string;
  price?: number;
  currency?: string;
  maxActiveTickets?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  priceId: string;
  productId: string;
}

interface IPaymentMethod {
  success: true;
  paymentMethod: any;
}

export type { IPayment, IPaymentMethod };
export default {};
