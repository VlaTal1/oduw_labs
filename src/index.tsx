import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import App from './App';
import store from './store/store';
import {ApolloProvider} from "@apollo/client";
import {auctionClient} from "./graphql";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ApolloProvider client={auctionClient}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);
