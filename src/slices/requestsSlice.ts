import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from 'slices/store';

import { mockData } from 'utils/mockData';

import { getMethodFilters } from 'slices/methodFiltersSlice';
import { getMaterialFilters } from 'slices/materialsFiltersSlice';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async () => {
    const response = await axios.get('/placeholder');
    return response.data;
  },
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: mockData.requests,
    loaded: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRequests.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loaded = true;
        state.requests = state.requests.concat(action.payload);
      });
  },
});

export const getAllRequests = createSelector(
  (state: RootState) => state.requests.requests,
  state => state,
);

export const getFilteredRequests = createSelector(
  getAllRequests,
  getMethodFilters,
  getMaterialFilters,
  (state: RootState) => state.status,
  (requests, methodFilters, materialFilters, statusFilter) => {
    if (!methodFilters.length && !materialFilters.length && !statusFilter) {
      return requests;
    }

    let filteredRequests = requests;

    if (methodFilters.length) {
      filteredRequests = filteredRequests.filter(r => {
        return r.method.some(m => methodFilters.includes(m));
      });
    }

    if (materialFilters.length) {
      filteredRequests = filteredRequests.filter(r => {
        return r.material.some(m => materialFilters.includes(m));
      });
    }

    if (statusFilter) {
      filteredRequests = filteredRequests.filter(r => r.status === '상담중');
    }

    return filteredRequests;
  },
);

export default requestsSlice.reducer;