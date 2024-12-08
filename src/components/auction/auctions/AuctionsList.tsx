import {Auction} from "../../../types/bom/auction";
import React from "react";
import AuctionInfo from "../auctionInfo/auctionInfo";

interface Props {
    auctions: Auction[];
}

const AuctionsList: React.FC<Props> = ({auctions}) => {
    if (auctions.length === 0) {
        return (
            <div className="auctions-container">
                <h1>NO AUCTIONS</h1>
            </div>
        );
    }

    return (
        <div className="auctions-container">
            <div className="auctions-list">
                {auctions.map((auction) => (
                    <AuctionInfo auction={auction}/>
                ))}
            </div>
        </div>
    );
}

export default AuctionsList;