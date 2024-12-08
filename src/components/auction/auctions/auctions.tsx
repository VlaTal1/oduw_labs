import {useEffect} from 'react';
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

    if (auctions.length === 0) {
        return <h1>NO AUCTIONS, <Link to="/">go back</Link></h1>;
    }

    return (
        <div className="auctions-list container">
            {auctions.map((auction) => (<AuctionInfo auction={auction}/>))}
        </div>
    );
};

export default Auctions;