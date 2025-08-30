🎟️ Decentralized Event Ticketing dApp

A Web3-based event booking platform on Sepolia Ethereum where organizers stake ETH to create events and sell NFT tickets with dynamic pricing. Buyers earn rewards, discounts, and level-based NFT badges.

✨ Features

Event Creation → Organizers stake ETH, set base ticket price, tickets, date, venue & image.

Dynamic Pricing → Each new ticket costs +0.1% more than the previous one.

NFT Tickets → Each purchase mints a unique NFT with event details.

Revenue Split → 70% to organizer, 30% to platform.

Rewards


User levels: Bronze, Silver, Gold, Platinum → each with special badge NFTs.

First 2 tickets at each new level get 30% off (subsidized by platform).

Profiles → Show purchased tickets + level badges.

Indexing & Login → Events indexed with The Graph, login via Privy.

🖼️ Screenshots (Add later)
Privy integration
<img width="512" height="827" alt="image" src="https://github.com/user-attachments/assets/c2a2de3e-4f48-4651-b7e8-856e46862070" />


Event creation form
<img width="472" height="721" alt="image" src="https://github.com/user-attachments/assets/5cb30045-951c-4ddf-bf5c-3d23af1b8a91" />


Event listing page
<img width="691" height="780" alt="image" src="https://github.com/user-attachments/assets/4ba82a2d-8783-41bf-b2ae-ba80a8a43dc6" />


User profile with tickets & badges
<img width="393" height="735" alt="image" src="https://github.com/user-attachments/assets/cdc66776-fec9-4159-9154-267cfeb882c3" />



🎉 How It Works

Organizer creates an event → stakes ETH, sets base ticket price, total tickets, and event details.

Users buy tickets → price increases dynamically, NFTs minted as confirmation.

Special offers → activated at 5 tickets & level upgrades.

Revenue split → 70% to organizer, 30% to platform.

After the event → Organizer withdraws 70% of staked ETH.

User levels & badges → Bronze, Silver, Gold, Platinum NFTs.

⚡ Quick Start
git clone https://github.com/Sumanthvu/Event_Dapp.git
cd event-dappp
npm install
npm start


Deploy Subgraph
cd event-ticketinng
grpah codegen
graph build
graph deploy

🛠️ Tech Stack

Solidity, Hardhat, Sepolia

React.js, Tailwind, Ethers.js

IPFS/Pinata for images & metadata

The Graph for indexing

Privy for auth
