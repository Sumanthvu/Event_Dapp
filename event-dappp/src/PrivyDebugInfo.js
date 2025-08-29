// src/components/PrivyDebugInfo.jsx
// This is a temporary debug component to help you understand Privy's state
// Remove this once everything is working properly

import React from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const PrivyDebugInfo = () => {
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#f0f0f0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <h4>Privy Debug Info</h4>
      <p><strong>Ready:</strong> {ready ? 'Yes' : 'No'}</p>
      <p><strong>Authenticated:</strong> {authenticated ? 'Yes' : 'No'}</p>
      <p><strong>User ID:</strong> {user?.id || 'None'}</p>
      <p><strong>User Email:</strong> {user?.email?.address || 'None'}</p>
      <p><strong>Wallets Count:</strong> {wallets.length}</p>
      {wallets.length > 0 && (
        <div>
          <p><strong>Primary Wallet:</strong></p>
          <p>- Type: {wallets[0].walletClientType}</p>
          <p>- Address: {wallets[0].address}</p>
          <p>- Chain ID: {wallets[0].chainId}</p>
        </div>
      )}
      {user && (
        <div>
          <p><strong>Full User Object:</strong></p>
          <pre style={{ fontSize: '10px', overflow: 'auto', maxHeight: '100px' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PrivyDebugInfo;