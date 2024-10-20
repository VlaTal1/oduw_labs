import { Client } from './client';

export type Bid = {
  id: number,
  client: Client,
  amount: number
}