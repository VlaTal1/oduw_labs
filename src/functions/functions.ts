import { Color } from '../types/bom/color';
import Country from '../types/bom/country';
import { Manufacturer } from '../types/bom/manufacturer';
import { Model } from '../types/bom/model';
import VehicleFormType from '../types/vehicleFormType';
import { VehicleRequest } from '../types/vehicleRequest';

export const formVehicle = (vehicle: VehicleFormType) => {
  return {
    id: undefined,
    amount: vehicle.amount,
    model: {
      id: undefined,
      name: vehicle.model,
      manufacturer: {
        id: undefined,
        name: vehicle.manufacturer,
        country: {
          id: undefined,
          name: vehicle.country
        } as Country
      } as Manufacturer
    } as Model,
    color: {
      id: undefined,
      name: vehicle.color
    } as Color,
    price: vehicle.price,
    year: vehicle.year,
    isUsed: vehicle.used,
    type: vehicle.type
  } as VehicleRequest;
}