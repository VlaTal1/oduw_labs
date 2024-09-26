import { Color } from './color';
import { Model } from './model';
import VehicleType from './VehicleType';

export type Vehicle = {
  id: number | undefined,
  amount: number,
  model: Model,
  color: Color,
  price: number,
  year: number,
  used: boolean,
  type: VehicleType
}