import {ApolloClient, gql, InMemoryCache, useMutation, useQuery} from "@apollo/client";

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

const GET_AUCTIONS = gql`
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

export const useAddAuctionMutation = () => {
    return useMutation(ADD_AUCTION, {
        client: auctionClient,
    });
}

export const useGetAuctionsQuery = () => {
    return useQuery(GET_AUCTIONS, {
        client: auctionClient,
    });
}