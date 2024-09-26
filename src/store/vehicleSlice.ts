import { createSlice } from '@reduxjs/toolkit';
import StatusInfo from '../types/bom/statusInfo';
import { Vehicle } from '../types/bom/vehicle';
import { deleteVehicle, loadVehicleById, loadVehicles, saveVehicle, updateVehicle } from './thunks';

interface VehicleSliceState {
  vehicles: Vehicle[];
  vehicle?: Vehicle;
  loadVehiclesStatus?: StatusInfo;
  loadVehicleStatus?: StatusInfo;
  saveVehicleStatus?: StatusInfo;
  updateVehicleStatus?: StatusInfo;
  deleteVehicleStatus?: StatusInfo;
  error?: string;
}

const vehicleSlice = createSlice({
  name: 'vehicleSlice',
  initialState: {
    vehicles: [],
    vehicle: undefined,
    loadVehiclesStatus: StatusInfo.NOT_LOADED,
    loadVehicleStatus: StatusInfo.NOT_LOADED,
    saveVehicleStatus: StatusInfo.NOT_LOADED,
    updateVehicleStatus: StatusInfo.NOT_LOADED,
    deleteVehicleStatus: StatusInfo.NOT_LOADED,
    error: undefined
  } as VehicleSliceState,
  reducers: {
    resetState(state) {
      state.vehicles = [];
      state.vehicle = undefined;
      state.loadVehiclesStatus = StatusInfo.NOT_LOADED;
      state.loadVehicleStatus = StatusInfo.NOT_LOADED;
      state.saveVehicleStatus = StatusInfo.NOT_LOADED;
      state.updateVehicleStatus = StatusInfo.NOT_LOADED;
      state.deleteVehicleStatus = StatusInfo.NOT_LOADED;
      state.error = undefined;
    },
    resetVehicle(state) {
      state.vehicle = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadVehicles.pending, (state) => {
        state.loadVehiclesStatus = StatusInfo.LOADING;
        state.error = undefined;
      })
      .addCase(loadVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload;
        state.loadVehiclesStatus = StatusInfo.DONE;
        state.error = undefined;
      })
      .addCase(loadVehicles.rejected, (state, action) => {
        state.loadVehiclesStatus = StatusInfo.ERROR;
        state.error = action.payload;
      })
      .addCase(loadVehicleById.pending, (state) => {
        state.loadVehicleStatus = StatusInfo.LOADING;
        state.error = undefined;
      })
      .addCase(loadVehicleById.fulfilled, (state, action) => {
        state.vehicle = action.payload
        state.loadVehicleStatus = StatusInfo.NOT_LOADED;
        state.error = undefined;
      })
      .addCase(loadVehicleById.rejected, (state, action) => {
        state.loadVehicleStatus = StatusInfo.ERROR;
        state.error = action.payload;
      })
      .addCase(saveVehicle.pending, (state) => {
        state.saveVehicleStatus = StatusInfo.LOADING;
        state.error = undefined;
      })
      .addCase(saveVehicle.fulfilled, (state, action) => {
        state.vehicles.push(action.payload);
        state.saveVehicleStatus = StatusInfo.NOT_LOADED;
        state.error = undefined;
      })
      .addCase(saveVehicle.rejected, (state, action) => {
        state.saveVehicleStatus = StatusInfo.ERROR;
        state.error = action.payload;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.updateVehicleStatus = StatusInfo.LOADING;
        state.error = undefined;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        const index = state.vehicles.findIndex(vehicle => vehicle.id === action.payload.id);
        if (index !== -1) {
          state.vehicles[index] = action.payload;
        } else {
          state.vehicles.push(action.payload);
        }
        state.updateVehicleStatus = StatusInfo.DONE;
        state.error = undefined;
      })

      .addCase(updateVehicle.rejected, (state, action) => {
        state.updateVehicleStatus = StatusInfo.ERROR;
        state.error = action.payload;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.deleteVehicleStatus = StatusInfo.LOADING;
        state.error = undefined;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload.id);
        state.deleteVehicleStatus = StatusInfo.DONE;
        state.error = undefined;
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.deleteVehicleStatus = StatusInfo.ERROR;
        state.error = action.payload;
      });
  }
});

export default vehicleSlice.reducer;
export const { resetVehicle } = vehicleSlice.actions;
