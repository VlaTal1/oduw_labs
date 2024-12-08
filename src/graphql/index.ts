import {ApolloClient, InMemoryCache} from "@apollo/client";

export const auctionClient = new ApolloClient({
    uri: 'http://localhost:8081',
    cache: new InMemoryCache(),
});