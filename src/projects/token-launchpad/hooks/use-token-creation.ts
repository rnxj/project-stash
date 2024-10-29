import {
  ExtensionType,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMintLen,
} from '@solana/spl-token';
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { toast } from 'sonner';

export const useTokenCreation = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [createdTokenMint, setCreatedTokenMint] = useState<string | null>(null);
  const [associatedTokenAddress, setAssociatedTokenAddress] = useState<string | null>(null);

  const createAndMintToken = async (
    connection: Connection,
    metadata: {
      name: string;
      symbol: string;
      uri: string;
    },
    payerPublicKey: PublicKey,
    decimals: number,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey | null,
    initialSupply: number
  ) => {
    if (!payerPublicKey) throw new Error('Wallet not connected');

    const mintKeypair = Keypair.generate();

    const formattedMetadata = {
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      mint: mintKeypair.publicKey,
      additionalMetadata: [],
    };
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(formattedMetadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const associatedToken = getAssociatedTokenAddressSync(
      mintKeypair.publicKey,
      payerPublicKey,
      false,
      TOKEN_2022_PROGRAM_ID
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payerPublicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        mintKeypair.publicKey,
        mintAuthority,
        mintKeypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        decimals,
        mintAuthority,
        freezeAuthority,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        metadata: mintKeypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority,
        updateAuthority: mintAuthority,
      }),
      createAssociatedTokenAccountInstruction(
        payerPublicKey,
        associatedToken,
        payerPublicKey,
        mintKeypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createMintToInstruction(
        mintKeypair.publicKey,
        associatedToken,
        payerPublicKey,
        initialSupply * 10 ** decimals,
        [],
        TOKEN_2022_PROGRAM_ID
      )
    );

    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = payerPublicKey;
    transaction.partialSign(mintKeypair);

    const signature = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');
    return [mintKeypair.publicKey, associatedToken];
  };

  const handleCreateToken = async (values: {
    tokenName: string;
    tokenSymbol: string;
    tokenMetadataUri: string;
    enableFreeze: boolean;
    initialSupply: string;
  }) => {
    if (!wallet.publicKey) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to create a token',
        richColors: true,
        duration: 5000,
      });
      return;
    }

    setIsCreatingToken(true);
    try {
      const [mint, associatedToken] = await createAndMintToken(
        connection,
        {
          name: values.tokenName,
          symbol: values.tokenSymbol,
          uri: values.tokenMetadataUri,
        },
        wallet.publicKey,
        6,
        wallet.publicKey,
        values.enableFreeze ? wallet.publicKey : null,
        Number(values.initialSupply)
      );

      setCreatedTokenMint(mint.toString());
      setAssociatedTokenAddress(associatedToken.toString());
      toast.success('Token created and minted successfully', {
        description: `Mint address: ${mint.toString()}`,
        richColors: true,
        duration: 5000,
      });
    } catch (error) {
      toast.error('Error creating and minting token', {
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
    associatedTokenAddress,
    handleCreateToken,
  };
};
