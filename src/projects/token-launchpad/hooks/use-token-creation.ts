import {
  ExtensionType,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  getMintLen,
} from '@solana/spl-token';
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { toast } from 'sonner';

export const useTokenCreation = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [createdTokenMint, setCreatedTokenMint] = useState<string | null>(null);

  const createMint = async (
    connection: Connection,
    metadata: {
      name: string;
      symbol: string;
      uri: string;
    },
    payerPublicKey: PublicKey,
    decimals: number,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey | null
  ) => {
    if (!payerPublicKey) throw new Error('Wallet not connected');

    const keypair = Keypair.generate();

    const formattedMetadata = {
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      mint: keypair.publicKey,
      additionalMetadata: [],
    };
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(formattedMetadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payerPublicKey,
        newAccountPubkey: keypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        mintAuthority,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        keypair.publicKey,
        decimals,
        mintAuthority,
        freezeAuthority,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: keypair.publicKey,
        metadata: keypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority,
        updateAuthority: mintAuthority,
      })
    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = payerPublicKey;
    transaction.partialSign(keypair);

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');
    return keypair.publicKey;
  };

  const handleCreateToken = async (values: {
    tokenName: string;
    tokenSymbol: string;
    tokenMetadataUri: string;
  }) => {
    if (!publicKey) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to create a token',
        richColors: true,
        duration: 5000,
      });
      return;
    }

    setIsCreatingToken(true);
    try {
      const mint = await createMint(
        connection,
        {
          name: values.tokenName,
          symbol: values.tokenSymbol,
          uri: values.tokenMetadataUri,
        },
        publicKey,
        6,
        publicKey,
        null
      );

      setCreatedTokenMint(mint.toString());
      toast.success('Token created successfully', {
        description: `Mint address: ${mint.toString()}`,
        richColors: true,
        duration: 5000,
      });
    } catch (error) {
      toast.error('Error creating token', {
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        richColors: true,
        duration: 5000,
      });
    } finally {
      setIsCreatingToken(false);
    }
  };

  return {
    isCreatingToken,
    createdTokenMint,
    handleCreateToken,
  };
};
