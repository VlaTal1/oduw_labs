import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {AppDispatch, RootState} from '../../../store/store';
import {loadAuction, loadLastBid} from '../../../store/thunks';
import './auctionDetails.scss';
import StatusInfo from '../../../types/bom/statusInfo';
import Input from '../../common/input/input';


const AuctionDetails = () => {
    const {auctionId} = useParams<Record<string, string>>();
    const dispatch = useDispatch<AppDispatch>();
    const auction = useSelector((state: RootState) => state.auctionSlice.auction);
    const loadAuctionStatus = useSelector((state: RootState) => state.auctionSlice.loadAuctionStatus);
    const {lastBid, loadLastBidStatus} = useSelector((state: RootState) => state.bidSlice);

    const [lastBidAmount, setLastBidAmount] = useState<number>(0);
    const [lastBidClient, setLastBidClient] = useState<string>('');
    const [clientId, setClientId] = useState<string>('');
    const [bidAmount, setBidAmount] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(loadAuction(Number(auctionId)));
    }, []);

    useEffect(() => {
        dispatch(loadLastBid(Number(auctionId)));
    }, [auction]);

    useEffect(() => {
        if (lastBid && lastBid.client) {
            setLastBidAmount(lastBid.amount);
            setLastBidClient(`${lastBid.client.id}`)
        }
    }, [lastBid]);

    useEffect(() => {
        if (auction && lastBid) {
            setBidAmount(`${lastBid.amount + auction.minBid}`);
        }
    }, [auction, lastBid]);

    useEffect(() => {
        if (!auction) {
            return;
        }
        
        const ws = new WebSocket('ws://localhost:8081/bid');
        setSocket(ws);

        ws.onmessage = (event) => {
            console.log(event.data);

            if (`${event.data}`.startsWith('Error:')) {
                setError(event.data.toString());
                return;
            }

            const response = JSON.parse(event.data);
            if (response.amount) {
                setLastBidAmount(Number(response.amount));
                if (auction && auction.minBid) {
                    setBidAmount(`${Number(response.amount) + auction.minBid}`);
                }
                setLastBidClient(response.clientId)
            }
        };
    }, [auction]);

    const handleClientIdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setClientId(e.currentTarget.value);
    };

    const handleBidAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBidAmount(e.currentTarget.value);
    };

    const handlePlaceBid = () => {
        if (socket && clientId && bidAmount && auctionId) {
            const bidData = {
                clientId,
                auctionId: Number(auctionId),
                amount: parseFloat(bidAmount),
            };

            socket.send(JSON.stringify(bidData));
        } else {
            console.error('Missing data or WebSocket connection');
        }
    };

    if (loadAuctionStatus == StatusInfo.DONE && loadLastBidStatus == StatusInfo.DONE && auction && lastBid) {
        return (
            <div className="auction-details-container container">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Link to="/auctions" className="button button--outlined">
                        See all auctions
                    </Link>
                    <div className="auction-details-name">
                        {auction.name}
                    </div>
                </div>
                <div className="auction-details-last-bid">
                    Last Bid: {lastBidAmount}
                </div>
                {lastBidClient && (
                    <div className="auction-details-last-bid">
                        Last Bid Client: {lastBidClient}
                    </div>
                )}
                <ul className="auction-details-info">
                    <li>Status: {auction.auctionStatus}</li>
                    <li>Minimal Bid: {auction.minBid}</li>
                    <li>Timeout: {auction.bidTimeoutSec}</li>
                    <li>Start Price: {auction.startPrice}</li>
                    <li>Start Time: {new Date(auction.startTime).toString()}</li>
                </ul>
                <Input label="Client ID" type="text" name="clientId" value={clientId} onClick={handleClientIdChange}/>
                <Input label={'Bid Amount'} type={'number'} name={'bidAmount'} value={bidAmount}
                       onClick={handleBidAmountChange}/>
                <button className="place-bid-btn" onClick={handlePlaceBid}>Place bid</button>
                {error && <div>{error}</div>}
            </div>
        );
    }

    return <h1>Loading...</h1>;
};

export default AuctionDetails;