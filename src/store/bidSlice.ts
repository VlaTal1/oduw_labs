import { createSlice } from '@reduxjs/toolkit';
import { Bid } from '../types/bom/bid';
import StatusInfo from '../types/bom/statusInfo';
import { loadLastBid } from './thunks';

interface BidSliceState {
  lastBid?: Bid;
  loadLastBidStatus?: StatusInfo;
  error?: string;
}

const bidSlice = createSlice({
  name: 'bidSlice',
  initialState: {
    lastBid: undefined,
    loadLastBidStatus: StatusInfo.NOT_LOADED,
    error: undefined
  } as BidSliceState,
  reducers: {
    resetState(state) {
      state.lastBid = undefined;
      state.loadLastBidStatus = StatusInfo.NOT_LOADED;
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLastBid.pending, (state) => {
        state.loadLastBidStatus = StatusInfo.LOADING;
        state.error = undefined;
      })
      .addCase(loadLastBid.fulfilled, (state, action) => {
        state.lastBid = action.payload;
        state.loadLastBidStatus = StatusInfo.DONE;
        state.error = undefined;
      })
      .addCase(loadLastBid.rejected, (state, action) => {
        state.loadLastBidStatus = StatusInfo.ERROR;
        state.error = action.payload;
      });
  }
});

export default bidSlice.reducer;
export const { resetState } = bidSlice.actions;
