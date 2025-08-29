// import React, { useState, useEffect } from 'react';
// import { BrowserProvider, Contract } from 'ethers';
// import { useQuery } from '@tanstack/react-query';
// import { gql, request } from 'graphql-request';
// import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
// import './App.css';
// import PrivyDebugInfo from './PrivyDebugInfo';

// import EventList from './components/EventList';
// import CreateEventPage from './components/CreateEventPage';
// import UserProfile from './components/UserProfile';
// import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from './constants';

// const query = gql`{
//   events {
//     id
//     eventId
//     name
//     description
//     organizer
//     soldTickets
//     baseTicketPrice
//     venue
//     date
//     totalTickets
//     imageIPFS
//   }
//   tickets {
//     id
//     ticketId
//     eventId
//     owner
//     ticketNumber
//   }
// }`;

// const url = 'https://api.studio.thegraph.com/query/119676/event-ticketinng/version/latest';
// const headers = { Authorization: 'Bearer {api-key}' };

// // Sepolia chain configuration for Privy
// const sepoliaChain = {
//   id: 11155111,
//   name: 'Sepolia',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'SepoliaETH',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://rpc.sepolia.org'],
//     },
//     public: {
//       http: ['https://rpc.sepolia.org'],
//     },
//   },
//   blockExplorers: {
//     default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
//   },
//   testnet: true,
// };

// // Main App component wrapped with authentication logic
// function AppContent() {
//   const [currentPage, setCurrentPage] = useState('event-list');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userInfo, setUserInfo] = useState(null);
//   const [currentAccount, setCurrentAccount] = useState(null);

//   // Privy hooks for authentication and wallet management
//   const { ready, authenticated, user, login, logout } = usePrivy();
//   const { wallets } = useWallets();

//   // Use react-query for data fetching from the subgraph
//   const { data, status } = useQuery({
//     queryKey: ['data'],
//     async queryFn() {
//       return await request(url, query, {}, headers);
//     }
//   });

//   // Handle wallet connection and account extraction
//   useEffect(() => {
//     if (ready && authenticated && wallets.length > 0) {
//       // Get the first wallet (embedded or external)
//       const primaryWallet = wallets[0];
//       if (primaryWallet && primaryWallet.address) {
//         setCurrentAccount(primaryWallet.address);
//         setMessage('Wallet connected successfully via Privy!');
//         console.log('Connected account via Privy:', primaryWallet.address);
//         console.log('Wallet type:', primaryWallet.walletClientType);
//       }
//     } else if (ready && !authenticated) {
//       setCurrentAccount(null);
//       setMessage('Please log in to use the dApp.');
//     } else if (ready && authenticated && wallets.length === 0) {
//       // User is authenticated but no wallet yet (might be creating embedded wallet)
//       setMessage('Creating your wallet...');
//     }
//   }, [ready, authenticated, wallets]);

//   // Fetch user info from smart contract when account is connected
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       if (currentAccount && authenticated && wallets.length > 0) {
//         try {
//           const wallet = wallets[0];
          
//           // Ensure we're on the right chain before making contract calls
//           if (wallet.chainId !== SEPOLIA_CHAIN_ID) {
//             await wallet.switchChain(SEPOLIA_CHAIN_ID);
//           }
          
//           const provider = await wallet.getEthersProvider();
//           const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

//           // Assuming your contract has a function like `userInfo` that returns level and specialOfferCount
//           const info = await eventContract.userInfo(currentAccount);

//           const levels = ['None', 'Bronze', 'Silver', 'Gold', 'Platinum'];
//           const userLevel = levels[info.level];

//           setUserInfo({
//             ticketsBought: info.ticketsBought.toString(),
//             level: userLevel,
//             specialOfferCount: info.specialOfferCount.toString(),
//           });

//         } catch (error) {
//           console.error("Error fetching user info:", error);
//           setUserInfo(null);
//         }
//       } else {
//         setUserInfo(null);
//       }
//     };

//     if (data && currentAccount) {
//       fetchUserInfo();
//     }
//   }, [currentAccount, data, authenticated, wallets]);

//   // Helper function to format Ethereum addresses
//   const formatAddress = (address) => {
//     if (!address || typeof address !== 'string') return '';
//     return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
//   };

//   // Handle login/logout
//   const handleAuthAction = () => {
//     if (authenticated) {
//       logout();
//     } else {
//       login();
//     }
//   };

//   const renderPage = () => {
//     // Show loading/error states for subgraph data
//     if (status === 'pending') return <div className="loading-message">Loading events...</div>;
//     if (status === 'error') return <div className="error-message">Error fetching data from the Subgraph.</div>;

//     switch (currentPage) {
//       case 'event-list':
//         return (
//           <EventList 
//             events={data.events} 
//             currentAccount={currentAccount} 
//             setLoading={setLoading} 
//             setMessage={setMessage} 
//             formatAddress={formatAddress}
//             wallets={wallets}
//             authenticated={authenticated}
//           />
//         );
//       case 'create-event':
//         return (
//           <CreateEventPage 
//             setLoading={setLoading} 
//             setMessage={setMessage} 
//             setCurrentPage={setCurrentPage}
//             wallets={wallets}
//             authenticated={authenticated}
//           />
//         );
//       case 'user-profile':
//         // Filter tickets and events for the current user
//         const userTickets = data.tickets.filter(ticket => 
//           ticket.owner.toLowerCase() === currentAccount?.toLowerCase()
//         );
//         const userEvents = data.events.filter(event => 
//           event.organizer.toLowerCase() === currentAccount?.toLowerCase()
//         );
//         return (
//           <UserProfile
//             userEvents={userEvents}
//             userTickets={userTickets}
//             currentAccount={currentAccount}
//             allEvents={data.events}
//             userInfo={userInfo}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   // Show loading state while Privy is initializing
//   if (!ready) {
//     return (
//       <div className="app-container">
//         <div className="loading-message">Initializing Privy...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="app-container">
//       {/* <PrivyDebugInfo /> */}
//       <header className="app-header">
//         <h1 className="app-title">Event DApp</h1>
//         <nav className="nav-bar">
//           <button 
//             onClick={() => setCurrentPage('event-list')} 
//             className={currentPage === 'event-list' ? 'active' : ''}
//           >
//             Event List
//           </button>
//           <button 
//             onClick={() => setCurrentPage('create-event')} 
//             className={currentPage === 'create-event' ? 'active' : ''}
//           >
//             Create Event
//           </button>
//           <button 
//             onClick={() => setCurrentPage('user-profile')} 
//             className={currentPage === 'user-profile' ? 'active' : ''}
//           >
//             My Profile
//           </button>
//         </nav>
//         <div className="wallet-status">
//           {authenticated && currentAccount ? (
//             <div className="user-info">
//               <span className="connected-text">
//                 Connected: {formatAddress(currentAccount)}
//               </span>
//               {user?.email?.address && (
//                 <span className="user-email">
//                   ({user.email.address})
//                 </span>
//               )}
//               <button onClick={handleAuthAction} className="disconnect-button">
//                 Logout
//               </button>
//             </div>
//           ) : authenticated && !currentAccount ? (
//             <div className="wallet-creating">
//               <span>Creating wallet...</span>
//             </div>
//           ) : (
//             <button onClick={handleAuthAction} className="connect-button">
//               Login with Privy
//             </button>
//           )}
//         </div>
//       </header>

//       <main className="main-panel">
//         {loading && (
//           <div className="loading-overlay">
//             <div className="loading-text">Processing...</div>
//           </div>
//         )}
//         {message && <div className="info-message">{message}</div>}
        
//         <div className="page-content">
//           {authenticated ? (
//             renderPage()
//           ) : (
//             <div className="auth-required">
//               <h2>Welcome to Event DApp</h2>
//               <p>Please log in with Privy to access all features of the application.</p>
//               <button onClick={login} className="login-prompt-button">
//                 Get Started
//               </button>
//             </div>
//           )}
//         </div>  
//       </main>
//     </div>
//   );
// }

// // Root App component with Privy Provider
// function App() {
//   return (
//     <PrivyProvider
//       appId="cmex2rrfw01lxla0bhcfweq7r" // Replace with your actual Privy App ID
//       config={{
//         // Appearance customization
//         appearance: {
//           theme: 'light',
//           accentColor: '#676FFF',
//           logo: 'https://your-logo-url.com/logo.png', // Optional: Your app logo
//         },
//         // Embedded wallet configuration
//         embeddedWallets: {
//           createOnLogin: 'users-without-wallets', // Auto-create wallets for users without them
//         },
//         // Login methods configuration
//         loginMethods: ['email', 'wallet', 'google', 'twitter'],
//         // Supported chains
//         supportedChains: [sepoliaChain],
//         // Default chain
//         defaultChain: sepoliaChain,
//       }}
//     >
//       <AppContent />
//     </PrivyProvider>
//   );
// }

// export default App;




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





import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
import './App.css';
import PrivyDebugInfo from './PrivyDebugInfo';

import EventList from './components/EventList';
import CreateEventPage from './components/CreateEventPage';
import UserProfile from './components/UserProfile';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from './constants';

const query = gql`{
  events {
    id
    eventId
    name
    description
    organizer
    soldTickets
    baseTicketPrice
    venue
    date
    totalTickets
    imageIPFS
  }
  tickets {
    id
    ticketId
    eventId
    owner
    ticketNumber
  }
}`;

const url = 'https://api.studio.thegraph.com/query/119676/event-ticketinng/version/latest';
const headers = { Authorization: 'Bearer {api-key}' };

// Sepolia chain configuration for Privy
const sepoliaChain = {
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'SepoliaETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.org'],
    },
    public: {
      http: ['https://rpc.sepolia.org'],
    },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
};

// Main App component wrapped with authentication logic
function AppContent() {
  const [currentPage, setCurrentPage] = useState('event-list');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);

  // Privy hooks for authentication and wallet management
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();

  // Use react-query for data fetching from the subgraph
  const { data, status, refetch } = useQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, query, {}, headers);
    }
  });

  // Handle wallet connection and account extraction
  useEffect(() => {
    if (ready && authenticated && wallets.length > 0) {
      // Get the first wallet (embedded or external)
      const primaryWallet = wallets[0];
      if (primaryWallet && primaryWallet.address) {
        setCurrentAccount(primaryWallet.address);
        setMessage('Wallet connected successfully via Privy!');
        console.log('Connected account via Privy:', primaryWallet.address);
        console.log('Wallet type:', primaryWallet.walletClientType);
      }
    } else if (ready && !authenticated) {
      setCurrentAccount(null);
      setMessage('Please log in to use the dApp.');
    } else if (ready && authenticated && wallets.length === 0) {
      // User is authenticated but no wallet yet (might be creating embedded wallet)
      setMessage('Creating your wallet...');
    }
  }, [ready, authenticated, wallets]);

  // Fetch user info from smart contract when account is connected
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentAccount && authenticated && wallets.length > 0) {
        try {
          const wallet = wallets[0];
          
          // Ensure we're on the right chain before making contract calls
          if (wallet.chainId !== SEPOLIA_CHAIN_ID) {
            await wallet.switchChain(SEPOLIA_CHAIN_ID);
          }
          
          // Use correct Privy provider methods
          const provider = await wallet.getEthereumProvider();
          const ethersProvider = new BrowserProvider(provider);
          const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersProvider);

          console.log('Fetching user info for account:', currentAccount);
          
          // Get user info from contract
          const info = await eventContract.userInfo(currentAccount);
          
          console.log('Raw contract response:', {
            ticketsBought: info.ticketsBought.toString(),
            level: info.level.toString(),
            specialOfferCount: info.specialOfferCount.toString()
          });

          const levels = ['None', 'Bronze', 'Silver', 'Gold', 'Platinum'];
          const userLevel = levels[info.level];

          const userInfoData = {
            ticketsBought: info.ticketsBought.toString(),
            level: userLevel,
            specialOfferCount: info.specialOfferCount.toString(),
          };
          
          console.log('Processed user info:', userInfoData);
          setUserInfo(userInfoData);

        } catch (error) {
          console.error("Error fetching user info:", error);
          // Set default values if fetching fails
          setUserInfo({
            ticketsBought: '0',
            level: 'Bronze',
            specialOfferCount: '0'
          });
        }
      } else {
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, [currentAccount, data, authenticated, wallets]);

  // Add a function to manually refresh user info
  const refreshUserInfo = async () => {
    if (currentAccount && authenticated && wallets.length > 0) {
      try {
        const wallet = wallets[0];
        const provider = await wallet.getEthereumProvider();
        const ethersProvider = new BrowserProvider(provider);
        const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersProvider);

        const info = await eventContract.userInfo(currentAccount);
        const levels = ['None', 'Bronze', 'Silver', 'Gold', 'Platinum'];
        const userLevel = levels[info.level];

        setUserInfo({
          ticketsBought: info.ticketsBought.toString(),
          level: userLevel,
          specialOfferCount: info.specialOfferCount.toString(),
        });
        
        console.log('User info refreshed:', {
          ticketsBought: info.ticketsBought.toString(),
          level: userLevel,
          specialOfferCount: info.specialOfferCount.toString(),
        });
        
      } catch (error) {
        console.error("Error refreshing user info:", error);
      }
    }
  };

  // Helper function to format Ethereum addresses
  const formatAddress = (address) => {
    if (!address || typeof address !== 'string') return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Handle login/logout
  const handleAuthAction = () => {
    if (authenticated) {
      logout();
    } else {
      login();
    }
  };

  const renderPage = () => {
    // Show loading/error states for subgraph data
    if (status === 'pending') return <div className="loading-message">Loading events...</div>;
    if (status === 'error') return <div className="error-message">Error fetching data from the Subgraph.</div>;

    switch (currentPage) {
      case 'event-list':
        return (
          <EventList 
            events={data.events} 
            currentAccount={currentAccount} 
            setLoading={setLoading} 
            setMessage={setMessage} 
            refetch={refetch}
            formatAddress={formatAddress}
            wallets={wallets}
            authenticated={authenticated}
            refreshUserInfo={refreshUserInfo}
          />
        );
      case 'create-event':
        return (
          <CreateEventPage 
            setLoading={setLoading} 
            setMessage={setMessage} 
            setCurrentPage={setCurrentPage}
            wallets={wallets}
            authenticated={authenticated}
          />
        );
      case 'user-profile':
        // Filter tickets and events for the current user
        const userTickets = data.tickets.filter(ticket => 
          ticket.owner.toLowerCase() === currentAccount?.toLowerCase()
        );
        const userEvents = data.events.filter(event => 
          event.organizer.toLowerCase() === currentAccount?.toLowerCase()
        );
        return (
          <UserProfile
            userEvents={userEvents}
            userTickets={userTickets}
            currentAccount={currentAccount}
            allEvents={data.events}
            userInfo={userInfo}
          />
        );
      default:
        return null;
    }
  };

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <div className="app-container">
        <div className="loading-message">Initializing Privy...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* <PrivyDebugInfo /> */}
      <header className="app-header">
        <h1 className="app-title">Event DApp</h1>
        <nav className="nav-bar">
          <button 
            onClick={() => setCurrentPage('event-list')} 
            className={currentPage === 'event-list' ? 'active' : ''}
          >
            Event List
          </button>
          <button 
            onClick={() => setCurrentPage('create-event')} 
            className={currentPage === 'create-event' ? 'active' : ''}
          >
            Create Event
          </button>
          <button 
            onClick={() => setCurrentPage('user-profile')} 
            className={currentPage === 'user-profile' ? 'active' : ''}
          >
            My Profile
          </button>
        </nav>
        <div className="wallet-status">
          {authenticated && currentAccount ? (
            <div className="user-info">
              <span className="connected-text">
                Connected: {formatAddress(currentAccount)}
              </span>
              {user?.email?.address && (
                <span className="user-email">
                  ({user.email.address})
                </span>
              )}
              <button onClick={handleAuthAction} className="disconnect-button">
                Logout
              </button>
            </div>
          ) : authenticated && !currentAccount ? (
            <div className="wallet-creating">
              <span>Creating wallet...</span>
            </div>
          ) : (
            <button onClick={handleAuthAction} className="connect-button">
              Login with Privy
            </button>
          )}
        </div>
      </header>

      <main className="main-panel">
        {loading && (
          <div className="loading-overlay">
            <div className="loading-text">Processing...</div>
          </div>
        )}
        {message && <div className="info-message">{message}</div>}
        
        <div className="page-content">
          {authenticated ? (
            renderPage()
          ) : (
            <div className="auth-required">
              <h2>Welcome to Event DApp</h2>
              <p>Please log in with Privy to access all features of the application.</p>
              <button onClick={login} className="login-prompt-button">
                Get Started
              </button>
            </div>
          )}
        </div>  
      </main>
    </div>
  );
}

// Root App component with Privy Provider
function App() {
  return (
    <PrivyProvider
      appId="cmex2rrfw01lxla0bhcfweq7r" // Replace with your actual Privy App ID
      config={{
        // Appearance customization
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url.com/logo.png', // Optional: Your app logo
        },
        // Embedded wallet configuration
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // Auto-create wallets for users without them
        },
        // Login methods configuration
        loginMethods: ['email', 'wallet', 'google', 'twitter'],
        // Supported chains
        supportedChains: [sepoliaChain],
        // Default chain
        defaultChain: sepoliaChain,
      }}
    >
      <AppContent />
    </PrivyProvider>
  );
}

export default App;