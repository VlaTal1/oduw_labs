import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useAddAuctionMutation} from "../../../graphql";
import {AuctionInput} from "../../../graphql/types";
import Input from "../../common/input/input";

const CreateAuction = () => {
    const [addAuction, {error}] = useAddAuctionMutation();

    const [auctionInput, setAuctionInput] = useState<AuctionInput>({
        name: '',
        vehicleId: '',
        bidTimeoutSec: 60,
        startPrice: 100.0,
        minBid: 10.0,
        startTime: new Date().toISOString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                flexDirection: 'column',
                gap: '20px',
            }}>

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
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '300px',
                }}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        label="Name"
                    />
                    <Input
                        type="text"
                        name="vehicleId"
                        placeholder="Vehicle ID"
                        onChange={handleChange}
                        required
                        label="Vehicle ID"
                    />
                    <Input
                        type="datetime-local"
                        name="startTime"
                        onChange={handleChange}
                        label="Start Time"
                        required
                    />
                    <Input
                        type="number"
                        name="bidTimeoutSec"
                        placeholder="Bid Timeout"
                        onChange={handleChange}
                        required
                        label="Bid Timeout"
                    />
                    <Input
                        type="number"
                        name="startPrice"
                        placeholder="Start Price"
                        onChange={handleChange}
                        required
                        label="Start Price"
                    />
                    <Input
                        type="number" name="minBid"
                        placeholder="Min Bid"
                        onChange={handleChange}
                        required
                        label="Min Bid"
                    />
                    <button type="submit" className="button" style={{
                        backgroundColor: '#4CAF50',
                    }}
                    >
                        Add Auction
                    </button>
                </form>
                {error && <p>Error: {error.message}</p>}
            </div>
        </>
    )
}

export default CreateAuction;