import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Auction} from '../../../types/bom/auction';
import './auctionInfo.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store";
import {loadAuctions} from "../../../store/thunks";

interface Props {
    auction: Auction;
}

const AuctionInfo: FC<Props> = ({auction}) => {
    const storedAuction = useSelector((state: RootState) => state.auctionSlice.auctions.find(a => a.id === auction.id));
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const [isStarting, setIsStarting] = useState(false)

    const onStartAuction = () => {
        console.log('onStartAuction', storedAuction);
        setIsStarting(true);
        fetch(`http://localhost:8081/api/auctions/${auction.id}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storedAuction),
        }).then(_ => {
            setIsStarting(false);
            dispatch(loadAuctions());
        }).catch(error => {
            setIsStarting(false);
            console.error('error', error);
        })
    }

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
            <button
                disabled={isStarting}
                className="auction-more-btn"
                onClick={() => navigate(`/auction/${auction.id}`)}
            >
                More
            </button>
            <button
                disabled={isStarting}
                className="button"
                onClick={onStartAuction}
            >
                Start
            </button>
        </div>
    );
};

export default AuctionInfo;
