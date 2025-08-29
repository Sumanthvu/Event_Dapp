// // src/App.jsx

// import React, { useState, useEffect } from 'react';
// import { BrowserProvider, Contract } from 'ethers';
// import { useQuery } from '@tanstack/react-query';
// import { gql, request } from 'graphql-request';
// import './App.css';

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
//   }
//   tickets {
//     id
//     ticketId
//     eventId
//     owner
//     ticketNumber
//   }
// }`

// const url = 'https://api.studio.thegraph.com/query/119676/event-ticketinng/version/latest'
// const headers = { Authorization: 'Bearer {api-key}' }

// // The main application component
// function App() {
//   const [currentAccount, setCurrentAccount] = useState(null);
//   const [currentPage, setCurrentPage] = useState('event-list');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userInfo, setUserInfo] = useState(null); // <-- Added missing state

//   // Use react-query for data fetching from the subgraph
//   const { data, status } = useQuery({
//     queryKey: ['data'],
//     async queryFn() {
//       return await request(url, query, {}, headers)
//     }
//   });

//   // ---------------- WALLET CONNECTION LOGIC ----------------

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) {
//         setMessage("Please install MetaMask to use this dApp.");
//         return;
//       }

//       // Ask MetaMask to connect
//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

//       if (accounts.length === 0) {
//         setMessage("No accounts found. Please connect in MetaMask.");
//         return;
//       }

//       setCurrentAccount(accounts[0]); // ✅ Store the account address
//       setMessage("Wallet connected successfully!");
//       console.log("Connected account:", accounts[0]);
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//       setMessage(`Failed to connect wallet. Error: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     const checkWallet = async () => {
//       if (!window.ethereum) {
//         setMessage("Please install MetaMask to use this dApp.");
//         return;
//       }

//       try {
//         // Check if wallet is already connected
//         const accounts = await window.ethereum.request({ method: "eth_accounts" });

//         if (accounts.length > 0) {
//           setCurrentAccount(accounts[0]); // ✅ Already connected
//           setMessage("");
//           console.log("Wallet already connected:", accounts[0]);
//         } else {
//           setCurrentAccount(null);
//           setMessage("Please connect your wallet to start.");
//         }
//       } catch (error) {
//         console.error("Error checking wallet connection:", error);
//         setMessage("An error occurred. Check your wallet connection and network.");
//       }
//     };

//     checkWallet();

//     // 🔄 Listen for account & network changes
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         if (accounts.length === 0) {
//           setCurrentAccount(null);
//           setMessage("Wallet disconnected. Please connect your wallet.");
//         } else {
//           setCurrentAccount(accounts[0]);
//           console.log("Account changed:", accounts[0]);
//         }
//       });

//       window.ethereum.on("chainChanged", () => {
//         window.location.reload();
//       });
//     }

//     // Cleanup listeners
//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeAllListeners("accountsChanged");
//         window.ethereum.removeAllListeners("chainChanged");
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       if (currentAccount && window.ethereum) {
//         try {
//           const provider = new BrowserProvider(window.ethereum);
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

//     if (data) {
//       fetchUserInfo();
//     }

//   }, [currentAccount, data]);

//   // Helper function to format Ethereum addresses
//   const formatAddress = (address) => {
//     // Check if address is a valid string before trying to use substring
//     if (!address || typeof address !== 'string') return '';
//     return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
//   };
  
//   const renderPage = () => {
//     // Show loading/error states for subgraph data
//     if (status === 'pending') return <div className="loading-message">Loading events...</div>;
//     if (status === 'error') return <div className="error-message">Error fetching data from the Subgraph.</div>;

//     switch (currentPage) {
//       case 'event-list':
//         return <EventList events={data.events} currentAccount={currentAccount} setLoading={setLoading} setMessage={setMessage} formatAddress={formatAddress} />;
//       case 'create-event':
//         return <CreateEventPage setLoading={setLoading} setMessage={setMessage} setCurrentPage={setCurrentPage}  />;
//       case 'user-profile':
//         // Filter tickets and events for the current user
//         const userTickets = data.tickets.filter(ticket => ticket.owner.toLowerCase() === currentAccount.toLowerCase());
//         const userEvents = data.events.filter(event => event.organizer.toLowerCase() === currentAccount.toLowerCase());
//         return (
//             <UserProfile 
//                 userEvents={userEvents} 
//                 userTickets={userTickets} 
//                 currentAccount={currentAccount}
//                 allEvents={data.events} // Pass all events here
//                 userInfo={userInfo} // Pass userInfo to UserProfile if needed
//             />
//         );
//       default:
//         return null;
//     }
//   };
  
//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1 className="app-title">Event DApp</h1>
//         <nav className="nav-bar">
//           <button onClick={() => setCurrentPage('event-list')} className={currentPage === 'event-list' ? 'active' : ''}>Event List</button>
//           <button onClick={() => setCurrentPage('create-event')} className={currentPage === 'create-event' ? 'active' : ''}>Create Event</button>
//           <button onClick={() => setCurrentPage('user-profile')} className={currentPage === 'user-profile' ? 'active' : ''}>My Profile</button>
//         </nav>
//         <div className="wallet-status">
//           {currentAccount ? (
//             <span className="connected-text">
//               Connected: {formatAddress(currentAccount)}
//             </span>
//           ) : (
//             <button onClick={connectWallet} className="connect-button">
//               Connect Wallet
//             </button>
//           )}
//         </div>
//       </header>

//       <main className="main-panel">
//         {loading && <div className="loading-overlay"><div className="loading-text">Processing...</div></div>}
//         {message && <div className="info-message">{message}</div>}
        
//         <div className="page-content">
//           {renderPage()}
//         </div>  
//       </main>
//     </div>
//   );
// }

// export default App;












// src/App.jsx

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
  const { data, status } = useQuery({
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
          
          const provider = await wallet.getEthersProvider();
          const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

          // Assuming your contract has a function like `userInfo` that returns level and specialOfferCount
          const info = await eventContract.userInfo(currentAccount);

          const levels = ['None', 'Bronze', 'Silver', 'Gold', 'Platinum'];
          const userLevel = levels[info.level];

          setUserInfo({
            ticketsBought: info.ticketsBought.toString(),
            level: userLevel,
            specialOfferCount: info.specialOfferCount.toString(),
          });

        } catch (error) {
          console.error("Error fetching user info:", error);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
    };

    if (data && currentAccount) {
      fetchUserInfo();
    }
  }, [currentAccount, data, authenticated, wallets]);

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
            formatAddress={formatAddress}
            wallets={wallets}
            authenticated={authenticated}
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