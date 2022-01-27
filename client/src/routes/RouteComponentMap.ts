import { FC } from 'react';
import {
  DASHBOARD_PATH,
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
  TRANSACTIONS_PATH,
  USERS_PATH,
  KNOWLEDGE_PATH,
  ARCHIVE_PATH,
  ACCOUNT_PATH,
  TOKEN_PATH,
  PERSONALINFORMATION_PATH,
  PAYMENT_PATH,
  CHECKOUT_PATH,
  DASHBOARD_TICKET_ID_PATH,
  ORDERCOMPLETEDSTEP_PATH,
  RESET_PASSWORD_CONFIRMATION_PATH,
  ACCOUNT_PLAN_PATH,
  ALL_WORKS,
  NOT_VERIFIED_OR_BLOCKED,
  ADMIN,
  VERIFIED,
  FAILED_PAY,
  NO_SUBS,
  PASSWORD_CHANGED_PATH,
  ACCOUNT_PAYMENT_PATH,
} from './path-constants';
import RegisterScreen from '../pages/Register/RegisterScreen';
import LoginScreen from '../pages/Login/LoginScreen';
import TokenScreen from '../pages/Token/TokenScreen';
import ResetPassword from '../pages/ResetPassword/ResetPasswordScreen';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import TransactionsPage from '../pages/TransactionsPage/TransactionsPage';
import UsersPage from '../pages/UsersPage/UsersPage';
import KnowledgePage from '../pages/KnowledgePage/KnowledgePage';
import TasksPage from '../pages/TasksPage/TasksPage';
import AccountPage from '../pages/AccountPage/AccountPage';
import PersonalInformationScreen from '../pages/PersonalInformationPage/PersonalInformationScreen';
import PaymentScreen from '../pages/PaymentPage/PaymentScreen';
import CheckoutScreen from '../pages/CheckoutPage/CheckoutScreen';
import OrderCompletedStep from '../features/Auth/components/OrderCompletedStep';
import ResetPasswordConfirmationScreen from '../pages/ResetPasswordConfirmation/ResetPasswordConfirmationScreen';
import PasswordChangeSuccess from '../features/Auth/components/PasswordChangeSuccess';

interface IPathComponent {
  path?: string;
  component: FC;
  protectionLevel: number;
}

const pathComponentArray: IPathComponent[] = [];

pathComponentArray.push({
  path: HOME_PATH,
  protectionLevel: ALL_WORKS,
  component: DashboardPage,
});
pathComponentArray.push({
  path: DASHBOARD_TICKET_ID_PATH,
  protectionLevel: ALL_WORKS,
  component: DashboardPage,
});
pathComponentArray.push({
  path: REGISTER_PATH,
  protectionLevel: NOT_VERIFIED_OR_BLOCKED,
  component: RegisterScreen,
});
pathComponentArray.push({
  path: LOGIN_PATH,
  protectionLevel: NOT_VERIFIED_OR_BLOCKED,
  component: LoginScreen,
});
pathComponentArray.push({
  path: DASHBOARD_PATH,
  protectionLevel: ALL_WORKS,
  component: DashboardPage,
});
pathComponentArray.push({
  path: TRANSACTIONS_PATH,
  protectionLevel: ADMIN,
  component: TransactionsPage,
});
pathComponentArray.push({
  path: USERS_PATH,
  protectionLevel: ADMIN,
  component: UsersPage,
});
pathComponentArray.push({
  path: KNOWLEDGE_PATH,
  protectionLevel: ADMIN,
  component: KnowledgePage,
});
pathComponentArray.push({
  path: RESET_PASSWORD_PATH,
  protectionLevel: NOT_VERIFIED_OR_BLOCKED,
  component: ResetPassword,
});
pathComponentArray.push({
  path: RESET_PASSWORD_CONFIRMATION_PATH,
  protectionLevel: NOT_VERIFIED_OR_BLOCKED,
  component: ResetPasswordConfirmationScreen,
});
pathComponentArray.push({
  path: ARCHIVE_PATH,
  protectionLevel: ADMIN,
  component: TasksPage,
});
pathComponentArray.push({
  path: ACCOUNT_PLAN_PATH,
  protectionLevel: FAILED_PAY,
  component: AccountPage,
});
pathComponentArray.push({
  path: ACCOUNT_PAYMENT_PATH,
  protectionLevel: FAILED_PAY,
  component: AccountPage,
});
pathComponentArray.push({
  path: ACCOUNT_PATH,
  protectionLevel: FAILED_PAY,
  component: AccountPage,
});
pathComponentArray.push({
  path: TOKEN_PATH,
  protectionLevel: NOT_VERIFIED_OR_BLOCKED,
  component: TokenScreen,
});
pathComponentArray.push({
  path: PERSONALINFORMATION_PATH,
  protectionLevel: VERIFIED,
  component: PersonalInformationScreen,
});
pathComponentArray.push({
  path: PAYMENT_PATH,
  protectionLevel: NO_SUBS,
  component: PaymentScreen,
});

pathComponentArray.push({
  path: CHECKOUT_PATH,
  protectionLevel: NO_SUBS,
  component: CheckoutScreen,
});
pathComponentArray.push({
  path: ORDERCOMPLETEDSTEP_PATH,
  protectionLevel: NO_SUBS,
  component: OrderCompletedStep,
});
pathComponentArray.push({
  path: PASSWORD_CHANGED_PATH,
  protectionLevel: NOT_VERIFIED_OR_BLOCKED,
  component: PasswordChangeSuccess,
});
pathComponentArray.push({ component: LoginScreen, protectionLevel: NOT_VERIFIED_OR_BLOCKED });

export { pathComponentArray };
export default {};
