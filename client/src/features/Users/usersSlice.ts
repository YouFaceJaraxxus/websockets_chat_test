import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store/store';
import { getUsers, deleteUser, blockUser, unblockUser } from './usersService';
import { IUser } from '../Auth/models/user/user';
import { IGetUsersResponse } from './models/getUsersResponse';
import { IGetUsersQuery } from './models/getUsersQuery';

interface IUsersState {
  isLoading: boolean;
  users: IUser[];
  count: number;
}

const initialState: IUsersState = {
  isLoading: false,
  users: [],
  count: 0,
};

export const getUsersAsync = createAsyncThunk(
  'users/get',
  async (query: IGetUsersQuery): Promise<IGetUsersResponse> => {
    const response = await getUsers(query);
    return response;
  },
);

export const deleteUserAsync = createAsyncThunk(
  'users/delete',
  async (userId: number): Promise<IUser> => {
    const response = await deleteUser(userId);
    return response;
  },
);

export const blockUserAsync = createAsyncThunk(
  'users/block',
  async (userId: number): Promise<IUser> => {
    const response = await blockUser(userId);
    return response;
  },
);

export const unblockUserAsync = createAsyncThunk(
  'users/unblock',
  async (userId: number): Promise<IUser> => {
    const response = await unblockUser(userId);
    return response;
  },
);

const handleEditUser = (state: IUsersState, editedUser: IUser) => {
  if (editedUser) {
    const index = state.users.findIndex((user) => user.id === editedUser.id);
    if (index !== -1) {
      state.users[index].status = editedUser.status;
    }
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.count = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        state.isLoading = false;
      })
      .addCase(deleteUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(blockUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUserAsync.fulfilled, (state, action) => {
        const editedUser = action.payload;
        handleEditUser(state, editedUser);
        state.isLoading = false;
      })
      .addCase(blockUserAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(unblockUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unblockUserAsync.fulfilled, (state, action) => {
        const editedUser = action.payload;
        handleEditUser(state, editedUser);
        state.isLoading = false;
      })
      .addCase(unblockUserAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
