'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { StyledWalletButton } from '@/projects/wallet-adapter/components/styled-wallet-button';
import { WalletConnected } from '@/projects/wallet-adapter/components/wallet-connected';
import { WalletDisconnected } from '@/projects/wallet-adapter/components/wallet-disconnected';
import { WalletSkeleton } from '@/projects/wallet-adapter/components/wallet-skeleton';
import { useCopyToClipboard } from '@/projects/wallet-adapter/hooks/useCopyToClipboard';
import { useWalletBalance } from '@/projects/wallet-adapter/hooks/useWalletBalance';
import { useWalletConnection } from '@/projects/wallet-adapter/hooks/useWalletConnection';
import { useWalletTransactions } from '@/projects/wallet-adapter/hooks/useWalletTransactions';

export default function SolanaWallet() {
  const { mounted, isConnected, publicKey } = useWalletConnection();
  const { balance, isRefreshing, getBalance } = useWalletBalance();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const {
    isAirdropLoading,
    isSendLoading,
    getAirdrop,
    sendSol,
  } = useWalletTransactions(getBalance);

  if (!mounted) {
    return <WalletSkeleton />;
  }

  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-2xl'
      >
        <Card className='overflow-hidden shadow-lg'>
          <CardHeader className='bg-primary/5 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className='text-3xl font-bold text-primary'>Solana Wallet</CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardDescription>Connect your wallet, get airdrops, and send SOL</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className='space-y-6 p-6'>
            <StyledWalletButton />
            <AnimatePresence mode='wait'>
              {isConnected && publicKey ? (
                <WalletConnected
                  key='connected'
                  publicKey={publicKey}
                  balance={balance}
                  isRefreshing={isRefreshing}
                  getBalance={getBalance}
                  copyToClipboard={copyToClipboard}
                  isCopied={isCopied}
                  getAirdrop={getAirdrop}
                  isAirdropLoading={isAirdropLoading}
                  sendSol={sendSol}
                  isSendLoading={isSendLoading}
                />
              ) : (
                <WalletDisconnected key='disconnected' />
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
