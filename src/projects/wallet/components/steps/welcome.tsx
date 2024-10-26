import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface WalletWelcomeProps {
  setFlow: (flow: 'create' | 'import') => void;
  nextStep: () => void;
}

export const WalletWelcome: React.FC<WalletWelcomeProps> = ({ setFlow, nextStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-6 text-center'
    >
      <Wallet className='mx-auto h-16 w-16 text-primary' />
      <h1 className='text-3xl font-bold'>Welcome to Wallet</h1>
      <p className='text-muted-foreground'>Let's get started.</p>
      <div className='space-y-2'>
        <Button
          className='w-full'
          onClick={() => {
            setFlow('create');
            nextStep();
          }}
          id='create'
        >
          Create a new wallet
        </Button>
        <Button
          variant='outline'
          className='w-full'
          onClick={() => {
            setFlow('import');
            nextStep();
          }}
          id='import'
        >
          Import Wallet
        </Button>
      </div>
    </motion.div>
  );
};
