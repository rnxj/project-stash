'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, CreditCard, Loader2, RefreshCw, Send, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function SolanaWallet() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAirdropLoading, setIsAirdropLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

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
        setIsRefreshing(true);
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
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  const sendSol = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSendLoading(true);

    if (!publicKey) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to send SOL.',
        richColors: true,
        duration: 5000,
      });
      setIsSendLoading(false);
      return;
    }

    try {
      const recipientPubKey = new PublicKey(recipientAddress);
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: amountLamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      toast.success('Transaction successful', {
        description: `Sent ${amount} SOL to ${recipientAddress.slice(0, 4)}...${recipientAddress.slice(-4)}`,
        richColors: true,
        duration: 5000,
      });

      setRecipientAddress('');
      setAmount('');
      getBalance();
    } catch (error: any) {
      toast.error('Transaction failed', {
        description: error.message,
        richColors: true,
        duration: 5000,
      });
    } finally {
      setIsSendLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);

    if (publicKey) {
      getBalance();
      const interval = setInterval(getBalance, 30000);
      return () => clearInterval(interval);
    }
  }, [publicKey, connection]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Copied to clipboard!', {
      richColors: true,
      duration: 2000,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

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
                  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className='wallet-adapter-button-trigger hover:bg-primary/90 hover:shadow-md'
              />
            </motion.div>
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
                  getAirdropOnClick={getAirdropOnClick}
                  isAirdropLoading={isAirdropLoading}
                  sendSol={sendSol}
                  recipientAddress={recipientAddress}
                  setRecipientAddress={setRecipientAddress}
                  amount={amount}
                  setAmount={setAmount}
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

function WalletConnected({
  publicKey,
  balance,
  isRefreshing,
  getBalance,
  copyToClipboard,
  isCopied,
  getAirdropOnClick,
  isAirdropLoading,
  sendSol,
  recipientAddress,
  setRecipientAddress,
  amount,
  setAmount,
  isSendLoading,
}: {
  publicKey: PublicKey;
  balance: number | null;
  isRefreshing: boolean;
  getBalance: () => Promise<void>;
  copyToClipboard: (text: string) => void;
  isCopied: boolean;
  getAirdropOnClick: () => Promise<void>;
  isAirdropLoading: boolean;
  sendSol: (event: React.FormEvent) => Promise<void>;
  recipientAddress: string;
  setRecipientAddress: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  isSendLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='space-y-4'
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
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
          {isCopied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='flex items-center justify-between rounded-lg bg-muted p-3'
      >
        <span className='font-semibold'>Balance:</span>
        <div className='flex items-center space-x-2'>
          <span>{balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}</span>
          <Button
            size='icon'
            variant='ghost'
            onClick={getBalance}
            disabled={isRefreshing}
            className='h-8 w-8'
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className='sr-only'>Refresh balance</span>
          </Button>
        </div>
      </motion.div>
      <Tabs defaultValue='airdrop' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='airdrop'>Airdrop</TabsTrigger>
          <TabsTrigger value='send'>Send</TabsTrigger>
        </TabsList>
        <TabsContent value='airdrop'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              onClick={getAirdropOnClick}
              disabled={isAirdropLoading}
              className='w-full bg-primary text-primary-foreground transition-all duration-200 ease-in-out hover:bg-primary/90 hover:shadow-md disabled:opacity-50'
            >
              {isAirdropLoading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <CreditCard className='mr-2 h-4 w-4' />
              )}
              {isAirdropLoading ? 'Processing...' : 'Get Airdrop'}
            </Button>
          </motion.div>
        </TabsContent>
        <TabsContent value='send'>
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onSubmit={sendSol}
            className='space-y-4'
          >
            <div>
              <Label htmlFor='recipient'>Recipient Address</Label>
              <Input
                id='recipient'
                placeholder="Enter recipient's public key"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor='amount'>Amount (SOL)</Label>
              <Input
                id='amount'
                type='number'
                step='0.000000001'
                min='0'
                placeholder='Enter amount to send'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <Button
              type='submit'
              disabled={isSendLoading}
              className='w-full bg-primary text-primary-foreground transition-all duration-200 ease-in-out hover:bg-primary/90 hover:shadow-md disabled:opacity-50'
            >
              {isSendLoading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Send className='mr-2 h-4 w-4' />
              )}
              {isSendLoading ? 'Sending...' : 'Send SOL'}
            </Button>
          </motion.form>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function WalletDisconnected() {
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
}

function WalletSkeleton() {
  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4'>
      <div className='w-full max-w-2xl'>
        <Card className='overflow-hidden shadow-lg'>
          <CardHeader className='bg-primary/5 text-center'>
            <div>
              <Skeleton className='mx-auto h-9 w-48' />
            </div>
            <div>
              <Skeleton className='mx-auto mt-2 h-4 w-64' />
            </div>
          </CardHeader>
          <CardContent className='space-y-6 p-6'>
            <div className='flex justify-center'>
              <Skeleton className='h-10 w-40' />
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg bg-muted p-3'>
                <Skeleton className='h-5 w-12 sm:w-24' />
                <div className='flex items-center'>
                  <Skeleton className='mr-2 h-5 w-24 sm:w-48' />
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
              <div className='space-y-2'>
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-32 w-full' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
