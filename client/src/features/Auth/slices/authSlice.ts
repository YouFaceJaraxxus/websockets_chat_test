import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkSession,
  deleteAccount,
  getSubscriptions,
  getUserSubscriptions,
  loginUser,
  logoutUser,
  personalInformationAdd,
  registerUser,
  requestPasswordReset,
  resendVerificationCode,
  resetPassword,
  retrySubscription,
  verifyCode,
} from '../services/authService';
import { IUser } from '../models/user/user';
import {
  ICode,
  IUserLogin,
  IUserPersonalInformation,
  IUserRegister,
} from '../models/forms/model';
import { ISubscription } from '../models/payment/subscriptionModel';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../../store/store';
import { ILogoutResponse } from '../models/user/logoutResponse';
import { IPayment, IPaymentMethod } from '../models/payment/paymentDetails';
import { IEditUserForm } from '../../Account/models/userForm/editUserForm';
import { IDeleteUserResponse } from '../models/deleteUserResponse';
import { cancelSubscription } from '../models/user/UserService';
import { IUserSubscriptions } from '../models/userSubscription';
import { IRequestPasswordResetResponse } from '../models/requestPasswordResetResponse';
import { IResetPassword } from '../models/resetPassword';
import { IResetPasswordResponse } from '../models/resetPasswordResponse';

interface UserState {
  isLoading: boolean;
  isRetryingSubscription: boolean;
  isResendingVerificationCode: boolean;
  isResettingPassword: boolean;
  isDeletingAccount: boolean;
  checkedSession: boolean;
  user: IUser;
  subscriptions: ISubscription[];
  userSubscriptions: ISubscription[];
  checkoutDetails: IPayment[];
  payment_method: IPaymentMethod[];
}

const initialState: UserState = {
  isRetryingSubscription: false,
  isResendingVerificationCode: false,
  isResettingPassword: false,
  isLoading: false,
  isDeletingAccount: false,
  checkedSession: false,
  user: {
    id: -1,
    email: '',
    firstname: '',
    lastname: '',
    isAdmin: false,
    isLogged: false,
    verified: false,
    customerId: -1,
    createdAt: null,
    updatedAt: null,
    profileImageId: null,
    failedPayment: true,
    userLevel: 1,
  },
  subscriptions: [],
  userSubscriptions: [],
  checkoutDetails: [],
  payment_method: [],
};

export const getSubscriptionsAsync = createAsyncThunk(
  'user/getSubscriptions',
  async (): Promise<ISubscription[]> => {
    const response = await getSubscriptions();
    return response;
  },
);
export const getUserSubscriptionsAsync = createAsyncThunk(
  'user/getUserSubscriptions',
  async (): Promise<ISubscription[]> => {
    const response = await getUserSubscriptions();
    return response;
  },
);
export const cancelSubscriptionAsync = createAsyncThunk(
  'user/cancelSubscription',
  async (subscriptionId: number): Promise<IUserSubscriptions> => {
    const response = await cancelSubscription(subscriptionId);
    return response;
  },
);

export const registerUserAsync = createAsyncThunk(
  'auth/register',
  async (data: IUserRegister): Promise<IUser> => {
    const response = await registerUser(data);
    return response;
  },
);

export const loginUserAsync = createAsyncThunk(
  'auth/login',
  async (data: IUserLogin): Promise<IUser> => {
    const response = await loginUser(data);
    return response;
  },
);

export const logoutUserAsync = createAsyncThunk(
  'auth/logout',
  async (): Promise<ILogoutResponse> => {
    const response = await logoutUser();
    return response;
  },
);

export const checkSessionAsync = createAsyncThunk(
  'auth/check_session',
  async (): Promise<IUser> => {
    const response = await checkSession();
    return response;
  },
);

export const verifyUserAsync = createAsyncThunk(
  'auth/verify',
  async (code: ICode): Promise<ICode> => {
    const response = await verifyCode(code);
    return response;
  },
);

export const personalInformationAsync = createAsyncThunk(
  'user/edit',
  async (
    personalInformation: IUserPersonalInformation,
  ): Promise<IUserPersonalInformation> => {
    const response = await personalInformationAdd(personalInformation);
    return response;
  },
);

export const editAccountPersonalInformationAsync = createAsyncThunk(
  'user/editProfile',
  async (editUserForm: IEditUserForm): Promise<IUser> => {
    const response = await personalInformationAdd(editUserForm);
    return response;
  },
);

export const deleteAccountAsync = createAsyncThunk(
  'user/deleteAccount',
  async (password: string): Promise<IDeleteUserResponse> => {
    const response = await deleteAccount(password);
    return response;
  },
);

export const retrySubscriptionAsync = createAsyncThunk(
  'subscription/retry',
  async (): Promise<IUserSubscriptions> => {
    const response = await retrySubscription();
    return response;
  },
);

export const requestPasswordResetAsync = createAsyncThunk(
  'user/requestPasswordReset',
  async (email: string): Promise<IRequestPasswordResetResponse> => {
    const response = await requestPasswordReset(email);
    return response;
  },
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data: IResetPassword): Promise<IResetPasswordResponse> => {
    const response = await resetPassword(data);
    return response;
  },
);

export const resendVerificationCodeAsync = createAsyncThunk(
  'user/resendToken',
  async (): Promise<IUser> => {
    const response = await resendVerificationCode();
    return response;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user.isLogged = false;
    },
    resetUser: (state) => {
      state.user = initialState.user;
      state.checkedSession = true;
    },
    setUserLevel: (state, action: PayloadAction<number>) => {
      state.user.userLevel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...action.payload, isLogged: true };
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.user = initialState.user;
      })
      .addCase(logoutUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkSessionAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkSessionAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...action.payload, isLogged: true };
        state.checkedSession = true;
      })
      .addCase(checkSessionAsync.rejected, (state) => {
        state.user = initialState.user;
        state.checkedSession = true;
        state.isLoading = false;
      })
      .addCase(verifyUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUserAsync.fulfilled, (state) => {
        state.user = { ...state.user, isLogged: true, verified: true };
        state.isLoading = false;
      })
      .addCase(verifyUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(personalInformationAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(personalInformationAsync.fulfilled, (state, action) => {
        state.user.firstname = action.payload.firstname;
        state.user.lastname = action.payload.lastname;
        state.isLoading = false;
      })
      .addCase(personalInformationAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editAccountPersonalInformationAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        editAccountPersonalInformationAsync.fulfilled,
        (state, action) => {
          state.user = { ...action.payload,
            firstname: action.payload.firstname ?
              action.payload.firstname : state.user.firstname,
            lastname: action.payload.lastname ?
              action.payload.lastname : state.user.lastname,
            isLogged: state.user.isLogged };
          state.isLoading = false;
        },
      )
      .addCase(editAccountPersonalInformationAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAccountAsync.pending, (state) => {
        state.isDeletingAccount = true;
      })
      .addCase(deleteAccountAsync.fulfilled, (state) => {
        state.isDeletingAccount = false;
      })
      .addCase(deleteAccountAsync.rejected, (state) => {
        state.isDeletingAccount = false;
      })
      .addCase(getSubscriptionsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptionsAsync.fulfilled, (state, action) => {
        state.subscriptions = action.payload.sort((subA) => (subA.type === 'MONTHLY' ? -1 : 1));
        state.isLoading = false;
      })
      .addCase(getSubscriptionsAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserSubscriptionsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSubscriptionsAsync.fulfilled, (state, action) => {
        const sorted = action.payload.sort((subA) => (subA.type === 'MONTHLY' ? -1 : 1));
        state.userSubscriptions = sorted;

        state.user.subscriptions = sorted;

        state.isLoading = false;
      })
      .addCase(getUserSubscriptionsAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(cancelSubscriptionAsync.fulfilled, (state, action) => {
        state.userSubscriptions = state.userSubscriptions.map(
          (subscription) => {
            if (subscription.id === action.payload.id) {
              subscription.users_subscriptions.canceledAt = action.payload.canceledAt;
              subscription.users_subscriptions.validTo = action.payload.validTo;
            }
            return subscription;
          },
        );
        state.isLoading = false;
      })
      .addCase(cancelSubscriptionAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(retrySubscriptionAsync.pending, (state) => {
        state.isRetryingSubscription = true;
      })
      .addCase(retrySubscriptionAsync.fulfilled, (state) => {
        state.isRetryingSubscription = false;
      })
      .addCase(retrySubscriptionAsync.rejected, (state) => {
        state.isRetryingSubscription = false;
      })
      .addCase(requestPasswordResetAsync.pending, (state) => {
        state.isResendingVerificationCode = true;
      })
      .addCase(requestPasswordResetAsync.fulfilled, (state) => {
        state.isResendingVerificationCode = false;
      })
      .addCase(requestPasswordResetAsync.rejected, (state) => {
        state.isResendingVerificationCode = false;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.isResettingPassword = true;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.isResettingPassword = false;
      })
      .addCase(resetPasswordAsync.rejected, (state) => {
        state.isResettingPassword = false;
      })
      .addCase(resendVerificationCodeAsync.pending, (state) => {
        state.isResendingVerificationCode = true;
      })
      .addCase(resendVerificationCodeAsync.fulfilled, (state) => {
        state.isResendingVerificationCode = false;
      })
      .addCase(resendVerificationCodeAsync.rejected, (state) => {
        state.isResendingVerificationCode = false;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectSubscriptions = (state: RootState) => state.auth.subscriptions;
export const selectActiveSubscription = (state: RootState) => state.auth.userSubscriptions;

export const { logout, setUserLevel, resetUser } =
  authSlice.actions;
export default authSlice.reducer;
