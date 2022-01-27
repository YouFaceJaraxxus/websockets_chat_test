import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICreateKnowledge } from '../createKnowledge';
import { IGetKnowledgesFilter } from '../getKnowledgesFilter.model';
import { IKnowledge } from './knowledge';
import {
  createKnowledge,
  deleteKnowledge,
  getKnowledges,
} from './knowledgeService';

interface KnowledgesState {
  fetching: boolean;
  creating: boolean;
  knowledges: IKnowledge[];
  isLoading: boolean;
}

const initialState: KnowledgesState = {
  knowledges: [],
  fetching: false,
  creating: false,
  isLoading: false,
};
export const getKnowledgesAsync = createAsyncThunk(
  'knowledges/fetchKnowledges',
  async (queryFilter: IGetKnowledgesFilter): Promise<IKnowledge[]> => {
    const response = await getKnowledges(queryFilter);
    return response;
  },
);
export const createKnowledgeAsync = createAsyncThunk(
  'knowledges/createKnowledge',
  async (knowledge: ICreateKnowledge): Promise<IKnowledge> => {
    const response = await createKnowledge(knowledge);
    return response;
  },
);

export const deleteKnowledgeAsync = createAsyncThunk(
  'knowledges/deleteKnowledge',
  async (knowledgeId: number): Promise<IKnowledge> => {
    const response = await deleteKnowledge(knowledgeId);
    return response;
  },
);

const knowledgeSlice = createSlice({
  name: 'knowledges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKnowledgesAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getKnowledgesAsync.fulfilled, (state, action) => {
        state.knowledges = action.payload;
        state.fetching = false;
      })
      .addCase(getKnowledgesAsync.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(createKnowledgeAsync.pending, (state) => {
        state.creating = true;
      })
      .addCase(createKnowledgeAsync.fulfilled, (state, action) => {
        state.knowledges = [action.payload, ...state.knowledges];
        state.creating = false;
      })
      .addCase(createKnowledgeAsync.rejected, (state) => {
        state.creating = false;
      })
      .addCase(deleteKnowledgeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteKnowledgeAsync.fulfilled, (state, action) => {
        state.knowledges = state.knowledges.filter(
          (knowledge) => knowledge.id !== action.meta.arg,
        );
        state.isLoading = false;
      })
      .addCase(deleteKnowledgeAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default knowledgeSlice.reducer;
