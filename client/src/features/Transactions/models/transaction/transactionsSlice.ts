import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IGetTransactionsFilter } from '../getTransactionsFilter.model';
import { IGetTransactionsResponse } from '../getTransactionsResponse.model';
import { ITransaction } from './transaction';
import { getTransactions, getUserTransactions } from './transactionService';

const LATEST_TRANSACTIONS_LIMIT = 3;
const CREATED_AT = 'createdAt';
const DESC = 'DESC';

interface TransactionsState {
  fetching: boolean;
  firstFetch: boolean;
  fetchingLatest: boolean;
  allTransactionsCount: number;
  allTransactions: ITransaction[];
  latestTransactions: ITransaction[];
}

const initialState: TransactionsState = {
  allTransactions: [],
  latestTransactions: [],
  firstFetch: true,
  allTransactionsCount: 0,
  fetching: false,
  fetchingLatest: false,
};
export const getAllTransactionsAsync = createAsyncThunk(
  'transactions/all',
  async (queryFilter: IGetTransactionsFilter): Promise<IGetTransactionsResponse> => {
    const response = await getTransactions(queryFilter);
    return response;
  },
);

export const getAllUserTransactionsAsync = createAsyncThunk(
  'transactions/allUser',
  async (queryFilter: IGetTransactionsFilter): Promise<IGetTransactionsResponse> => {
    const response = await getUserTransactions(queryFilter);
    return response;
  },
);

export const getLatestTransactionsAsync = createAsyncThunk(
  'knowledges/latest',
  async (): Promise<IGetTransactionsResponse> => {
    const latestQuery = {
      page: 1,
      limit: LATEST_TRANSACTIONS_LIMIT,
      sortBy: CREATED_AT,
      sortDirection: DESC,
    } as IGetTransactionsFilter;
    const response = await getTransactions(latestQuery);
    return response;
  },
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactionsAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getAllTransactionsAsync.fulfilled, (state, action) => {
        state.allTransactions = action.payload.rows;
        state.allTransactionsCount = action.payload.count;
        state.fetching = false;
        state.firstFetch = false;
      })
      .addCase(getAllTransactionsAsync.rejected, (state) => {
        state.fetching = false;
        state.firstFetch = false;
      })
      .addCase(getAllUserTransactionsAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getAllUserTransactionsAsync.fulfilled, (state, action) => {
        state.allTransactions = action.payload.rows;
        state.allTransactionsCount = action.payload.count;
        state.fetching = false;
      })
      .addCase(getAllUserTransactionsAsync.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(getLatestTransactionsAsync.pending, (state) => {
        state.fetchingLatest = true;
      })
      .addCase(getLatestTransactionsAsync.fulfilled, (state, action) => {
        state.latestTransactions = action.payload.rows;
        state.fetchingLatest = false;
      })
      .addCase(getLatestTransactionsAsync.rejected, (state) => {
        state.fetchingLatest = false;
      });
  },
});

export default transactionsSlice.reducer;
