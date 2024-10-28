import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export const WalletDisconnected = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className='text-center text-muted-foreground'
    >
      <Wallet className='mx-auto mb-2 h-12 w-12' />
      <p>Wallet is not connected</p>
    </motion.div>
  );
};
