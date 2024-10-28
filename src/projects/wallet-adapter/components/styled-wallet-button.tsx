import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';

export const StyledWalletButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className='flex justify-center'
    >
      <WalletMultiButton
        style={{
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          fontWeight: '500',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          padding: '0.5rem 1rem',
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className='wallet-adapter-button-trigger hover:bg-primary/90 hover:shadow-md'
      />
    </motion.div>
  );
};
