import VehicleType from './bom/VehicleType';

type VehicleFormType = {
  manufacturer: string,
  country: string,
  model: string,
  amount: number,
  color: string,
  price: number,
  year: number,
  used: boolean,
  type: VehicleType,
}

export default VehicleFormType;