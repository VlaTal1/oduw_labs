import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Auction } from '../../../types/bom/auction';
import './auctionInfo.scss'

interface Props {
  auction: Auction;
}

const AuctionInfo: FC<Props> = ({ auction }) => {
  return (
    <div className="auction-info-container">
      <div className="auction-info-name">
        {auction.name}
      </div>
      <ul className="auction-info">
        <li>Status: {auction.auctionStatus}</li>
        <li>Minimal Bid: {auction.minBid}</li>
        <li>Timeout: {auction.bidTimeoutSec}</li>
        <li>Start Price: {auction.startPrice}</li>
        <li>Start Time: {new Date(auction.startTime).toString()}</li>
      </ul>
      <Link to={`/auction/${auction.id}`} className="auction-more-btn">
        More
      </Link>
    </div>
  );
};

export default AuctionInfo;
