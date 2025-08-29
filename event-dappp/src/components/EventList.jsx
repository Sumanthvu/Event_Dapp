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
// import React from 'react';
// import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
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
      
//       // 1. Get the current ticket price from the smart contract
//       // The `ticketPrice` function in the contract calculates the price based on soldTickets.
//       const currentTicketPrice = await eventContract.ticketPrice(event.eventId);
      
//       // 2. The smart contract's `buyTicket` function also applies a discount.
//       // Although you could try to recalculate the discount on the frontend,
//       // it's more reliable to send a slighty higher value to account for any
//       // potential changes or to just be safe.
//       // The `buyTicket` function returns any overpayment, so it's safe to send more.
      
//       // We will send the exact price returned by the contract's `ticketPrice` function.
//       const ticketPriceInWei = currentTicketPrice;
      
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
//               event.organizer.toLowerCase() === currentAccount.toLowerCase();
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
                  
//                   {/* The ticket price shown here is the base price. */}
//                   {/* The actual price might be higher due to the increment logic in the contract. */}
//                   {/* You could add a helper function here to display the current price. */}
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




// // src/components/EventList.jsx
// import React from 'react';
// import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
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
      
//       // 1. Get the current ticket price from the smart contract
//       // The `ticketPrice` function in the contract calculates the price based on soldTickets.
//       const currentTicketPrice = await eventContract.ticketPrice(event.eventId);
      
//       // 2. The smart contract's `buyTicket` function also applies a discount.
//       // Although you could try to recalculate the discount on the frontend,
//       // it's more reliable to send a slighty higher value to account for any
//       // potential changes or to just be safe.
//       // The `buyTicket` function returns any overpayment, so it's safe to send more.
      
//       // We will send the exact price returned by the contract's `ticketPrice` function.
//       const ticketPriceInWei = currentTicketPrice;
      
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
//               event.organizer.toLowerCase() === currentAccount.toLowerCase();
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return 'TBD';
//     const date = new Date(parseInt(timestamp) * 1000);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
//   };

//   // Helper function to get IPFS image URL
//   const getIPFSImageURL = (ipfsHash) => {
//     if (!ipfsHash) return null;
//     // Use Pinata's gateway or IPFS.io gateway
//     return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
//     // Alternative gateway: return `https://ipfs.io/ipfs/${ipfsHash}`;
//   };

//   // Event card styles
//   const eventCardStyle = {
//     border: '1px solid #e0e0e0',
//     borderRadius: '12px',
//     padding: '20px',
//     margin: '16px 0',
//     backgroundColor: '#fff',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px'
//   };

//   const eventImageStyle = {
//     width: '100%',
//     height: '200px',
//     objectFit: 'cover',
//     borderRadius: '8px',
//     backgroundColor: '#f5f5f5'
//   };

//   const eventHeaderStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   };

//   const eventNameStyle = {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     color: '#333',
//     margin: '0'
//   };

//   const eventDescriptionStyle = {
//     color: '#666',
//     fontSize: '0.9rem',
//     lineHeight: '1.4'
//   };

//   const eventDetailsStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '12px'
//   };

//   const detailItemStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '8px 0'
//   };

//   const detailLabelStyle = {
//     fontWeight: '600',
//     color: '#555'
//   };

//   const detailValueStyle = {
//     color: '#333'
//   };

//   const buttonStyle = {
//     padding: '12px 24px',
//     borderRadius: '8px',
//     border: 'none',
//     fontWeight: '600',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     transition: 'all 0.2s ease'
//   };

//   const buyButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: '#007bff',
//     color: 'white'
//   };

//   const soldOutButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: '#6c757d',
//     color: 'white',
//     cursor: 'not-allowed'
//   };

//   const organizerBadgeStyle = {
//     ...buttonStyle,
//     backgroundColor: '#28a745',
//     color: 'white',
//     cursor: 'default'
//   };

//   return (
//     <div className="event-list">
//       <h2>Available Events</h2>
//       <div className="event-grid">
//         {events && events.length > 0 ? (
//           events.map((event) => (
//             <div key={event.id} style={eventCardStyle}>
//               {/* Event Image */}
//               {event.imageIPFS && (
//                 <div>
//                   <img 
//                     src={getIPFSImageURL(event.imageIPFS)} 
//                     alt={event.name || 'Event Image'}
//                     style={eventImageStyle}
//                     onError={(e) => {
//                       // Fallback to placeholder if image fails to load
//                       e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzVMMTI1IDEwMEgxMTJWMTI1SDg4VjEwMEg3NUwxMDAgNzVaIiBmaWxsPSIjQ0NDIi8+CjwvZ3ZnPgo=';
//                     }}
//                   />
//                 </div>
//               )}

//               {/* Event Header */}
//               <div style={eventHeaderStyle}>
//                 <h3 style={eventNameStyle}>{event.name || 'Unnamed Event'}</h3>
//                 <p style={eventDescriptionStyle}>
//                   {event.description || 'No description available'}
//                 </p>
//               </div>

//               {/* Event Details */}
//               <div style={eventDetailsStyle}>
//                 <div style={detailItemStyle}>
//                   <span style={detailLabelStyle}>Organizer:</span>
//                   <span style={detailValueStyle}>
//                     {formatAddress(event.organizer)}
//                   </span>
//                 </div>
                
//                 {/* The ticket price shown here is the base price. */}
//                 {/* The actual price might be higher due to the increment logic in the contract. */}
//                 <div style={detailItemStyle}>
//                   <span style={detailLabelStyle}>Ticket Price:</span>
//                   <span style={detailValueStyle}>
//                     {formatEther(event.baseTicketPrice || '0')} ETH
//                   </span>
//                 </div>
                
//                 <div style={detailItemStyle}>
//                   <span style={detailLabelStyle}>Tickets Available:</span>
//                   <span style={detailValueStyle}>
//                     {event.soldTickets || 0} / {event.totalTickets || 0}
//                   </span>
//                 </div>
                
//                 {event.venue && (
//                   <div style={detailItemStyle}>
//                     <span style={detailLabelStyle}>Venue:</span>
//                     <span style={detailValueStyle}>{event.venue}</span>
//                   </div>
//                 )}
                
//                 {event.date && (
//                   <div style={detailItemStyle}>
//                     <span style={detailLabelStyle}>Date:</span>
//                     <span style={detailValueStyle}>{formatDate(event.date)}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Event Actions */}
//               <div className="event-card-footer">
//                 {isOrganizer(event) ? (
//                   <div style={organizerBadgeStyle}>
//                     You are the organizer
//                   </div>
//                 ) : (
//                   isTicketAvailable(event) ? (
//                     <button
//                       onClick={() => handleBuyTicket(event)}
//                       style={buyButtonStyle}
//                       onMouseOver={(e) => {
//                         e.target.style.backgroundColor = '#0056b3';
//                       }}
//                       onMouseOut={(e) => {
//                         e.target.style.backgroundColor = '#007bff';
//                       }}
//                     >
//                       Buy Ticket
//                     </button>
//                   ) : (
//                     <button style={soldOutButtonStyle} disabled>
//                       Sold Out
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="empty-events">
//             <p>No events found. Be the first to create one</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventList;









// src/components/EventList.jsx
import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

/**
 * Component to display a list of available events with dynamic pricing.
 */
const EventList = ({ events, currentAccount, setLoading, setMessage, refetch, formatAddress, wallets, authenticated }) => {
  const [dynamicPrices, setDynamicPrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState({});

  // Function to fetch dynamic price for a specific event
  const fetchDynamicPrice = async (eventId) => {
    if (!authenticated || wallets.length === 0) return;

    setLoadingPrices(prev => ({ ...prev, [eventId]: true }));
    
    try {
      const wallet = wallets[0];
      
      // For Privy, use the correct provider method
      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new BrowserProvider(provider);
      
      const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersProvider);
      const currentPrice = await eventContract.ticketPrice(eventId);
      
      setDynamicPrices(prev => ({
        ...prev,
        [eventId]: currentPrice
      }));
    } catch (error) {
      console.error(`Error fetching price for event ${eventId}:`, error);
    } finally {
      setLoadingPrices(prev => ({ ...prev, [eventId]: false }));
    }
  };

  // Fetch dynamic prices for all events when component mounts or events change
  useEffect(() => {
    if (events && events.length > 0 && authenticated && wallets.length > 0) {
      events.forEach(event => {
        fetchDynamicPrice(event.eventId);
      });
    }
  }, [events, authenticated, wallets]);

  // Function to calculate dynamic price display (for showing the logic to users)
  const calculateDynamicPrice = (basePrice, soldTickets) => {
    try {
      // Work directly with Wei to avoid floating point precision issues
      // eslint-disable-next-line no-undef
      const basePriceWei = BigInt(basePrice.toString());
      // eslint-disable-next-line no-undef
      const n = BigInt(soldTickets + 1);
      // eslint-disable-next-line no-undef
      const increment = (basePriceWei * n) / BigInt(1000); // 0.1% increment
      return (basePriceWei + increment).toString();
    } catch (error) {
      console.error('Error calculating dynamic price:', error);
      return basePrice.toString();
    }
  };

  const handleBuyTicket = async (event) => {
    if (!currentAccount) {
      setMessage("Please connect your wallet to buy a ticket.");
      return;
    }

    if (!authenticated || wallets.length === 0) {
      setMessage("Please ensure your wallet is connected via Privy.");
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const wallet = wallets[0];
      
      // Ensure we're on the right chain
      if (wallet.chainId !== 11155111) { // Sepolia chain ID
        await wallet.switchChain(11155111);
      }
      
      // Get provider and signer using Privy's correct methods
      const provider = await wallet.getEthereumProvider();
      const ethersProvider = new BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      
      const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      // Get the current dynamic ticket price from the smart contract
      const currentTicketPrice = await eventContract.ticketPrice(event.eventId);
      
      console.log(`Dynamic price for event ${event.eventId}:`, formatEther(currentTicketPrice), 'ETH');
      
      // Send the transaction with the dynamic price
      const tx = await eventContract.buyTicket(event.eventId, {
        value: currentTicketPrice
      });
      
      setMessage("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      
      setMessage("Ticket purchased successfully!");
      
      // Refetch the dynamic price for this event after purchase
      await fetchDynamicPrice(event.eventId);
      
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

  // Helper function to get IPFS image URL
  const getIPFSImageURL = (ipfsHash) => {
    if (!ipfsHash) return null;
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  };

  // Get the price to display (dynamic if available, otherwise calculated)
  const getPriceToDisplay = (event) => {
    const eventId = event.eventId;
    
    if (dynamicPrices[eventId]) {
      return formatEther(dynamicPrices[eventId]);
    }
    
    // Fallback calculation while loading
    const calculatedPrice = calculateDynamicPrice(event.baseTicketPrice, parseInt(event.soldTickets || 0));
    return formatEther(calculatedPrice.toString());
  };

  // Event card styles
  const eventCardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    margin: '16px 0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const eventImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5'
  };

  const eventHeaderStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const eventNameStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '0'
  };

  const eventDescriptionStyle = {
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: '1.4'
  };

  const eventDetailsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  };

  const detailItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0'
  };

  const detailLabelStyle = {
    fontWeight: '600',
    color: '#555'
  };

  const detailValueStyle = {
    color: '#333'
  };

  const priceValueStyle = {
    color: '#007bff',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease'
  };

  const buyButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const soldOutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white',
    cursor: 'not-allowed'
  };

  const organizerBadgeStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'default'
  };

  const priceInfoStyle = {
    fontSize: '0.8rem',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '4px'
  };

  return (
    <div className="event-list">
      <h2>Available Events</h2>
      <div className="event-grid">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} style={eventCardStyle}>
              {/* Event Image */}
              {event.imageIPFS && (
                <div>
                  <img 
                    src={getIPFSImageURL(event.imageIPFS)} 
                    alt={event.name || 'Event Image'}
                    style={eventImageStyle}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzVMMTI1IDEwMEgxMTJWMTI1SDg4VjEwMEg3NUwxMDAgNzVaIiBmaWxsPSIjQ0NDIi8+PC9zdmc+Cg==';
                    }}
                  />
                </div>
              )}

              {/* Event Header */}
              <div style={eventHeaderStyle}>
                <h3 style={eventNameStyle}>{event.name || 'Unnamed Event'}</h3>
                <p style={eventDescriptionStyle}>
                  {event.description || 'No description available'}
                </p>
              </div>

              {/* Event Details */}
              <div style={eventDetailsStyle}>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Organizer:</span>
                  <span style={detailValueStyle}>
                    {formatAddress(event.organizer)}
                  </span>
                </div>
                
                {/* Dynamic Ticket Price Display */}
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Current Price:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={priceValueStyle}>
                      {loadingPrices[event.eventId] ? (
                        'Loading...'
                      ) : (
                        `${getPriceToDisplay(event)} ETH`
                      )}
                    </span>
                    <div style={priceInfoStyle}>
                      Base: {formatEther(event.baseTicketPrice || '0')} ETH
                    </div>
                    <div style={priceInfoStyle}>
                      +{((parseInt(event.soldTickets || 0) + 1) * 0.1).toFixed(1)}% dynamic pricing
                    </div>
                  </div>
                </div>
                
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Tickets Available:</span>
                  <span style={detailValueStyle}>
                    {event.soldTickets || 0} / {event.totalTickets || 0}
                  </span>
                </div>
                
                {event.venue && (
                  <div style={detailItemStyle}>
                    <span style={detailLabelStyle}>Venue:</span>
                    <span style={detailValueStyle}>{event.venue}</span>
                  </div>
                )}
                
                {event.date && (
                  <div style={detailItemStyle}>
                    <span style={detailLabelStyle}>Date:</span>
                    <span style={detailValueStyle}>{formatDate(event.date)}</span>
                  </div>
                )}
              </div>

              {/* Event Actions */}
              <div className="event-card-footer">
                {isOrganizer(event) ? (
                  <div style={organizerBadgeStyle}>
                    You are the organizer
                  </div>
                ) : (
                  isTicketAvailable(event) ? (
                    <button
                      onClick={() => handleBuyTicket(event)}
                      style={buyButtonStyle}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                      }}
                    >
                      Buy Ticket ({loadingPrices[event.eventId] ? 'Loading...' : `${getPriceToDisplay(event)} ETH`})
                    </button>
                  ) : (
                    <button style={soldOutButtonStyle} disabled>
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