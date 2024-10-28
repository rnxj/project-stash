import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

export const useWalletConnection = () => {
  const { publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    isConnected: !!publicKey,
    mounted,
    publicKey,
  };
};
