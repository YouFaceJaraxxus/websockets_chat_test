import { IUser } from '../user/user';

interface IAddress {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
}

interface IBillingDetails {
  address?: IAddress;
  email?: string;
  name?: string;
  phone?: string;
}

interface IChecks {
  address_line1_check?: string;
  address_postal_code_check?: string; cvc_check?: string;
}

interface INetworks {
  available?: string[];
  preferred?: string;
}

interface IThreeSecure {
  type?: Boolean, example?: true, supported?: boolean;
}

interface ICard {
  brand?: string;
  checks?: IChecks;
  country?: string;
  exp_month?: number;
  exp_year?: number;
  fingerprint?: string;
  funding?: string;
  generated_from?: string;
  last4?: string;
  networks?: INetworks;
  three_d_secure_usage?: IThreeSecure;
  wallet?: string;
}

interface IPaymentMethodResponse {
  id?: string;
  object?: string;
  billing_details?: IBillingDetails;
  card?: ICard;
  created?: number;
  customer?: string;
  livemode?: boolean;
  metadata?: any;
  type?: string;
  default: boolean;
  failed: boolean;
}

interface IFailedPaymentMethod {
  payment_method: string;
  userId: number;
  user: IUser;
}

export type{ IPaymentMethodResponse, IFailedPaymentMethod };
export default {};
