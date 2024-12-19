import React, {useEffect, useState} from 'react';
import './auctions.scss'
import {Link} from "react-router-dom";
import AuctionsList from "./AuctionsList";
import {GET_AUCTIONS, GET_AUCTIONS_BY_NAME} from "../../../graphql";
import {useLazyQuery} from "@apollo/client";
import Input from "../../common/input/input";

const Auctions = () => {
    const [fetchAllAuctions, {
        data: allAuctionsData,
        loading: allAuctionsLoading
    }] = useLazyQuery(GET_AUCTIONS);

    const [fetchAuctionsByName, {
        data: searchData,
        loading: searchLoading,
        error: searchError
    }] = useLazyQuery(GET_AUCTIONS_BY_NAME);

    const [isSearching, setIsSearching] = useState(false)

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setIsSearching(false)
            fetchAllAuctions()
        } else {
            setIsSearching(true)
            fetchAuctionsByName({variables: {name: searchTerm}});
        }
    };

    useEffect(() => {
        fetchAllAuctions();
    }, []);

    if (allAuctionsLoading || searchLoading) {
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

            <div style={{margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                    name="search"
                />
                <button className="button" onClick={handleSearch}>Search</button>
            </div>

            {searchError ? (
                <div>{searchError.message}</div>
            ) : (
                (allAuctionsData || searchData) && (
                    <AuctionsList auctions={isSearching ? searchData.auctionByName : allAuctionsData.auctions}/>
                )
            )}
        </>
    );
};

export default Auctions;