// // src/components/UserProfile.jsx
// import React from 'react';
// import { formatEther } from 'ethers';
// import "./UserProfile.css"

// /**
//  * Component to display the user's profile, including their created events and owned tickets.
//  * @param {object} props - The component props.
//  * @param {Array} props.userEvents - The list of events created by the user.
//  * @param {Array} props.userTickets - The list of tickets owned by the user.
//  * @param {string} props.currentAccount - The current connected wallet address.
//  * @param {Array} props.allEvents - All events to find the name of a ticket's event.
//  */
// const UserProfile = ({ userEvents, userTickets, currentAccount, allEvents }) => {
//   // Helper function to safely format ether values
//   const safeFormatEther = (value) => {
//     try {
//       if (!value || value === null || value === undefined) {
//         return '0';
//       }
//       return formatEther(value.toString());
//     } catch (error) {
//       console.error('Error formatting ether value:', error, 'Value:', value);
//       return '0';
//     }
//   };

//   // Helper function to format date
//   const formatDate = (timestamp) => {
//     if (!timestamp) return 'TBD';
//     try {
//       const date = new Date(parseInt(timestamp) * 1000);
//       return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
//     } catch (error) {
//       return 'Invalid Date';
//     }
//   };

//   // Helper function to format address
//   const formatAddress = (address) => {
//     if (!address || typeof address !== 'string') return '';
//     return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
//   };
  
//   // Helper function to get event name from its ID
//   const getEventName = (eventId) => {
//     const event = allEvents?.find(e => e.eventId === eventId);
//     return event?.name || 'Unknown Event';
//   };

//   // If no current account, show message
//   if (!currentAccount) {
//     return (
//       <div className="user-profile-container">
//         <div className="profile-header">
//           <h2 className="profile-title">Your Profile</h2>
//           <p className="no-wallet-message">Please connect your wallet to view your profile.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="user-profile-container">
//       {/* Header Section */}
//       <div className="profile-header">
//         <h2 className="profile-title">Your Profile</h2>
//         <div className="wallet-info-card">
//           <div className="wallet-info-header">
//             <h3>Connected Wallet</h3>
//           </div>
//           <div className="wallet-address">
//             <span className="address-full">{currentAccount}</span>
//             <span className="address-short">{formatAddress(currentAccount)}</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Created Events Section */}
//       <div className="profile-section">
//         <div className="section-header">
//           <h3 className="section-title">Your Created Events</h3>
//           <div className="section-count">
//             {userEvents && userEvents.length > 0 ? `${userEvents.length} event${userEvents.length !== 1 ? 's' : ''}` : 'No events'}
//           </div>
//         </div>
        
//         {userEvents && userEvents.length > 0 ? (
//           <div className="events-grid">
//             {userEvents.map((event) => (
//               <div key={event.id} className="profile-event-card">
//                 <div className="event-card-header">
//                   <h4 className="event-title">{event.name || 'Unnamed Event'}</h4>
//                   <div className="event-status">
//                     <span className={`status-badge ${parseInt(event.ticketsSold || 0) === parseInt(event.totalTickets || 0) ? 'sold-out' : 'available'}`}>
//                       {parseInt(event.ticketsSold || 0) === parseInt(event.totalTickets || 0) ? 'Sold Out' : 'Active'}
//                     </span>
//                   </div>
//                 </div>
                
//                 <p className="event-description">{event.description || 'No description available'}</p>
                
//                 <div className="event-details-grid">
//                   <div className="detail-item">
//                     <span className="detail-label">Tickets Sold</span>
//                     <span className="detail-value tickets-progress">
//                       <span className="tickets-numbers">{event.ticketsSold || 0} / {event.totalTickets || 0}</span>
//                       <div className="progress-bar">
//                         <div 
//                           className="progress-fill" 
//                           style={{ width: `${((event.ticketsSold || 0) / (event.totalTickets || 1)) * 100}%` }}
//                         ></div>
//                       </div>
//                     </span>
//                   </div>
                  
//                   <div className="detail-item">
//                     <span className="detail-label">Ticket Price</span>
//                     <span className="detail-value price">{safeFormatEther(event.baseTicketPrice)} ETH</span>
//                   </div>
                  
//                   {event.venue && (
//                     <div className="detail-item">
//                       <span className="detail-label">Venue</span>
//                       <span className="detail-value">{event.venue}</span>
//                     </div>
//                   )}
                  
//                   {event.date && (
//                     <div className="detail-item">
//                       <span className="detail-label">Date</span>
//                       <span className="detail-value">{formatDate(event.date)}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">🎪</div>
//             <p>You haven't created any events yet.</p>
//             <button 
//               className="create-first-event-btn"
//               onClick={() => window.location.hash = '#create'}
//             >
//               Create Your First Event
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Owned Tickets Section */}
//       <div className="profile-section">
//         <div className="section-header">
//           <h3 className="section-title">Your Tickets</h3>
//           <div className="section-count">
//             {userTickets && userTickets.length > 0 ? `${userTickets.length} ticket${userTickets.length !== 1 ? 's' : ''}` : 'No tickets'}
//           </div>
//         </div>
        
//         {userTickets && userTickets.length > 0 ? (
//           <div className="tickets-grid">
//             {userTickets.map((ticket) => (
//               <div key={ticket.id} className="profile-ticket-card">
//                 <div className="ticket-header">
//                   <div className="ticket-number">
//                     #{ticket.ticketNumber || ticket.ticketId}
//                   </div>
//                   {/* Display the event name here */}
//                   <h4 className="ticket-event-name">{getEventName(ticket.eventId)}</h4>
//                 </div>
                
//                 <div className="ticket-details">
//                   <div className="ticket-detail">
//                     <span className="label">Ticket ID</span>
//                     <span className="value">{ticket.ticketId}</span>
//                   </div>
//                   <div className="ticket-detail">
//                     <span className="label">Event ID</span>
//                     <span className="value">{ticket.eventId}</span>
//                   </div>
//                   {ticket.ticketNumber && (
//                     <div className="ticket-detail">
//                       <span className="label">Number</span>
//                       <span className="value">#{ticket.ticketNumber}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="ticket-footer">
//                   <div className="ticket-status">Valid</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">🎫</div>
//             <p>You don't own any tickets yet.</p>
//             <button 
//               className="buy-first-ticket-btn"
//               onClick={() => window.location.hash = '#events'}
//             >
//               Browse Events
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;





// // src/components/UserProfile.jsx
// import React from 'react';
// import { formatEther } from 'ethers';
// import "./UserProfile.css"

// /**
//  * Component to display the user's profile, including their created events, owned tickets, and level progression.
//  */
// const UserProfile = ({ userEvents, userTickets, currentAccount, allEvents, userInfo }) => {
  
//   // Helper functions
//   const safeFormatEther = (value) => {
//     try {
//       if (!value || value === null || value === undefined) {
//         return '0';
//       }
//       return formatEther(value.toString());
//     } catch (error) {
//       console.error('Error formatting ether value:', error, 'Value:', value);
//       return '0';
//     }
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return 'TBD';
//     try {
//       const date = new Date(parseInt(timestamp) * 1000);
//       return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
//     } catch (error) {
//       return 'Invalid Date';
//     }
//   };

//   const formatAddress = (address) => {
//     if (!address || typeof address !== 'string') return '';
//     return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
//   };
  
//   const getEventName = (eventId) => {
//     const event = allEvents?.find(e => e.eventId === eventId);
//     return event?.name || 'Unknown Event';
//   };

//   // Level system helper functions based on contract logic
//   const getLevelInfo = (ticketsBought) => {
//     const tickets = parseInt(ticketsBought || 0);
    
//     if (tickets < 3) {
//       return {
//         currentLevel: 'Bronze',
//         levelIndex: 1,
//         ticketsInLevel: tickets,
//         ticketsForLevel: 3,
//         nextLevel: 'Silver',
//         ticketsToNext: 3 - tickets,
//         canGetDiscount: false,
//         discountTicketsUsed: 0,
//         discountTicketsAvailable: 0
//       };
//     } else if (tickets < 6) {
//       const ticketsInLevel = tickets - 3;
//       const discountTicketsUsed = Math.min(ticketsInLevel, 2);
//       return {
//         currentLevel: 'Silver',
//         levelIndex: 2,
//         ticketsInLevel: ticketsInLevel,
//         ticketsForLevel: 3,
//         nextLevel: 'Gold',
//         ticketsToNext: 6 - tickets,
//         canGetDiscount: true,
//         discountTicketsUsed: discountTicketsUsed,
//         discountTicketsAvailable: Math.max(0, 2 - discountTicketsUsed)
//       };
//     } else if (tickets < 10) {
//       const ticketsInLevel = tickets - 6;
//       const discountTicketsUsed = Math.min(ticketsInLevel, 2);
//       return {
//         currentLevel: 'Gold',
//         levelIndex: 3,
//         ticketsInLevel: ticketsInLevel,
//         ticketsForLevel: 4,
//         nextLevel: 'Platinum',
//         ticketsToNext: 10 - tickets,
//         canGetDiscount: true,
//         discountTicketsUsed: discountTicketsUsed,
//         discountTicketsAvailable: Math.max(0, 2 - discountTicketsUsed)
//       };
//     } else {
//       const ticketsInLevel = tickets - 10;
//       const discountTicketsUsed = Math.min(ticketsInLevel, 2);
//       return {
//         currentLevel: 'Platinum',
//         levelIndex: 4,
//         ticketsInLevel: ticketsInLevel,
//         ticketsForLevel: 'Max',
//         nextLevel: null,
//         ticketsToNext: 0,
//         canGetDiscount: true,
//         discountTicketsUsed: discountTicketsUsed,
//         discountTicketsAvailable: Math.max(0, 2 - discountTicketsUsed)
//       };
//     }
//   };

//   const getLevelColor = (level) => {
//     switch (level) {
//       case 'Bronze': return '#CD7F32';
//       case 'Silver': return '#C0C0C0';
//       case 'Gold': return '#FFD700';
//       case 'Platinum': return '#E5E4E2';
//       default: return '#666';
//     }
//   };

//   const getLevelIcon = (level) => {
//     switch (level) {
//       case 'Bronze': return '🥉';
//       case 'Silver': return '🥈';
//       case 'Gold': return '🥇';
//       case 'Platinum': return '💎';
//       default: return '🏷️';
//     }
//   };

//   // Check if user has special NFT (bought exactly 5 tickets)
//   const hasSpecialNFT = () => {
//     const tickets = parseInt(userInfo?.ticketsBought || 0);
//     return tickets >= 5;
//   };

//   if (!currentAccount) {
//     return (
//       <div className="user-profile-container">
//         <div className="profile-header">
//           <h2 className="profile-title">Your Profile</h2>
//           <p className="no-wallet-message">Please connect your wallet to view your profile.</p>
//         </div>
//       </div>
//     );
//   }

//   const levelInfo = getLevelInfo(userInfo?.ticketsBought || 0);
//   const totalTickets = parseInt(userInfo?.ticketsBought || 0);

//   return (
//     <div className="user-profile-container">
//       {/* Header Section */}
//       <div className="profile-header">
//         <h2 className="profile-title">Your Profile</h2>
//         <div className="wallet-info-card">
//           <div className="wallet-info-header">
//             <h3>Connected Wallet</h3>
//           </div>
//           <div className="wallet-address">
//             <span className="address-full">{currentAccount}</span>
//             <span className="address-short">{formatAddress(currentAccount)}</span>
//           </div>
//         </div>
//       </div>

//       {/* User Level Section */}
//       <div className="profile-section level-section">
//         <div className="section-header">
//           <h3 className="section-title">Your Level Status</h3>
//         </div>
        
//         <div className="level-card">
//           <div className="level-header">
//             <div className="level-badge" style={{ backgroundColor: getLevelColor(levelInfo.currentLevel) }}>
//               <span className="level-icon">{getLevelIcon(levelInfo.currentLevel)}</span>
//               <span className="level-name">{levelInfo.currentLevel}</span>
//             </div>
//             <div className="total-tickets">
//               <span className="tickets-count">{totalTickets}</span>
//               <span className="tickets-label">Total Tickets</span>
//             </div>
//           </div>

//           <div className="level-progress">
//             <div className="progress-info">
//               <span>Progress in {levelInfo.currentLevel} Level:</span>
//               <span>{levelInfo.ticketsInLevel}/{levelInfo.ticketsForLevel}</span>
//             </div>
//             {levelInfo.ticketsForLevel !== 'Max' && (
//               <div className="progress-bar">
//                 <div 
//                   className="progress-fill" 
//                   style={{ 
//                     width: `${(levelInfo.ticketsInLevel / levelInfo.ticketsForLevel) * 100}%`,
//                     backgroundColor: getLevelColor(levelInfo.currentLevel)
//                   }}
//                 ></div>
//               </div>
//             )}
//           </div>

//           {/* Discount Information */}
//           {levelInfo.canGetDiscount && (
//             <div className="discount-info">
//               <h4>30% Discount Status</h4>
//               <div className="discount-details">
//                 <div className="discount-used">
//                   <span>Discount tickets used: {levelInfo.discountTicketsUsed}/2</span>
//                 </div>
//                 {levelInfo.discountTicketsAvailable > 0 && (
//                   <div className="discount-available">
//                     <span className="discount-highlight">
//                       🎉 You can buy {levelInfo.discountTicketsAvailable} more ticket{levelInfo.discountTicketsAvailable > 1 ? 's' : ''} with 30% OFF!
//                     </span>
//                   </div>
//                 )}
//                 {levelInfo.discountTicketsAvailable === 0 && (
//                   <div className="discount-exhausted">
//                     <span>All discount tickets used for this level</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Next Level Information */}
//           {levelInfo.nextLevel && (
//             <div className="next-level-info">
//               <div className="next-level-header">
//                 <span>Next Level: </span>
//                 <span className="next-level-name" style={{ color: getLevelColor(levelInfo.nextLevel) }}>
//                   {getLevelIcon(levelInfo.nextLevel)} {levelInfo.nextLevel}
//                 </span>
//               </div>
//               <div className="tickets-to-next">
//                 Buy {levelInfo.ticketsToNext} more ticket{levelInfo.ticketsToNext > 1 ? 's' : ''} to upgrade to {levelInfo.nextLevel}!
//               </div>
//             </div>
//           )}

//           {/* Special NFT Status */}
//           <div className="special-nft-info">
//             <h4>Special NFT Status</h4>
//             {hasSpecialNFT() ? (
//               <div className="nft-earned">
//                 <span className="nft-icon">🏆</span>
//                 <span>You've earned a Special NFT! (5+ tickets purchased)</span>
//                 <div className="nft-count">
//                   Special NFTs: {userInfo?.specialOfferCount || 1}
//                 </div>
//               </div>
//             ) : (
//               <div className="nft-pending">
//                 <span>Buy {5 - totalTickets} more ticket{5 - totalTickets > 1 ? 's' : ''} to earn a Special NFT!</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Created Events Section */}
//       <div className="profile-section">
//         <div className="section-header">
//           <h3 className="section-title">Your Created Events</h3>
//           <div className="section-count">
//             {userEvents && userEvents.length > 0 ? `${userEvents.length} event${userEvents.length !== 1 ? 's' : ''}` : 'No events'}
//           </div>
//         </div>
        
//         {userEvents && userEvents.length > 0 ? (
//           <div className="events-grid">
//             {userEvents.map((event) => (
//               <div key={event.id} className="profile-event-card">
//                 <div className="event-card-header">
//                   <h4 className="event-title">{event.name || 'Unnamed Event'}</h4>
//                   <div className="event-status">
//                     <span className={`status-badge ${parseInt(event.soldTickets || 0) === parseInt(event.totalTickets || 0) ? 'sold-out' : 'available'}`}>
//                       {parseInt(event.soldTickets || 0) === parseInt(event.totalTickets || 0) ? 'Sold Out' : 'Active'}
//                     </span>
//                   </div>
//                 </div>
                
//                 <p className="event-description">{event.description || 'No description available'}</p>
                
//                 <div className="event-details-grid">
//                   <div className="detail-item">
//                     <span className="detail-label">Tickets Sold</span>
//                     <span className="detail-value tickets-progress">
//                       <span className="tickets-numbers">{event.soldTickets || 0} / {event.totalTickets || 0}</span>
//                       <div className="progress-bar">
//                         <div 
//                           className="progress-fill" 
//                           style={{ width: `${((event.soldTickets || 0) / (event.totalTickets || 1)) * 100}%` }}
//                         ></div>
//                       </div>
//                     </span>
//                   </div>
                  
//                   <div className="detail-item">
//                     <span className="detail-label">Ticket Price</span>
//                     <span className="detail-value price">{safeFormatEther(event.baseTicketPrice)} ETH</span>
//                   </div>
                  
//                   {event.venue && (
//                     <div className="detail-item">
//                       <span className="detail-label">Venue</span>
//                       <span className="detail-value">{event.venue}</span>
//                     </div>
//                   )}
                  
//                   {event.date && (
//                     <div className="detail-item">
//                       <span className="detail-label">Date</span>
//                       <span className="detail-value">{formatDate(event.date)}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">🎪</div>
//             <p>You haven't created any events yet.</p>
//             <button 
//               className="create-first-event-btn"
//               onClick={() => window.location.hash = '#create'}
//             >
//               Create Your First Event
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Owned Tickets Section */}
//       <div className="profile-section">
//         <div className="section-header">
//           <h3 className="section-title">Your Tickets</h3>
//           <div className="section-count">
//             {userTickets && userTickets.length > 0 ? `${userTickets.length} ticket${userTickets.length !== 1 ? 's' : ''}` : 'No tickets'}
//           </div>
//         </div>
        
//         {userTickets && userTickets.length > 0 ? (
//           <div className="tickets-grid">
//             {userTickets.map((ticket) => (
//               <div key={ticket.id} className="profile-ticket-card">
//                 <div className="ticket-header">
//                   <div className="ticket-number">
//                     #{ticket.ticketNumber || ticket.ticketId}
//                   </div>
//                   <h4 className="ticket-event-name">{getEventName(ticket.eventId)}</h4>
//                 </div>
                
//                 <div className="ticket-details">
//                   <div className="ticket-detail">
//                     <span className="label">Ticket ID</span>
//                     <span className="value">{ticket.ticketId}</span>
//                   </div>
//                   <div className="ticket-detail">
//                     <span className="label">Event ID</span>
//                     <span className="value">{ticket.eventId}</span>
//                   </div>
//                   {ticket.ticketNumber && (
//                     <div className="ticket-detail">
//                       <span className="label">Number</span>
//                       <span className="value">#{ticket.ticketNumber}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="ticket-footer">
//                   <div className="ticket-status">Valid</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-icon">🎫</div>
//             <p>You don't own any tickets yet.</p>
//             <button 
//               className="buy-first-ticket-btn"
//               onClick={() => window.location.hash = '#events'}
//             >
//               Browse Events
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;










// src/components/UserProfile.jsx
import React from 'react';
import { formatEther } from 'ethers';
import "./UserProfile.css"

/**
 * Component to display the user's profile, including their created events, owned tickets, and level progression.
 */
const UserProfile = ({ userEvents, userTickets, currentAccount, allEvents, userInfo }) => {
  
  // Helper functions
  const safeFormatEther = (value) => {
    try {
      if (!value || value === null || value === undefined) {
        return '0';
      }
      return formatEther(value.toString());
    } catch (error) {
      console.error('Error formatting ether value:', error, 'Value:', value);
      return '0';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'TBD';
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatAddress = (address) => {
    if (!address || typeof address !== 'string') return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const getEventName = (eventId) => {
    const event = allEvents?.find(e => e.eventId === eventId);
    return event?.name || 'Unknown Event';
  };

  // Level system helper functions based on contract logic
  const getLevelInfo = (ticketsBought) => {
    const tickets = parseInt(ticketsBought || 0);
    
    if (tickets < 3) {
      return {
        currentLevel: 'Bronze',
        levelIndex: 1,
        ticketsInLevel: tickets,
        ticketsForLevel: 3,
        nextLevel: 'Silver',
        ticketsToNext: 3 - tickets,
        canGetDiscount: false,
        discountTicketsUsed: 0,
        discountTicketsAvailable: 0
      };
    } else if (tickets < 6) {
      const ticketsInLevel = tickets - 3;
      const discountTicketsUsed = Math.min(ticketsInLevel, 2);
      return {
        currentLevel: 'Silver',
        levelIndex: 2,
        ticketsInLevel: ticketsInLevel,
        ticketsForLevel: 3,
        nextLevel: 'Gold',
        ticketsToNext: 6 - tickets,
        canGetDiscount: true,
        discountTicketsUsed: discountTicketsUsed,
        discountTicketsAvailable: Math.max(0, 2 - discountTicketsUsed)
      };
    } else if (tickets < 10) {
      const ticketsInLevel = tickets - 6;
      const discountTicketsUsed = Math.min(ticketsInLevel, 2);
      return {
        currentLevel: 'Gold',
        levelIndex: 3,
        ticketsInLevel: ticketsInLevel,
        ticketsForLevel: 4,
        nextLevel: 'Platinum',
        ticketsToNext: 10 - tickets,
        canGetDiscount: true,
        discountTicketsUsed: discountTicketsUsed,
        discountTicketsAvailable: Math.max(0, 2 - discountTicketsUsed)
      };
    } else {
      const ticketsInLevel = tickets - 10;
      const discountTicketsUsed = Math.min(ticketsInLevel, 2);
      return {
        currentLevel: 'Platinum',
        levelIndex: 4,
        ticketsInLevel: ticketsInLevel,
        ticketsForLevel: 'Max',
        nextLevel: null,
        ticketsToNext: 0,
        canGetDiscount: true,
        discountTicketsUsed: discountTicketsUsed,
        discountTicketsAvailable: Math.max(0, 2 - discountTicketsUsed)
      };
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze': return '#CD7F32';
      case 'Silver': return '#C0C0C0';
      case 'Gold': return '#FFD700';
      case 'Platinum': return '#E5E4E2';
      default: return '#666';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Bronze': return '🥉';
      case 'Silver': return '🥈';
      case 'Gold': return '🥇';
      case 'Platinum': return '💎';
      default: return '🏷️';
    }
  };

  // Check if user has special NFT (bought exactly 5 tickets)
  const hasSpecialNFT = () => {
    const tickets = parseInt(userInfo?.ticketsBought || 0);
    return tickets >= 5;
  };

  if (!currentAccount) {
    return (
      <div className="user-profile-container">
        <div className="profile-header">
          <h2 className="profile-title">Your Profile</h2>
          <p className="no-wallet-message">Please connect your wallet to view your profile.</p>
        </div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(userInfo?.ticketsBought || 0);
  const totalTickets = parseInt(userInfo?.ticketsBought || 0);

  // Debug information
  console.log('UserProfile - userInfo:', userInfo);
  console.log('UserProfile - levelInfo:', levelInfo);
  console.log('UserProfile - totalTickets:', totalTickets);

  return (
    <div className="user-profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <h2 className="profile-title">Your Profile</h2>
        <div className="wallet-info-card">
          <div className="wallet-info-header">
            <h3>Connected Wallet</h3>
          </div>
          <div className="wallet-address">
            <span className="address-full">{currentAccount}</span>
            <span className="address-short">{formatAddress(currentAccount)}</span>
          </div>
        </div>
      </div>

      {/* User Level Section */}
      <div className="profile-section level-section">
        <div className="section-header">
          <h3 className="section-title">Your Level Status</h3>
        </div>
        
        <div className="level-card">
          <div className="level-header">
            <div className="level-badge" style={{ backgroundColor: getLevelColor(levelInfo.currentLevel) }}>
              <span className="level-icon">{getLevelIcon(levelInfo.currentLevel)}</span>
              <span className="level-name">{levelInfo.currentLevel}</span>
            </div>
            <div className="total-tickets">
              <span className="tickets-count">{totalTickets}</span>
              <span className="tickets-label">Total Tickets</span>
            </div>
          </div>

          <div className="level-progress">
            <div className="progress-info">
              <span>Progress in {levelInfo.currentLevel} Level:</span>
              <span>{levelInfo.ticketsInLevel}/{levelInfo.ticketsForLevel}</span>
            </div>
            {levelInfo.ticketsForLevel !== 'Max' && (
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${(levelInfo.ticketsInLevel / levelInfo.ticketsForLevel) * 100}%`,
                    backgroundColor: getLevelColor(levelInfo.currentLevel)
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Discount Information */}
          {levelInfo.canGetDiscount && (
            <div className="discount-info">
              <h4>30% Discount Status</h4>
              <div className="discount-details">
                <div className="discount-used">
                  <span>Discount tickets used: {levelInfo.discountTicketsUsed}/2</span>
                </div>
                {levelInfo.discountTicketsAvailable > 0 && (
                  <div className="discount-available">
                    <span className="discount-highlight">
                      🎉 You can buy {levelInfo.discountTicketsAvailable} more ticket{levelInfo.discountTicketsAvailable > 1 ? 's' : ''} with 30% OFF!
                    </span>
                  </div>
                )}
                {levelInfo.discountTicketsAvailable === 0 && (
                  <div className="discount-exhausted">
                    <span>All discount tickets used for this level</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Level Information */}
          {levelInfo.nextLevel && (
            <div className="next-level-info">
              <div className="next-level-header">
                <span>Next Level: </span>
                <span className="next-level-name" style={{ color: getLevelColor(levelInfo.nextLevel) }}>
                  {getLevelIcon(levelInfo.nextLevel)} {levelInfo.nextLevel}
                </span>
              </div>
              <div className="tickets-to-next">
                Buy {levelInfo.ticketsToNext} more ticket{levelInfo.ticketsToNext > 1 ? 's' : ''} to upgrade to {levelInfo.nextLevel}!
              </div>
            </div>
          )}

          {/* Special NFT Status */}
          <div className="special-nft-info">
            <h4>Special NFT Status</h4>
            {hasSpecialNFT() ? (
              <div className="nft-earned">
                <span className="nft-icon">🏆</span>
                <span>You've earned a Special NFT! (5+ tickets purchased)</span>
                <div className="nft-count">
                  Special NFTs: {userInfo?.specialOfferCount || 1}
                </div>
              </div>
            ) : (
              <div className="nft-pending">
                <span>Buy {5 - totalTickets} more ticket{5 - totalTickets > 1 ? 's' : ''} to earn a Special NFT!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Created Events Section */}
      <div className="profile-section">
        <div className="section-header">
          <h3 className="section-title">Your Created Events</h3>
          <div className="section-count">
            {userEvents && userEvents.length > 0 ? `${userEvents.length} event${userEvents.length !== 1 ? 's' : ''}` : 'No events'}
          </div>
        </div>
        
        {userEvents && userEvents.length > 0 ? (
          <div className="events-grid">
            {userEvents.map((event) => (
              <div key={event.id} className="profile-event-card">
                <div className="event-card-header">
                  <h4 className="event-title">{event.name || 'Unnamed Event'}</h4>
                  <div className="event-status">
                    <span className={`status-badge ${parseInt(event.soldTickets || 0) === parseInt(event.totalTickets || 0) ? 'sold-out' : 'available'}`}>
                      {parseInt(event.soldTickets || 0) === parseInt(event.totalTickets || 0) ? 'Sold Out' : 'Active'}
                    </span>
                  </div>
                </div>
                
                <p className="event-description">{event.description || 'No description available'}</p>
                
                <div className="event-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Tickets Sold</span>
                    <span className="detail-value tickets-progress">
                      <span className="tickets-numbers">{event.soldTickets || 0} / {event.totalTickets || 0}</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${((event.soldTickets || 0) / (event.totalTickets || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Ticket Price</span>
                    <span className="detail-value price">{safeFormatEther(event.baseTicketPrice)} ETH</span>
                  </div>
                  
                  {event.venue && (
                    <div className="detail-item">
                      <span className="detail-label">Venue</span>
                      <span className="detail-value">{event.venue}</span>
                    </div>
                  )}
                  
                  {event.date && (
                    <div className="detail-item">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">{formatDate(event.date)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎪</div>
            <p>You haven't created any events yet.</p>
            <button 
              className="create-first-event-btn"
              onClick={() => window.location.hash = '#create'}
            >
              Create Your First Event
            </button>
          </div>
        )}
      </div>
      
      {/* Owned Tickets Section */}
      <div className="profile-section">
        <div className="section-header">
          <h3 className="section-title">Your Tickets</h3>
          <div className="section-count">
            {userTickets && userTickets.length > 0 ? `${userTickets.length} ticket${userTickets.length !== 1 ? 's' : ''}` : 'No tickets'}
          </div>
        </div>
        
        {userTickets && userTickets.length > 0 ? (
          <div className="tickets-grid">
            {userTickets.map((ticket) => (
              <div key={ticket.id} className="profile-ticket-card">
                <div className="ticket-header">
                  <div className="ticket-number">
                    #{ticket.ticketNumber || ticket.ticketId}
                  </div>
                  <h4 className="ticket-event-name">{getEventName(ticket.eventId)}</h4>
                </div>
                
                <div className="ticket-details">
                  <div className="ticket-detail">
                    <span className="label">Ticket ID</span>
                    <span className="value">{ticket.ticketId}</span>
                  </div>
                  <div className="ticket-detail">
                    <span className="label">Event ID</span>
                    <span className="value">{ticket.eventId}</span>
                  </div>
                  {ticket.ticketNumber && (
                    <div className="ticket-detail">
                      <span className="label">Number</span>
                      <span className="value">#{ticket.ticketNumber}</span>
                    </div>
                  )}
                </div>
                
                <div className="ticket-footer">
                  <div className="ticket-status">Valid</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎫</div>
            <p>You don't own any tickets yet.</p>
            <button 
              className="buy-first-ticket-btn"
              onClick={() => window.location.hash = '#events'}
            >
              Browse Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;