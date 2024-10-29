import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useWalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getBalance = async () => {
    if (publicKey) {
      try {
        setIsRefreshing(true);
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Failed to get balance:', error);
        setBalance(null);
        toast.error('Failed to get balance', {
          description: 'Please try again later.',
          richColors: true,
          duration: 5000,
        });
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    if (publicKey) {
      getBalance();
      const interval = setInterval(getBalance, 30000);
      return () => clearInterval(interval);
    }
  }, [publicKey, connection]);

  return { balance, isRefreshing, getBalance };
};
