import {createSlice} from '@reduxjs/toolkit';
import {Auction} from '../types/bom/auction';
import StatusInfo from '../types/bom/statusInfo';
import {loadAuction} from './thunks';

interface AuctionSliceState {
    auction?: Auction;
    loadAuctionsStatus?: StatusInfo;
    loadAuctionStatus?: StatusInfo;
    error?: string;
}

const auctionSlice = createSlice({
    name: 'auctionSlice',
    initialState: {
        auction: undefined,
        loadAuctionsStatus: StatusInfo.NOT_LOADED,
        loadAuctionStatus: StatusInfo.NOT_LOADED,
        error: undefined
    } as AuctionSliceState,
    reducers: {
        resetState(state) {
            state.auction = undefined;
            state.loadAuctionsStatus = StatusInfo.NOT_LOADED;
            state.loadAuctionStatus = StatusInfo.NOT_LOADED;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAuction.pending, (state) => {
                state.loadAuctionStatus = StatusInfo.LOADING;
                state.error = undefined;
            })
            .addCase(loadAuction.fulfilled, (state, action) => {
                state.auction = action.payload;
                state.loadAuctionStatus = StatusInfo.DONE;
                state.error = undefined;
            })
            .addCase(loadAuction.rejected, (state, action) => {
                state.loadAuctionStatus = StatusInfo.ERROR;
                state.error = action.payload;
            });
    }
});

export default auctionSlice.reducer;
export const {resetState} = auctionSlice.actions;
