'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { CreatedTokenDisplay } from '@/projects/token-launchpad/components/created-token-display';
import { SkeletonLoader } from '@/projects/token-launchpad/components/skeleton';
import { TokenCreationForm } from '@/projects/token-launchpad/components/token-creation-form';
import { useTokenCreation } from '@/projects/token-launchpad/hooks/use-token-creation';
import { StyledWalletButton } from '@/projects/wallet-adapter/components/styled-wallet-button';

export default function TokenLaunchpadPage() {
  const { publicKey } = useWallet();
  const [isMounted, setIsMounted] = useState(false);
  const { isCreatingToken, createdTokenMint, handleCreateToken } = useTokenCreation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SkeletonLoader />;
  }

  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-background p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-3xl'
      >
        <Card className='shadow-lg'>
          <CardHeader className='bg-primary/5 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className='text-3xl font-bold text-primary'>
                Solana Token Launchpad
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardDescription>Create your own Token on Solana</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className='mt-6 space-y-6'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='mb-6 flex justify-center'
            >
              <StyledWalletButton />
            </motion.div>
            {publicKey ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <TokenCreationForm onSubmit={handleCreateToken} isCreatingToken={isCreatingToken} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='text-center'
              >
                <p className='text-muted-foreground'>Connect your wallet to create a token</p>
              </motion.div>
            )}
            {createdTokenMint && <CreatedTokenDisplay mintAddress={createdTokenMint} />}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
