'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CreditCard, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  airdropAmount: z.coerce
    .number()
    .positive()
    .min(0.000000001, 'Minimum airdrop amount is 0.000000001 SOL')
    .max(2, 'Maximum airdrop amount is 2 SOL'),
});

interface AirdropFormProps {
  getAirdrop: (sol: number) => Promise<void>;
  isAirdropLoading: boolean;
}

export function AirdropForm({ getAirdrop, isAirdropLoading }: AirdropFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      airdropAmount: 0.1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await getAirdrop(values.airdropAmount);
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <FormField
          control={form.control}
          name='airdropAmount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Airdrop Amount (SOL)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='0.000000001'
                  min='0.000000001'
                  max='2'
                  placeholder='Enter amount to request'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Request an airdrop of SOL. Minimum is 0.000000001 SOL, maximum is 2 SOL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
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
      </motion.form>
    </Form>
  );
}
