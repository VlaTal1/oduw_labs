import { AuctionStatus } from './auctionStatus';

export type Auction = {
  id: number;
  name: string;
  vehicleId: number;
  startTime: Date;
  bidTimeoutSec: number;
  startPrice: number;
  minBid: number;
  auctionStatus: AuctionStatus;
}