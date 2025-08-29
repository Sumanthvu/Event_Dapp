// // src/components/EventList.jsx
// import React from 'react';
// import { BrowserProvider, Contract, formatEther } from 'ethers';
// import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

// /**
//  * Component to display a list of available events.
//  * @param {object} props - The component props.
//  * @param {Array} props.events - The list of events to display.
//  * @param {string} props.currentAccount - The current connected wallet address.
//  * @param {Function} props.setLoading - Function to set the loading state.
//  * @param {Function} props.setMessage - Function to set the message displayed to the user.
//  * @param {Function} props.refetch - Function to refetch data from the subgraph.
//  * @param {Function} props.formatAddress - Helper function to format an Ethereum address.
//  */
// const EventList = ({ events, currentAccount, setLoading, setMessage, refetch, formatAddress }) => {
//   const handleBuyTicket = async (event) => {
//     if (!currentAccount) {
//       setMessage("Please connect your wallet to buy a ticket.");
//       return;
//     }
    
//     setLoading(true);
//     setMessage('');
    
//     try {
//       const { ethereum } = window;
//       if (!ethereum) {
//         setMessage("MetaMask not detected.");
//         setLoading(false);
//         return;
//       }
      
//       const provider = new BrowserProvider(ethereum);
//       const signer = await provider.getSigner();
      
//       const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
//       const ticketPriceInWei = event.baseTicketPrice;
      
//       // Send the transaction with the correct value
//       const tx = await eventContract.buyTicket(event.eventId, {
//         value: ticketPriceInWei
//       });
      
//       setMessage("Transaction sent. Waiting for confirmation...");
//       await tx.wait(); // Wait for the transaction to be mined
      
//       setMessage("Ticket purchased successfully!");
      
//       // Refetch data from the subgraph to show updated ticket counts
//       if (refetch && typeof refetch === 'function') {
//         await refetch();
//       }
      
//     } catch (error) {
//       console.error("Error buying ticket:", error);
//       setMessage(`Failed to buy ticket. Error: ${error.reason || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isTicketAvailable = (event) => {
//     const soldTickets = parseInt(event.soldTickets || 0);
//     const totalTickets = parseInt(event.totalTickets || 0);
//     return soldTickets < totalTickets;
//   };

//   const isOrganizer = (event) => {
//     return currentAccount && event.organizer && 
//            event.organizer.toLowerCase() === currentAccount.toLowerCase();
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return 'TBD';
//     const date = new Date(parseInt(timestamp) * 1000);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
//   };

//   return (
//     <div className="event-list">
//       <h2>Available Events</h2>
//       <div className="event-grid">
//         {events && events.length > 0 ? (
//           events.map((event) => (
//             <div key={event.id} className="event-card">
//               {/* Event Header */}
//               <div className="event-card-header">
//                 <h3 className="event-name">{event.name || 'Unnamed Event'}</h3>
//                 <p className="event-description">
//                   {event.description || 'No description available'}
//                 </p>
//               </div>

//               {/* Event Details */}
//               <div className="event-card-body">
//                 <div className="event-details">
//                   <div className="event-detail-item">
//                     <span className="detail-label">Organizer:</span>
//                     <span className="detail-value organizer-value">
//                       {formatAddress(event.organizer)}
//                     </span>
//                   </div>
                  
//                   <div className="event-detail-item">
//                     <span className="detail-label">Ticket Price:</span>
//                     <span className="detail-value price-value">
//                       {formatEther(event.baseTicketPrice || '0')} ETH
//                     </span>
//                   </div>
                  
//                   <div className="event-detail-item">
//                     <span className="detail-label">Tickets Available:</span>
//                     <span className="detail-value tickets-value">
//                       {event.soldTickets || 0} / {event.totalTickets || 0}
//                     </span>
//                   </div>
                  
//                   {event.venue && (
//                     <div className="event-detail-item">
//                       <span className="detail-label">Venue:</span>
//                       <span className="detail-value">{event.venue}</span>
//                     </div>
//                   )}
                  
//                   {event.date && (
//                     <div className="event-detail-item">
//                       <span className="detail-label">Date:</span>
//                       <span className="detail-value">{formatDate(event.date)}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Event Actions */}
//               <div className="event-card-footer">
//                 {isOrganizer(event) ? (
//                   <div className="organizer-badge">
//                     You are the organizer
//                   </div>
//                 ) : (
//                   isTicketAvailable(event) ? (
//                     <button
//                       onClick={() => handleBuyTicket(event)}
//                       className="event-action-button buy-ticket-button"
//                     >
//                       Buy Ticket
//                     </button>
//                   ) : (
//                     <button className="event-action-button sold-out-button" disabled>
//                       Sold Out
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="empty-events">
//             <p>No events found. Be the first to create one!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventList;



// src/components/EventList.jsx
import React from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

/**
 * Component to display a list of available events.
 * @param {object} props - The component props.
 * @param {Array} props.events - The list of events to display.
 * @param {string} props.currentAccount - The current connected wallet address.
 * @param {Function} props.setLoading - Function to set the loading state.
 * @param {Function} props.setMessage - Function to set the message displayed to the user.
 * @param {Function} props.refetch - Function to refetch data from the subgraph.
 * @param {Function} props.formatAddress - Helper function to format an Ethereum address.
 */
const EventList = ({ events, currentAccount, setLoading, setMessage, refetch, formatAddress }) => {
  const handleBuyTicket = async (event) => {
    if (!currentAccount) {
      setMessage("Please connect your wallet to buy a ticket.");
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setMessage("MetaMask not detected.");
        setLoading(false);
        return;
      }
      
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      
      const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      // 1. Get the current ticket price from the smart contract
      // The `ticketPrice` function in the contract calculates the price based on soldTickets.
      const currentTicketPrice = await eventContract.ticketPrice(event.eventId);
      
      // 2. The smart contract's `buyTicket` function also applies a discount.
      // Although you could try to recalculate the discount on the frontend,
      // it's more reliable to send a slighty higher value to account for any
      // potential changes or to just be safe.
      // The `buyTicket` function returns any overpayment, so it's safe to send more.
      
      // We will send the exact price returned by the contract's `ticketPrice` function.
      const ticketPriceInWei = currentTicketPrice;
      
      // Send the transaction with the correct value
      const tx = await eventContract.buyTicket(event.eventId, {
        value: ticketPriceInWei
      });
      
      setMessage("Transaction sent. Waiting for confirmation...");
      await tx.wait(); // Wait for the transaction to be mined
      
      setMessage("Ticket purchased successfully!");
      
      // Refetch data from the subgraph to show updated ticket counts
      if (refetch && typeof refetch === 'function') {
        await refetch();
      }
      
    } catch (error) {
      console.error("Error buying ticket:", error);
      setMessage(`Failed to buy ticket. Error: ${error.reason || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isTicketAvailable = (event) => {
    const soldTickets = parseInt(event.soldTickets || 0);
    const totalTickets = parseInt(event.totalTickets || 0);
    return soldTickets < totalTickets;
  };

  const isOrganizer = (event) => {
    return currentAccount && event.organizer && 
              event.organizer.toLowerCase() === currentAccount.toLowerCase();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'TBD';
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="event-list">
      <h2>Available Events</h2>
      <div className="event-grid">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              {/* Event Header */}
              <div className="event-card-header">
                <h3 className="event-name">{event.name || 'Unnamed Event'}</h3>
                <p className="event-description">
                  {event.description || 'No description available'}
                </p>
              </div>

              {/* Event Details */}
              <div className="event-card-body">
                <div className="event-details">
                  <div className="event-detail-item">
                    <span className="detail-label">Organizer:</span>
                    <span className="detail-value organizer-value">
                      {formatAddress(event.organizer)}
                    </span>
                  </div>
                  
                  {/* The ticket price shown here is the base price. */}
                  {/* The actual price might be higher due to the increment logic in the contract. */}
                  {/* You could add a helper function here to display the current price. */}
                  <div className="event-detail-item">
                    <span className="detail-label">Ticket Price:</span>
                    <span className="detail-value price-value">
                      {formatEther(event.baseTicketPrice || '0')} ETH
                    </span>
                  </div>
                  
                  <div className="event-detail-item">
                    <span className="detail-label">Tickets Available:</span>
                    <span className="detail-value tickets-value">
                      {event.soldTickets || 0} / {event.totalTickets || 0}
                    </span>
                  </div>
                  
                  {event.venue && (
                    <div className="event-detail-item">
                      <span className="detail-label">Venue:</span>
                      <span className="detail-value">{event.venue}</span>
                    </div>
                  )}
                  
                  {event.date && (
                    <div className="event-detail-item">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{formatDate(event.date)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Actions */}
              <div className="event-card-footer">
                {isOrganizer(event) ? (
                  <div className="organizer-badge">
                    You are the organizer
                  </div>
                ) : (
                  isTicketAvailable(event) ? (
                    <button
                      onClick={() => handleBuyTicket(event)}
                      className="event-action-button buy-ticket-button"
                    >
                      Buy Ticket
                    </button>
                  ) : (
                    <button className="event-action-button sold-out-button" disabled>
                      Sold Out
                    </button>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-events">
            <p>No events found. Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;