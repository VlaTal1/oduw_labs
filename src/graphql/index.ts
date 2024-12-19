import {ApolloClient, gql, InMemoryCache, useMutation} from "@apollo/client";

export const auctionClient = new ApolloClient({
    uri: 'http://localhost:8081/graphql',
    cache: new InMemoryCache(),
});

const ADD_AUCTION = gql`
    mutation AddAuction($auction: AuctionInput!) {
        addAuction(auction: $auction) {
            name
            vehicleId
            startTime
            bidTimeoutSec
            startPrice
            minBid
        }
    }
`

export const GET_AUCTIONS = gql`
    query GetAuctions {
        auctions {
            id
            name
            vehicleId
            startTime
            bidTimeoutSec
            startPrice
            minBid
            auctionStatus
        }
    }
`

export const GET_AUCTIONS_BY_NAME = gql`
    query GetAuctionsByName($name: String!) {
        auctionByName(name: $name) {
            id
            name
            vehicleId
            startTime
            bidTimeoutSec
            startPrice
            minBid
            auctionStatus
        }
    }
`

export const useAddAuctionMutation = () => {
    return useMutation(ADD_AUCTION, {
        client: auctionClient,
    });
}