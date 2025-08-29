// src/graphql/queries.js

import { gql } from 'graphql-request';

// This is the subgraph URL you provided in your request.
export const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/119676/event-ticketinng/version/latest';

// The GraphQL query you provided.
export const GET_ALL_DATA = gql`{
  events(first: 5) {
    id
    eventId
    name
    description
    organizer
    ticketPrice
    totalTickets
    ticketsSold
  }
  tickets(first: 5) {
    id
    ticketId
    eventId
    ticketNumber
    owner
  }
}`;