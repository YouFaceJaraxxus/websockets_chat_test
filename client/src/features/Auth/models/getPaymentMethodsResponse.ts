import { IFailedPaymentMethod, IPaymentMethodResponse } from './payment/paymentMethod';

interface IGetPaymentMethodsResponse {
  paymentMethods: IPaymentMethodsContainer;
  failedPaymentMethods: IFailedPaymentMethod[];
}

interface IPaymentMethodsContainer {
  object: string;
  data: IPaymentMethodResponse[];
}

export type { IGetPaymentMethodsResponse };
export default {};
