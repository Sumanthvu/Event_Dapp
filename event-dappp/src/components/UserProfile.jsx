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
//  */
// const UserProfile = ({ userEvents, userTickets, currentAccount }) => {
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
//                   <div className="ticket-type">Ticket</div>
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
 * Component to display the user's profile, including their created events and owned tickets.
 * @param {object} props - The component props.
 * @param {Array} props.userEvents - The list of events created by the user.
 * @param {Array} props.userTickets - The list of tickets owned by the user.
 * @param {string} props.currentAccount - The current connected wallet address.
 * @param {Array} props.allEvents - All events to find the name of a ticket's event.
 */
const UserProfile = ({ userEvents, userTickets, currentAccount, allEvents }) => {
  // Helper function to safely format ether values
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

  // Helper function to format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'TBD';
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Helper function to format address
  const formatAddress = (address) => {
    if (!address || typeof address !== 'string') return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Helper function to get event name from its ID
  const getEventName = (eventId) => {
    const event = allEvents?.find(e => e.eventId === eventId);
    return event?.name || 'Unknown Event';
  };

  // If no current account, show message
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
                    <span className={`status-badge ${parseInt(event.ticketsSold || 0) === parseInt(event.totalTickets || 0) ? 'sold-out' : 'available'}`}>
                      {parseInt(event.ticketsSold || 0) === parseInt(event.totalTickets || 0) ? 'Sold Out' : 'Active'}
                    </span>
                  </div>
                </div>
                
                <p className="event-description">{event.description || 'No description available'}</p>
                
                <div className="event-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Tickets Sold</span>
                    <span className="detail-value tickets-progress">
                      <span className="tickets-numbers">{event.ticketsSold || 0} / {event.totalTickets || 0}</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${((event.ticketsSold || 0) / (event.totalTickets || 1)) * 100}%` }}
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
                  {/* Display the event name here */}
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