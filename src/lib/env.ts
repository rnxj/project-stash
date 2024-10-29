import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SOL_DEVNET_RPC_URL: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse({
  NEXT_PUBLIC_SOL_DEVNET_RPC_URL: process.env.NEXT_PUBLIC_SOL_DEVNET_RPC_URL,
});
