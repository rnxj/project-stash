'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  tokenName: z.string().min(1, 'Token name is required'),
  tokenSymbol: z.string().min(1, 'Token symbol is required'),
  tokenMetadataUri: z.string().url('Invalid metadata URI'),
  initialSupply: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Initial supply must be a positive number',
  }),
  enableFreeze: z.boolean(),
});

interface TokenCreationFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isCreatingToken: boolean;
}

export function TokenCreationForm({ onSubmit, isCreatingToken }: TokenCreationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenName: '',
      tokenSymbol: '',
      tokenMetadataUri: '',
      initialSupply: '',
      enableFreeze: false,
    },
  });

  const formFields = [
    {
      name: 'tokenName',
      label: 'Token Name',
      placeholder: 'My Awesome Token',
      description: 'The name of your token (e.g., "Solana")',
      type: 'text',
    },
    {
      name: 'tokenSymbol',
      label: 'Token Symbol',
      placeholder: 'MAT',
      description: 'The symbol of your token (e.g., "SOL")',
      type: 'text',
    },
    {
      name: 'tokenMetadataUri',
      label: 'Token Metadata URI',
      placeholder: 'https://example.com/token-metadata.json',
      description: "The URI of your token's metadata JSON file",
      type: 'text',
    },
    {
      name: 'initialSupply',
      label: 'Initial Supply',
      placeholder: '1000000',
      description: 'The initial number of tokens to mint',
      type: 'text',
    },
    {
      name: 'enableFreeze',
      label: 'Enable Freeze Authority',
      description: 'Allow freezing of token accounts',
      type: 'switch',
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <AnimatePresence>
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FormField
                control={form.control}
                name={field.name as keyof z.infer<typeof formSchema>}
                render={({ field: formField }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === 'switch' ? (
                        <div className='flex items-center space-x-2'>
                          <Switch
                            checked={formField.value as boolean}
                            onCheckedChange={formField.onChange}
                          />
                          <span>{field.description}</span>
                        </div>
                      ) : (
                        <Input
                          placeholder={field.placeholder}
                          {...formField}
                          value={formField.value as string}
                        />
                      )}
                    </FormControl>
                    {field.type !== 'switch' && (
                      <FormDescription>{field.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button type='submit' className='w-full' disabled={isCreatingToken}>
            {isCreatingToken ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Creating and Minting Token...
              </>
            ) : (
              'Create and Mint Token'
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
