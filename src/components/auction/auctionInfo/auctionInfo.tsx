import React, {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Auction} from '../../../types/bom/auction';
import './auctionInfo.scss'

interface Props {
    auction: Auction;
}

const AuctionInfo: FC<Props> = ({auction}) => {
    const navigate = useNavigate()

    const [isStarting, setIsStarting] = useState(false)
    const [isEnding, setIsEnding] = useState(false)

    const onStart = () => {
        setIsStarting(true);
        fetch(`http://localhost:8081/api/auctions/${auction.id}/start`, {
            method: 'POST',
        }).then(_ => {
            setIsStarting(false);
            alert('Auction started. Please refresh the page to see the changes');
        }).catch(error => {
            setIsStarting(false);
            console.error('error', error);
        })
    }

    const onEnd = () => {
        setIsEnding(true);
        fetch(`http://localhost:8081/api/auctions/${auction.id}/end`, {
            method: 'POST',
        }).then(_ => {
            setIsEnding(false);
            alert('Auction ended. Please refresh the page to see the changes');
        }).catch(error => {
            setIsEnding(false);
            console.error('error', error);
        })
    }

    return (
        <div className="auction-info-container">
            <div className="auction-info-name">
                {auction.id} - {auction.name}
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
            }}>
                <button
                    disabled={isStarting}
                    className="button"
                    onClick={onStart}
                    style={{flex: 1}}
                >
                    Start
                </button>
                <button
                    disabled={isEnding}
                    className="button"
                    style={{
                        flex: 1,
                        backgroundColor: 'darkred'
                    }}
                    onClick={onEnd}
                >
                    End
                </button>
            </div>
        </div>
    );
};

export default AuctionInfo;
