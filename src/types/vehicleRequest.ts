import { Color } from './bom/color';
import { Model } from './bom/model';
import VehicleType from './bom/VehicleType';

export type VehicleRequest = {
  id: number | undefined,
  amount: number,
  model: Model,
  color: Color,
  price: number,
  year: number,
  isUsed: boolean,
  type: VehicleType
}