import { AxiosResponse } from 'axios';
import BaseService from '../../../services/common/BaseService';
import { IEditUserForm } from '../../Account/models/userForm/editUserForm';
import { IDeleteUserResponse } from '../models/deleteUserResponse';
import { IUserLogin, IUserRegister } from '../models/forms/model';
import { IRequestPasswordResetResponse } from '../models/requestPasswordResetResponse';
import { IResetPassword } from '../models/resetPassword';
import { IResetPasswordResponse } from '../models/resetPasswordResponse';
import { IUser } from '../models/user/user';

const user = {
  isLogged: false,
};

const setUser = (isLogged: boolean) => {
  user.isLogged = isLogged;
};

const registerUser = async (data: IUserRegister, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/register');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, data, {});
  return response.data;
};

const loginUser = async (data: IUserLogin, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/login');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, data, {});
  return response.data;
};

const logoutUser = async (query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/logout');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, {}, {});
  return response.data;
};
const checkSession = async (query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/check_session');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, {}, {});
  return response.data;
};

const verifyCode = async (code, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/verify');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, code, {});
  return response.data;
};

const personalInformationAdd = async (personalInformation, query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user/edit');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.put(
    url,
    personalInformation,
    {},
  );
  return response.data;
};

const editUserPersonalInformation = async (
  editUserForm: IEditUserForm,
  query = {},
): Promise<IUser> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user/edit');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IUser> = await baseService.put(
    url,
    editUserForm,
    {},
  );
  return response.data;
};

const getSubscriptions = async (query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('subscription');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.get(url, {});
  return response.data;
};

const getUserSubscriptions = async (query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user/subscriptions');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.get(url, {});
  return response.data;
};

const deleteAccount = async (password: string, query = {}): Promise<IDeleteUserResponse> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('user');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IDeleteUserResponse> = await baseService
    .delete(
      url,
      {
        data:
      { password },
      },
    );
  return response.data;
};

const retrySubscription = async (query = {}) => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('subscription/retry');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse = await baseService.post(url, {}, {});
  return response.data;
};

const resendVerificationCode = async (
  query = {},
): Promise<IUser> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/resend_verification_code');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IUser> = await baseService
    .post(url, {}, {});
  return response.data;
};

const requestPasswordReset = async (
  email: string,
  query = {},
): Promise<IRequestPasswordResetResponse> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/request_password_reset');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IRequestPasswordResetResponse> = await baseService
    .post(url, { email }, {});
  return response.data;
};

const resetPassword = async (
  data: IResetPassword,
  query = {},
): Promise<IResetPasswordResponse> => {
  const baseService = new BaseService();
  const queryString = baseService.qs.stringify(query);
  const path = baseService.url.build('auth/reset_password');
  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<IResetPasswordResponse> = await baseService
    .post(url, data, {});
  return response.data;
};

export {
  user,
  setUser,
  registerUser,
  loginUser,
  logoutUser,
  checkSession,
  verifyCode,
  personalInformationAdd,
  getSubscriptions,
  getUserSubscriptions,
  editUserPersonalInformation,
  deleteAccount,
  retrySubscription,
  requestPasswordReset,
  resetPassword,
  resendVerificationCode,
};
