import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store/store';
import { IConfig } from './config';
import { getConfigs } from './ConfigService';

interface ConfigState {
  isLoading: boolean;
  configMap: IConfig;
}

const initialState: ConfigState = {
  isLoading: false,
  configMap: {
    statuses: [],
    priorities: [],
    products: [],
    taskTypes: [],
    objects: [],
    expiryDate: null,
  },
};
export const getConfigsAsync = createAsyncThunk<IConfig>(
  'config/fetchConfigs',
  async (): Promise<IConfig> => getConfigs(),
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConfigsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.configMap = action.payload;
      });
  },
});

export const selectConfigMap = (state: RootState) => state.config.configMap;

export const selectStatuses = (state: RootState) => state.config.configMap.statuses
  .map((status) => ({ value: status.id, label: status.status }));

export const selectPriorities = (state: RootState) => state.config.configMap.priorities
  .map((priority) => ({
    value: priority.id,
    label: priority.priority,
    colorCode: priority.colorCode }));

export const selectObjects = (state: RootState) => state.config.configMap.objects
  .map((object) => ({ value: object.id, label: object.object }));

export const selectProducts = (state: RootState) => state.config.configMap.products
  .map((product) => ({ value: product.id, label: product.product }));

export const selectTaskTypes = (state: RootState) => state.config.configMap.taskTypes
  .map((taskType) => ({
    value: taskType.id,
    label: taskType.taskType,
    productId: taskType.productId,
  }));

export default configSlice.reducer;
