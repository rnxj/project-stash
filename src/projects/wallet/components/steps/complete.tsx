import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { KeyboardEvent, useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { useWalletStore } from '@/projects/wallet/hooks/use-wallet-store';

interface WalletCompleteProps {
  clearFlow: () => void;
}

export const WalletComplete: React.FC<WalletCompleteProps> = ({ clearFlow }) => {
  const { setIsWalletCreated } = useWalletStore();

  const handleStartUsingWallet = () => {
    setIsWalletCreated(true);
    clearFlow();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleStartUsingWallet();
      }
    };

    document.addEventListener('keydown', handleKeyDown as any);

    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-6 text-center'
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100'
      >
        <Check className='h-8 w-8 text-green-500' />
      </motion.div>
      <h2 className='text-xl font-bold'>All set!</h2>
      <p className='text-base text-muted-foreground'>Your wallet is ready to use.</p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button className='w-full py-4 text-base' onClick={handleStartUsingWallet} id='start-using'>
          Start using Wallet
        </Button>
      </motion.div>
    </motion.div>
  );
};
