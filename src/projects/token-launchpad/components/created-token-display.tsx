'use client';

import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Landmark, LucideIcon, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useCopyToClipboard } from '../hooks/use-copy-to-clipboard';

interface CreatedTokenDisplayProps {
  mintAddress: string;
  associatedTokenAddress: string;
}

export function CreatedTokenDisplay({
  mintAddress,
  associatedTokenAddress,
}: CreatedTokenDisplayProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [activeTab, setActiveTab] = useState('mint');

  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const AddressButton = ({
    address,
    label,
    icon: Icon,
  }: {
    address: string;
    label: string;
    icon: LucideIcon;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            className='w-full justify-between text-sm font-normal'
            onClick={() => copyToClipboard(address)}
          >
            <Icon className='mr-2 h-4 w-4 flex-shrink-0' />
            <span className='lg:truncate-none truncate'>
              <span className='lg:hidden'>{truncateAddress(address)}</span>
              <span className='hidden lg:inline'>{address}</span>
            </span>
            {isCopied ? (
              <Check className='ml-2 h-4 w-4 flex-shrink-0 text-green-500' />
            ) : (
              <Copy className='ml-2 h-4 w-4 flex-shrink-0' />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy {label} address</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-xl font-semibold'>Token Created Successfully!</CardTitle>
          <CardDescription>Your new token has been minted on the Solana devnet.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='mint'>
                <span className='hidden sm:inline'>Mint Address</span>
                <span className='sm:hidden'>Mint</span>
              </TabsTrigger>
              <TabsTrigger value='ata'>
                <span className='hidden sm:inline'>Associated Token Account</span>
                <span className='sm:hidden'>ATA</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value='mint' className='space-y-4'>
              <AddressButton address={mintAddress} label='mint' icon={Landmark} />
              <Button className='w-full text-sm' asChild>
                <Link
                  href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
                  target='_blank'
                >
                  <ExternalLink className='mr-2 h-4 w-4' />
                  <span className='hidden sm:inline'>View Mint on Solana Explorer</span>
                  <span className='sm:hidden'>View on Explorer</span>
                </Link>
              </Button>
            </TabsContent>
            <TabsContent value='ata' className='space-y-4'>
              <AddressButton address={associatedTokenAddress} label='token account' icon={Wallet} />
              <Button className='w-full text-sm' asChild>
                <Link
                  href={`https://explorer.solana.com/address/${associatedTokenAddress}?cluster=devnet`}
                  target='_blank'
                >
                  <ExternalLink className='mr-2 h-4 w-4' />
                  <span className='hidden sm:inline'>View Token Account on Solana Explorer</span>
                  <span className='sm:hidden'>View on Explorer</span>
                </Link>
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
