import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {loadAuctions} from '../../../store/thunks';
import StatusInfo from '../../../types/bom/statusInfo';
import AuctionInfo from '../auctionInfo/auctionInfo';
import './auctions.scss'
import {Link} from "react-router-dom";

const Auctions = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {auctions, loadAuctionsStatus} = useSelector((state: RootState) => state.auctionSlice);

    useEffect(() => {
        dispatch(loadAuctions());
    }, []);

    if (loadAuctionsStatus !== StatusInfo.DONE) {
        return <h1>LOADING</h1>;
    }

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
            }}>
                <Link to="/" className="button button--outlined">
                    Back
                </Link>
                <h2 className='title-2'>Auctions</h2>
                <Link to="/auctions/create" className="button">
                    Create auction
                </Link>
            </div>
            <div className="auctions-container">
                {
                    auctions.length > 0 ? (
                        <div className="auctions-list">
                            {auctions.map((auction) => (
                                <AuctionInfo auction={auction}/>
                            ))}
                        </div>
                    ) : (
                        <h1>
                            NO AUCTIONS, <Link to="/">go back</Link>
                        </h1>
                    )
                }
            </div>
        </>
    );
};

export default Auctions;