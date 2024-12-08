import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auction = {
  __typename?: 'Auction';
  auctionStatus: AuctionStatus;
  bidTimeoutSec: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  minBid: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  startPrice: Scalars['Float']['output'];
  startTime: Scalars['String']['output'];
  vehicleId: Scalars['ID']['output'];
};

export type AuctionInput = {
  bidTimeoutSec: Scalars['Int']['input'];
  minBid: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  startPrice: Scalars['Float']['input'];
  startTime?: InputMaybe<Scalars['String']['input']>;
  vehicleId: Scalars['ID']['input'];
};

export type AuctionSearchInput = {
  auctionStatus?: InputMaybe<Scalars['String']['input']>;
  bidTimeoutSec?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  minBid?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startPrice?: InputMaybe<Scalars['Float']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['Int']['input']>;
};

export enum AuctionStatus {
  Closed = 'CLOSED',
  Ended = 'ENDED',
  Opened = 'OPENED',
  Started = 'STARTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAuction?: Maybe<Auction>;
};


export type MutationAddAuctionArgs = {
  auction?: InputMaybe<AuctionInput>;
};

export type Query = {
  __typename?: 'Query';
  searchAuctions?: Maybe<Array<Maybe<Auction>>>;
};


export type QuerySearchAuctionsArgs = {
  input?: InputMaybe<AuctionSearchInput>;
};
