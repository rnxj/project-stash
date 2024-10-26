import { AnimatePresence, motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { useWalletStore } from '@/projects/wallet/hooks/use-wallet-store';
import { networks } from '@/projects/wallet/lib/constants';

interface NetworkSelectionProps {
  nextStep: () => void;
}

export const NetworkSelection: React.FC<NetworkSelectionProps> = ({ nextStep }) => {
  const [network, setNetwork] = useState('');
  const { setSelectedNetwork } = useWalletStore();
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && network) {
      setSelectedNetwork(network);
      nextStep();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [network]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-4'
    >
      <h2 className='text-center text-2xl font-bold'>Select Network</h2>
      <p className='text-center text-muted-foreground'>
        Wallet supports multiple blockchains. Which do you want to use? You can add more later.
      </p>
      <AnimatePresence>
        {networks.map((net) => {
          return (
            <motion.div
              key={net.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant='outline'
                className={`w-full justify-start ${
                  network === net.id ? 'border-primary bg-primary/10' : ''
                } hover:bg-primary/10`}
                onClick={() => setNetwork(net.id)}
              >
                <img src={net.iconSrc} alt={net.name} className='mr-2 h-4 w-4' />
                {net.name}
              </Button>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <Button
        className='w-full'
        onClick={() => {
          setSelectedNetwork(network);
          nextStep();
        }}
        disabled={!network}
        id='next-network'
      >
        Next
      </Button>
    </motion.div>
  );
};
