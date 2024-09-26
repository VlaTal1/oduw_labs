import { combineReducers, configureStore } from '@reduxjs/toolkit';
import vehicleSlice from './vehicleSlice';

const rootReducer = combineReducers({ vehicleSlice });
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
