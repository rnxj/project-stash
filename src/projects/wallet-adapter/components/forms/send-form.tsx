'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
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
  recipientAddress: z.string().min(32).max(44),
  amount: z.coerce.number().positive().min(0.000000001),
});

interface WalletSendFormProps {
  sendSol: (recipientAddress: string, amount: number) => Promise<void>;
  isSendLoading: boolean;
}

export function WalletSendForm({ sendSol, isSendLoading }: WalletSendFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientAddress: '',
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sendSol(values.recipientAddress, values.amount);
  }

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <FormField
          control={form.control}
          name='recipientAddress'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipient's public key" {...field} />
              </FormControl>
              <FormDescription>This is the Solana public key of the recipient.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (SOL)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  step='0.000000001'
                  placeholder='Enter amount to send'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The amount of SOL to send. Minimum is 0.000000001 SOL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
    </Form>
  );
}
