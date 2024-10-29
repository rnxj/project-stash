import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Key } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useCopyToClipboard } from '../hooks/use-copy-to-clipboard';

interface CreatedTokenDisplayProps {
  mintAddress: string;
}

export function CreatedTokenDisplay({ mintAddress }: CreatedTokenDisplayProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-xl font-semibold'>Token Created Successfully!</CardTitle>
          <CardDescription>
            Your new SPL token has been minted on the Solana devnet.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-between text-sm font-normal'
                    onClick={() => copyToClipboard(mintAddress)}
                  >
                    <Key className='mr-2 h-4 w-4 flex-shrink-0' />
                    <span className='truncate'>{truncateAddress(mintAddress)}</span>
                    {isCopied ? (
                      <Check className='ml-2 h-4 w-4 flex-shrink-0 text-green-500' />
                    ) : (
                      <Copy className='ml-2 h-4 w-4 flex-shrink-0' />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to copy mint address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button className='w-full text-sm' asChild>
            <Link
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
              target='_blank'
            >
              <ExternalLink className='mr-2 h-4 w-4' />
              View on Solana Explorer
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
