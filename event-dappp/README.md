# Event DApp — Frontend

A decentralized event ticketing application built with React 18 and Ethereum smart contracts. Users can browse events, purchase tickets as NFTs, and manage them through a wallet-connected interface.

Live demo: https://event-dapp.vercel.app

---

## Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How the Frontend Connects to the Contract and Subgraph](#how-the-frontend-connects-to-the-contract-and-subgraph)
- [Troubleshooting](#troubleshooting)

---

## Architecture

```
event-dappp/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Route-level page components
│   ├── hooks/       # Custom React hooks (contract + subgraph calls)
│   ├── utils/       # Helper functions
│   └── index.js     # App entry point
├── package.json
└── README.md
```

Key libraries:
- **React 18** — UI framework
- **ethers.js v6** — Ethereum wallet and contract interaction
- **@privy-io/react-auth** — Wallet connection and authentication
- **@tanstack/react-query** — Server-state management and caching
- **graphql-request** — Querying the subgraph (The Graph)

---

## Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- A browser wallet (e.g. MetaMask)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Sumanthvu/Event_Dapp.git
cd Event_Dapp/event-dappp
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `event-dappp/` directory (see [Environment Variables](#environment-variables)).

4. Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the `event-dappp/` directory with the following keys.
**Never commit real secrets or private keys.**

```env
# Privy app ID for wallet authentication
REACT_APP_PRIVY_APP_ID=your_privy_app_id

# Deployed smart contract address
REACT_APP_CONTRACT_ADDRESS=0xYourContractAddress

# The Graph subgraph endpoint URL
REACT_APP_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/your-subgraph

# RPC URL for the target network (e.g. Alchemy, Infura)
REACT_APP_RPC_URL=https://your-network-rpc-url
```

---

## Available Scripts

Run these from inside the `event-dappp/` directory:

| Command | Description |
|---|---|
| `npm start` | Starts the app in development mode at `http://localhost:3000` |
| `npm run build` | Creates an optimized production build in the `build/` folder |
| `npm test` | Runs tests in interactive watch mode |
| `npm run eject` | Ejects CRA config (irreversible — only if needed) |

---

## How the Frontend Connects to the Contract and Subgraph

### Smart Contract

The frontend uses **ethers.js v6** to read from and write to the deployed smart contract. The contract ABI and address are loaded from environment variables. Wallet signing is handled by **@privy-io/react-auth**, which wraps the user's connected wallet as an ethers signer.

### Subgraph (The Graph)

For read-heavy queries (e.g. listing all events, fetching ticket ownership), the app queries a **subgraph** deployed on The Graph using **graphql-request**. The subgraph endpoint is set via `REACT_APP_SUBGRAPH_URL`. This avoids slow on-chain reads and enables efficient filtering and pagination.

### Data Flow

```
User Action
    │
    ▼
React Component
    │
    ├──► ethers.js (write) ──► Smart Contract on-chain
    │
    └──► graphql-request (read) ──► The Graph Subgraph
```

---

## Troubleshooting

**`npm install` fails with peer dependency errors**
Try:
```bash
npm install --legacy-peer-deps
```

**App shows blank page / wallet not connecting**
- Make sure `REACT_APP_PRIVY_APP_ID` is set correctly in your `.env` file.
- Confirm your `.env` file is inside the `event-dappp/` folder, not the repo root.
- Restart the dev server after changing `.env`.

**Contract calls fail / wrong network**
- Verify `REACT_APP_CONTRACT_ADDRESS` matches the network your wallet is connected to.
- Check that `REACT_APP_RPC_URL` points to the correct network endpoint.

**Subgraph returns no data**
- Confirm `REACT_APP_SUBGRAPH_URL` is the correct deployed subgraph URL.
- Check The Graph dashboard to ensure the subgraph is synced.

**`react-scripts` not found**
Run `npm install` again inside the `event-dappp/` folder to restore missing dependencies.
