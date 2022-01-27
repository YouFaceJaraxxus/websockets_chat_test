import { IUser } from '../features/Auth/models/user/user';

export const HOME_PATH = '/dashboard';
export const REGISTER_PATH = '/register';
export const LOGIN_PATH = '/login';
export const TOKEN_PATH = '/token';
export const RESET_PASSWORD_PATH = '/resetPassword';
export const RESET_PASSWORD_CONFIRMATION_PATH = '/reset-password-confirmation';
export const DASHBOARD_PATH = '/dashboard';
export const DASHBOARD_TICKET_PATH = '/dashboard/ticket';
export const DASHBOARD_TICKET_ID_PATH = '/dashboard/ticket/:id';
export const TRANSACTIONS_PATH = '/transactions';
export const USERS_PATH = '/users';
export const KNOWLEDGE_PATH = '/knowledge';
export const ARCHIVE_PATH = '/archive';
export const ACCOUNT_PAYMENT_PATH = '/account/myPayments';
export const ACCOUNT_PLAN_PATH = '/account/plan';
export const ACCOUNT_PATH = '/account';
export const PERSONALINFORMATION_PATH = '/personalInformation';
export const PAYMENT_PATH = '/payment';
export const CHECKOUT_PATH = '/checkout';
export const ORDERCOMPLETEDSTEP_PATH = '/orderCompleted';
export const PASSWORD_CHANGED_PATH = '/passwordChanged';

export const NOT_CHECKED = 0;
export const NOT_VERIFIED_OR_BLOCKED = 1;
export const VERIFIED = 2;
export const NO_SUBS = 3;
export const FAILED_PAY = 4;
export const ALL_WORKS = 5;
export const ADMIN = 6;

const BLOCKED_STATUS = 'BLOCKED';
const ACTIVE = 'active';
const PAST_DUE = 'past_due';
const isBlocked = (user: IUser) => user.status === BLOCKED_STATUS;
export const getUserLevel = (user: IUser, checkedSession: boolean) => {
  if (!checkedSession) return NOT_CHECKED;
  if (isBlocked(user) || !user.verified) return NOT_VERIFIED_OR_BLOCKED;
  if (user.firstname == null || user.firstname === ''
  || user.lastname == null || user.lastname === ''
  ) return VERIFIED;
  const noSubs = user.subscriptions == null
  || user.subscriptions
    ?.filter((s) => s?.users_subscriptions?.status === ACTIVE
    || s?.users_subscriptions?.status === PAST_DUE).length === 0;

  if (user.isLogged) {
    if (user.isAdmin) return ADMIN;
    if (user.failedPayment) return FAILED_PAY;
    if (noSubs) return NO_SUBS;
    return ALL_WORKS;
  }

  if (noSubs) return NO_SUBS;
  return NOT_VERIFIED_OR_BLOCKED;
};
