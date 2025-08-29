import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import React from 'react';
import ReactDOM from 'react-dom/client';
import  App from './App';

// const query = gql`{
//   events(first: 5) {
//     id
//     eventId
//     name
//     baseTicketPrice
//     organizer
//     description
//   }
//   tickets(first: 5) {
//     id
//     ticketId
//     eventId
//     owner
//     ticketNumber
//   }
// }`
// const url = 'https://api.studio.thegraph.com/query/119676/event-ticketinng/version/latest'
// const headers = { Authorization: 'Bearer {api-key}' }

// export default function App() {
//   const { data, status } = useQuery({
//     queryKey: ['data'],
//     async queryFn() {
//       return await request(url, query, {}, headers)
//     }
//   })
//   return (
//     <main>
//       {status === 'pending' ? <div>Loading...</div> : null}
//       {status === 'error' ? <div>Error ocurred querying the Subgraph</div> : null}
//       <div>{JSON.stringify(data ?? {})}</div>
//     </main>
//   )
// }


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
      

//Privy API ID  cmex2rrfw01lxla0bhcfweq7r
//Privy API Secret raPiLmTGCEaXBQKgwerBxEsMXnfYzA4Qo2DFEjXtEiPEH5NEkQvihc1oMK46kUML5UjFH1VqAkfjzRnzcZ1oXNm