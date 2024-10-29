import { motion } from 'framer-motion';

export const WalletDisconnected = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className='text-center text-muted-foreground'
    >
      <p>Connect your wallet to continue</p>
    </motion.div>
  );
};
