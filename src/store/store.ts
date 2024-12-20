import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auctionSlice from './auctionSlice';
import bidSlice from './bidSlice';
import vehicleSlice from './vehicleSlice';

const rootReducer = combineReducers({ vehicleSlice, auctionSlice, bidSlice });
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
