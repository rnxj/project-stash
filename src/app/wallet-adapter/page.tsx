'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { WalletSkeleton } from '@/projects/wallet-adapter/components/skeleton';
import { StyledWalletButton } from '@/projects/wallet-adapter/components/styled-wallet-button';
import { WalletConnected } from '@/projects/wallet-adapter/components/wallet-connected';
import { WalletDisconnected } from '@/projects/wallet-adapter/components/wallet-disconnected';
import { useCopyToClipboard } from '@/projects/wallet-adapter/hooks/use-copy-to-clipboard';
import { useWalletBalance } from '@/projects/wallet-adapter/hooks/use-wallet-balance';
import { useWalletTransactions } from '@/projects/wallet-adapter/hooks/use-wallet-transactions';

export default function SolanaWallet() {
  const { publicKey } = useWallet();
  const { balance, isRefreshing, getBalance } = useWalletBalance();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [mounted, setMounted] = useState(false);

  const { isAirdropLoading, isSendLoading, getAirdrop, sendSol } =
    useWalletTransactions(getBalance);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <WalletSkeleton />;
  }

  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-gradient-to-br from-background to-secondary/20'>
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
              {publicKey ? (
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
