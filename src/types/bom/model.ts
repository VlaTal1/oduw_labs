import { Manufacturer } from './manufacturer';

export type Model = {
  id: number | undefined,
  name: string,
  manufacturer: Manufacturer
}