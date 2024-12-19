import {createAsyncThunk} from '@reduxjs/toolkit';
import {Auction} from '../types/bom/auction';
import {Bid} from '../types/bom/bid';
import {Vehicle} from '../types/bom/vehicle';
import {VehicleRequest} from '../types/vehicleRequest';

export const loadVehicles = createAsyncThunk<Vehicle[], void, { rejectValue: string }>(
    'loadVehicles',
    async (_, {rejectWithValue}) => {
        try {
            const url = `http://localhost:8080/api/vehicle/`;
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
                return rejectWithValue(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    });

export const loadVehicleById = createAsyncThunk<Vehicle, number, { rejectValue: string }>(
    'loadVehicleById',
    async (vehicleId, {rejectWithValue}) => {
        try {
            const url = `http://localhost:8080/api/vehicle/${vehicleId}`;
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
                return rejectWithValue(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    });

export const saveVehicle = createAsyncThunk<Vehicle, VehicleRequest, { rejectValue: string }>(
    'saveVehicle',
    async (vehicle, {rejectWithValue}) => {
        try {
            const url = `http://localhost:8080/api/vehicle/`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicle),
            });
            if (!response.ok) {
                return rejectWithValue(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    });

export const updateVehicle = createAsyncThunk<Vehicle, VehicleRequest, { rejectValue: string }>(
    'updateVehicle',
    async (vehicle, {rejectWithValue}) => {
        try {
            const url = `http://localhost:8080/api/vehicle/${vehicle.id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicle),
            });
            if (!response.ok) {
                return rejectWithValue(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    });

export const deleteVehicle = createAsyncThunk<Vehicle, number, { rejectValue: string }>(
    'deleteVehicle',
    async (vehicleId, {rejectWithValue}) => {
        try {
            const url = `http://localhost:8080/api/vehicle/${vehicleId}`;
            const response = await fetch(url, {method: 'DELETE'});
            if (!response.ok) {
                return rejectWithValue(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    });

export const loadAuction = createAsyncThunk<Auction, number, { rejectValue: string }>(
    'loadAuction',
    async (auctionId, {rejectWithValue}) => {
        try {
            const url = `http://localhost:8081/api/auctions/${auctionId}`;
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
                return rejectWithValue(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    });

export const loadLastBid = createAsyncThunk<Bid, number, { rejectValue: string }>(
    'loadLastBid',
    async (auctionId, {rejectWithValue}) => {
        try {
            const url = `http://localhost:8081/api/bid/auction/${auctionId}/lastBid`;
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
                return rejectWithValue(`Response is ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(`Failed to get data from server. ${(error as Error).message}`);
        }
    });