import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [publicKey, setPublicKey] = useState(null);
  const connection = new Connection(clusterApiUrl('devnet'));

  useEffect(() => {
    const loadWallet = async () => {
      try {
        // Using a placeholder public key. Replace this with a valid Base58 encoded key when ready.
        const pubKeyStr = '11111111111111111111111111111111'; // Example placeholder key
        const pubKey = new PublicKey(pubKeyStr);
        setPublicKey(pubKey);

        // Fetch the balance
        const balance = await connection.getBalance(pubKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Invalid public key:', error);
      }
    };

    loadWallet();
  }, []);

  return (
    <div className="wallet-container">
      <h3>Wallet</h3>
      {publicKey ? (
        <>
          <p>Public Key: {publicKey.toString()}</p>
          <p>Balance: {balance} SOL</p>
        </>
      ) : (
        <p>No valid public key available.</p>
      )}
    </div>
  );
};

export default Wallet;
