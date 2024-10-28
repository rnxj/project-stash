'use client';

import { PublicKey } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Check, Copy, CreditCard, Loader2, RefreshCw, Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WalletConnectedProps {
  publicKey: PublicKey;
  balance: number | null;
  isRefreshing: boolean;
  getBalance: () => Promise<void>;
  copyToClipboard: (text: string) => void;
  isCopied: boolean;
  getAirdrop: (sol: number) => Promise<void>;
  isAirdropLoading: boolean;
  sendSol: (event: React.FormEvent) => Promise<void>;
  recipientAddress: string;
  setRecipientAddress: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
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

const AirdropTab: React.FC<{
  getAirdrop: (sol: number) => Promise<void>;
  isAirdropLoading: boolean;
}> = ({ getAirdrop, isAirdropLoading }) => {
  const [airdropAmount, setAirdropAmount] = useState('0.1');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className='space-y-4'
    >
      <div>
        <Label htmlFor='airdropAmount'>Airdrop Amount (SOL)</Label>
        <Input
          id='airdropAmount'
          type='number'
          step='0.000000001'
          min='0'
          value={airdropAmount}
          onChange={(e) => setAirdropAmount(e.target.value)}
          required
        />
      </div>
      <Button
        onClick={() => getAirdrop(parseFloat(airdropAmount))}
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
  );
};

const SendTab: React.FC<{
  sendSol: (event: React.FormEvent) => Promise<void>;
  recipientAddress: string;
  setRecipientAddress: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  isSendLoading: boolean;
}> = ({ sendSol, recipientAddress, setRecipientAddress, amount, setAmount, isSendLoading }) => (
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
);

export const WalletConnected: React.FC<WalletConnectedProps> = ({
  publicKey,
  balance,
  isRefreshing,
  getBalance,
  copyToClipboard,
  isCopied,
  getAirdrop,
  isAirdropLoading,
  sendSol,
  recipientAddress,
  setRecipientAddress,
  amount,
  setAmount,
  isSendLoading,
}) => {
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
          <AirdropTab getAirdrop={getAirdrop} isAirdropLoading={isAirdropLoading} />
        </TabsContent>
        <TabsContent value='send'>
          <SendTab
            sendSol={sendSol}
            recipientAddress={recipientAddress}
            setRecipientAddress={setRecipientAddress}
            amount={amount}
            setAmount={setAmount}
            isSendLoading={isSendLoading}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
