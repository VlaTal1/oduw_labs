import React from 'react';
import './auctions.scss'
import {Link} from "react-router-dom";
import AuctionsList from "./AuctionsList";
import {useGetAuctionsQuery} from "../../../graphql";

const Auctions = () => {
    const {loading, data} = useGetAuctionsQuery()

    if (loading) {
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
            <AuctionsList auctions={data.auctions}/>
        </>
    );
};

export default Auctions;