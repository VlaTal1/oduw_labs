import Country from './country';

export type Manufacturer = {
  id: number | undefined,
  name: string,
  country: Country,
}