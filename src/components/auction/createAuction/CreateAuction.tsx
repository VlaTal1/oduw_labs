import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useAddAuctionMutation} from "../../../graphql";
import {AuctionInput} from "../../../graphql/types";

const CreateAuction = () => {
    const [addAuction, {error, data}] = useAddAuctionMutation();

    const [auctionInput, setAuctionInput] = useState<AuctionInput>({
        name: '',
        vehicleId: '',
        bidTimeoutSec: 60,
        startPrice: 100.0,
        minBid: 10.0,
        startTime: new Date().toISOString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAuctionInput(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Auction:', auctionInput);
        try {
            await addAuction({variables: {auction: auctionInput}});
            alert('Auction added successfully');
        } catch (err) {
            console.error('Error:', err);
        }
    };


    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
            }}>
                <Link to="/auctions" className="button">
                    Cancel
                </Link>
                <h2 className='title-2'>Create Auction</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required/>
                <input type="text" name="vehicleId" placeholder="Vehicle ID" onChange={handleChange} required/>
                <input type="datetime-local" name="startTime" onChange={handleChange}/>
                <input type="number" name="bidTimeoutSec" placeholder="Bid Timeout" onChange={handleChange} required/>
                <input type="number" name="startPrice" placeholder="Start Price" onChange={handleChange} required/>
                <input type="number" name="minBid" placeholder="Min Bid" onChange={handleChange} required/>
                <button type="submit">Add Auction</button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </>
    )
}

export default CreateAuction;