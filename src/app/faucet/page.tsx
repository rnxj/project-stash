'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Check, Copy, CreditCard, Loader2, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Component() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAirdropLoading, setIsAirdropLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getAirdropOnClick = async () => {
    setIsAirdropLoading(true);
    try {
      if (!publicKey) {
        throw new Error('Wallet is not Connected');
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 0.1 * LAMPORTS_PER_SOL),
      ]);
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );
      if (sigResult) {
        toast.success('Airdrop was confirmed!', {
          description: 'Your wallet has been credited with 0.1 SOL.',
          richColors: true,
          duration: 5000,
        });
        getBalance();
      }
    } catch (err) {
      toast.error('Airdrop failed', {
        description: 'You are rate limited for Airdrop. Please try again later.',
        richColors: true,
        duration: 5000,
      });
    } finally {
      setIsAirdropLoading(false);
    }
  };

  const getBalance = async () => {
    if (publicKey) {
      try {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Failed to get balance:', error);
        setBalance(null);
        toast.error('Failed to get balance', {
          description: 'Please try again later.',
          richColors: true,
          duration: 5000,
        });
      }
    }
  };

  useEffect(() => {
    setMounted(true);

    if (publicKey) {
      getBalance();
      const interval = setInterval(getBalance, 10000);
      return () => clearInterval(interval);
    }
  }, [publicKey, connection]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!mounted) {
    return (
      <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-background p-4'>
        <div className='w-full max-w-2xl'>
          <Card className='shadow-lg'>
            <CardHeader className='text-center'>
              <div>
                <Skeleton className='mx-auto h-9 w-48' />
              </div>
              <div>
                <Skeleton className='mx-auto mt-2 h-4 w-64' />
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex justify-center'>
                <Skeleton className='h-10 w-40' />
              </div>
              <div className='space-y-4'>
                <div className='flex items-center justify-between rounded-lg bg-muted p-3'>
                  <Skeleton className='h-5 w-24' />
                  <div className='flex items-center'>
                    <Skeleton className='mr-2 h-5 w-48' />
                    <Skeleton className='h-4 w-4' />
                  </div>
                </div>
                <div className='flex items-center justify-between rounded-lg bg-muted p-3'>
                  <Skeleton className='h-5 w-16' />
                  <Skeleton className='h-5 w-24' />
                </div>
                <div>
                  <Skeleton className='h-10 w-full' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-background p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-2xl'
      >
        <Card className='shadow-lg'>
          <CardHeader className='text-center'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className='text-3xl font-bold text-primary'>Solana Airdrop</CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardDescription>Connect your wallet and get SOL airdrops</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className='space-y-6'>
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
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                  padding: '0.5rem 1rem',
                  transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className='wallet-adapter-button-trigger'
              />
            </motion.div>
            {publicKey ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className='space-y-4'
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className='flex items-center justify-between rounded-lg bg-muted p-3'
                >
                  <span className='font-semibold'>Public Key:</span>
                  <div
                    className='flex cursor-pointer items-center'
                    onClick={() => copyToClipboard(publicKey.toString())}
                  >
                    <span className='mr-2 hidden md:block'>{publicKey.toString()}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className='mr-2 block truncate md:hidden'>
                            {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{publicKey.toString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {isCopied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className='flex items-center justify-between rounded-lg bg-muted p-3'
                >
                  <span className='font-semibold'>Balance:</span>
                  <span>{balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button
                    onClick={getAirdropOnClick}
                    disabled={isAirdropLoading}
                    className='w-full bg-primary text-primary-foreground transition-all duration-200 ease-in-out hover:bg-primary/90 disabled:opacity-50'
                  >
                    {isAirdropLoading ? (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                      <CreditCard className='mr-2 h-4 w-4' />
                    )}
                    {isAirdropLoading ? 'Processing...' : 'Get Airdrop'}
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className='text-center text-muted-foreground'
              >
                <Wallet className='mx-auto mb-2 h-12 w-12' />
                <p>Wallet is not connected</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
