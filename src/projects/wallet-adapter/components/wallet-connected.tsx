'use client';

import { PublicKey } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Check, Copy, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { AirdropForm } from '@/projects/wallet-adapter/components/forms/airdrop-form';
import { WalletSendForm } from '@/projects/wallet-adapter/components/forms/send-form';

interface WalletInterfaceProps {
  publicKey: PublicKey;
  balance: number | null;
  isRefreshing: boolean;
  getBalance: () => Promise<void>;
  copyToClipboard: (text: string) => void;
  isCopied: boolean;
  getAirdrop: (sol: number) => Promise<void>;
  isAirdropLoading: boolean;
  sendSol: (recipientAddress: string, amount: number) => Promise<void>;
  isSendLoading: boolean;
}

const PublicKeyDisplay: React.FC<{
  publicKey: PublicKey;
  copyToClipboard: (text: string) => void;
  isCopied: boolean;
}> = ({ publicKey, copyToClipboard, isCopied }) => (
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
);

const BalanceDisplay: React.FC<{
  balance: number | null;
  isRefreshing: boolean;
  getBalance: () => Promise<void>;
}> = ({ balance, isRefreshing, getBalance }) => (
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
);

export function WalletConnected({
  publicKey,
  balance,
  isRefreshing,
  getBalance,
  copyToClipboard,
  isCopied,
  getAirdrop,
  isAirdropLoading,
  sendSol,
  isSendLoading,
}: WalletInterfaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='space-y-4'
    >
      <PublicKeyDisplay
        publicKey={publicKey}
        copyToClipboard={copyToClipboard}
        isCopied={isCopied}
      />
      <BalanceDisplay balance={balance} isRefreshing={isRefreshing} getBalance={getBalance} />
      <Tabs defaultValue='airdrop' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='airdrop'>Airdrop</TabsTrigger>
          <TabsTrigger value='send'>Send</TabsTrigger>
        </TabsList>
        <TabsContent value='airdrop'>
          <AirdropForm getAirdrop={getAirdrop} isAirdropLoading={isAirdropLoading} />
        </TabsContent>
        <TabsContent value='send'>
          <WalletSendForm sendSol={sendSol} isSendLoading={isSendLoading} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
