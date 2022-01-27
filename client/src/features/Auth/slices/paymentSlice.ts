import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkCoupon,
  getPaymentMethods,
  removePaymentMethod,
  sendOrder,
  SendOrderPayload,
  setDefaultPayment,
  setPayment,
  updateOrder,
} from '../services/paymentService';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../../store/store';
import { IPayment, IPaymentMethod } from '../models/payment/paymentDetails';
import { IGetPaymentMethodsResponse } from '../models/getPaymentMethodsResponse';
import {
  IFailedPaymentMethod,
  IPaymentMethodResponse,
} from '../models/payment/paymentMethod';
import { ISetDefaultPaymentMethodResponse } from '../models/setDefaultPaymentMethodResponse';
import { IRemovePaymentMethodResponse } from '../models/removePaymentMethodResponse';
import { ISubscription } from '../models/payment/subscriptionModel';

interface UserState {
  isLoadingPayments: boolean;
  isLoading: boolean;
  isRetrying: boolean;
  checkoutDetails: IPayment[];
  paymentMethods: IPaymentMethodResponse[];
  selectedPaymentMethod: IPaymentMethodResponse;
  failedPaymentMethods: IFailedPaymentMethod[];
  subscriptions: ISubscription[];
  requiredConfirmation: boolean;
  paymentIntentId?: string;
  executeConfirmation: boolean;
  paymentResponsePayload: SendOrderPayload;
}

const initialState: UserState = {
  isLoadingPayments: false,
  isRetrying: false,
  isLoading: false,
  checkoutDetails: [],
  paymentMethods: [],
  failedPaymentMethods: [],
  selectedPaymentMethod: null,
  subscriptions: [],
  requiredConfirmation: false,
  paymentIntentId: null,
  executeConfirmation: false,
  paymentResponsePayload: null,
};

export interface OrderDetailsUpdate {
  newSubscriptionId?: number;
  addons?: number[];
  coupon?: string | undefined;
}

export interface OrderDetailsCreate {
  items: number[];
  coupon?: string | undefined;
}

interface Coupon {
  coupon: string;
}

export const getPaymentMethodsAsync = createAsyncThunk(
  'user/getPaymentMethods',
  async (): Promise<IGetPaymentMethodsResponse> => {
    const response = await getPaymentMethods();
    return response;
  },
);

export const setPaymentMethodAsync = createAsyncThunk(
  'user/payment_method',
  async (payment_method: string): Promise<IPaymentMethod> => {
    const response = await setPayment(payment_method);
    return response;
  },
);

export const removePaymentMethodAsync = createAsyncThunk(
  'user/remove_payment_method',
  async (paymentMethodId: string): Promise<IRemovePaymentMethodResponse> => {
    const response = await removePaymentMethod(paymentMethodId);
    return response;
  },
);

export const setDefaultPaymentMethodAsync = createAsyncThunk(
  'auth',
  async (
    default_payment_method: string,
  ): Promise<ISetDefaultPaymentMethodResponse> => {
    const response = await setDefaultPayment(default_payment_method);
    return response;
  },
);

export const setSendOrderAsync = createAsyncThunk<
SendOrderPayload,
OrderDetailsCreate
>(
  'subscription',
  async (orderDetails: OrderDetailsCreate): Promise<SendOrderPayload> => {
    const response = await sendOrder(orderDetails);
    return response;
  },
);

export const updateOrderAsync = createAsyncThunk<
any,
OrderDetailsUpdate | void
>(
  'update/subscription',
  async (orderDetails?: OrderDetailsUpdate): Promise<OrderDetailsUpdate> => {
    const response = await updateOrder(orderDetails);
    return response;
  },
);

export const checkCouponAsync = createAsyncThunk(
  'subscription/check-coupon',
  async (coupon: Coupon): Promise<Coupon> => {
    const response = await checkCoupon(coupon);
    return response;
  },
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetAddOns: (state) => {
      state.checkoutDetails = state.checkoutDetails.filter((detail) => detail.type !== 'ADD_ON');
    },
    resetSelectedProducts: (state) => {
      state.checkoutDetails = [];
    },
    setDataArray: (state, action) => {
      if (action.payload.type === 'MONTHLY') {
        state.checkoutDetails = state.checkoutDetails.filter(
          (detail) => detail.type !== 'MONTHLY',
        );
        state.checkoutDetails = state.checkoutDetails.concat(action.payload);
      } else {
        state.checkoutDetails = state.checkoutDetails.concat(action.payload);
      }
    },
    removeData: (state, action) => {
      state.checkoutDetails = state.checkoutDetails.filter(
        (detail) => detail.name !== action.payload,
      );
    },
    setSelectedPaymentMethod: (
      state,
      action: PayloadAction<IPaymentMethodResponse>,
    ) => {
      state.selectedPaymentMethod = action.payload;
    },
    resetConfirmationData: (state) => {
      state.executeConfirmation = false;
      state.paymentResponsePayload = null;
    },
    updateConfirmationData: (
      state,
      action: PayloadAction<SendOrderPayload>,
    ) => {
      const { payload } = action;
      state.executeConfirmation = true;
      state.paymentResponsePayload = payload;

      state.requiredConfirmation = payload.requiredConfirmation;
      state.paymentIntentId = payload.paymentIntentId;
    },
    addNewPaymentMethod: (state, payload: PayloadAction<{ paymentMethod }>) => {
      state.paymentMethods.push(payload.payload.paymentMethod);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethodsAsync.pending, (state) => {
        state.isLoadingPayments = true;
      })
      .addCase(getPaymentMethodsAsync.fulfilled, (state, action) => {
        const paymentMethodsData = action.payload.paymentMethods.data;
        const failedPayments = action.payload.failedPaymentMethods;
        state.failedPaymentMethods = failedPayments;
        state.paymentMethods = paymentMethodsData.map((pm) => {
          if (failedPayments.find((fp) => fp.payment_method === pm.id)) {
            pm.failed = true;
          } else {
            pm.failed = false;
          }
          return pm;
        })
          .sort((pm) => (pm.default ? -1 : 1));
        if (state.selectedPaymentMethod == null) {
          state.selectedPaymentMethod = paymentMethodsData.find(
            (pm) => pm.default === true,
          );
        }
        state.isLoadingPayments = false;
      })
      .addCase(getPaymentMethodsAsync.rejected, (state) => {
        state.isLoadingPayments = false;
      })
      .addCase(setPaymentMethodAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPaymentMethodAsync.fulfilled, (state, action) => {
        state.paymentMethods.push(action.payload.paymentMethod);
        state.isLoading = false;
      })
      .addCase(removePaymentMethodAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePaymentMethodAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.paymentMethods = state.paymentMethods.filter(
            (pm) => pm.id !== action.meta.arg,
          );
        }
        state.isLoading = false;
      })
      .addCase(removePaymentMethodAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setPaymentMethodAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setDefaultPaymentMethodAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setDefaultPaymentMethodAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.selectedPaymentMethod = state.paymentMethods.find(
            (pm) => pm.id === action.meta.arg,
          );
        }
        state.isLoading = false;
      })
      .addCase(setDefaultPaymentMethodAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setSendOrderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setSendOrderAsync.fulfilled, (state, action) => {
        const { payload } = action;
        state.executeConfirmation = true;
        state.paymentResponsePayload = payload;

        state.requiredConfirmation = payload.requiredConfirmation;
        state.paymentIntentId = payload.paymentIntentId;

        state.isLoading = false;
      })
      .addCase(setSendOrderAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        const { payload } = action;

        state.executeConfirmation = true;
        state.paymentResponsePayload = payload;
      })
      .addCase(updateOrderAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkCouponAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkCouponAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(checkCouponAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectCheckoutDetails = (state: RootState) => state.payment.checkoutDetails;
export const selectPaymentConfirmation = (state: RootState) => ({
  requiredConfirmation: state.payment.requiredConfirmation,
  paymentIntentId: state.payment.paymentIntentId,
});
export const selectPaymentConfirmationData = (state: RootState) => ({
  payload: state.payment.paymentResponsePayload,
  execute: state.payment.executeConfirmation,
});

export const selectPaymentMethods = (state: RootState) => state.payment.paymentMethods;

export const {
  setSelectedPaymentMethod,
  resetConfirmationData,
  updateConfirmationData,
  addNewPaymentMethod,
  resetAddOns,
  removeData,
  resetSelectedProducts,
} = paymentSlice.actions;

export default paymentSlice.reducer;
