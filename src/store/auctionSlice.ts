import {createSlice} from '@reduxjs/toolkit';
import {Auction} from '../types/bom/auction';
import StatusInfo from '../types/bom/statusInfo';
import {loadAuction, loadAuctions} from './thunks';

interface AuctionSliceState {
    auctions: Auction[];
    auction?: Auction;
    loadAuctionsStatus?: StatusInfo;
    loadAuctionStatus?: StatusInfo;
    error?: string;
}

const auctionSlice = createSlice({
    name: 'auctionSlice',
    initialState: {
        auctions: [],
        auction: undefined,
        loadAuctionsStatus: StatusInfo.NOT_LOADED,
        loadAuctionStatus: StatusInfo.NOT_LOADED,
        error: undefined
    } as AuctionSliceState,
    reducers: {
        resetState(state) {
            state.auctions = [];
            state.auction = undefined;
            state.loadAuctionsStatus = StatusInfo.NOT_LOADED;
            state.loadAuctionStatus = StatusInfo.NOT_LOADED;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAuctions.pending, (state) => {
                state.loadAuctionsStatus = StatusInfo.LOADING;
                state.error = undefined;
            })
            .addCase(loadAuctions.fulfilled, (state, action) => {
                state.auctions = action.payload.sort((a, b) => a.id - b.id);
                state.loadAuctionsStatus = StatusInfo.DONE;
                state.error = undefined;
            })
            .addCase(loadAuctions.rejected, (state, action) => {
                state.loadAuctionsStatus = StatusInfo.ERROR;
                state.error = action.payload;
            })
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
