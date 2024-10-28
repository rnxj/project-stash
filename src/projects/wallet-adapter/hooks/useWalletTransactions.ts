import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { toast } from 'sonner';

export const useWalletTransactions = (getBalance: () => Promise<void>) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isAirdropLoading, setIsAirdropLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const getAirdrop = async (sol: number) => {
    setIsAirdropLoading(true);
    try {
      if (!publicKey) {
        throw new Error('Wallet is not Connected');
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, sol * LAMPORTS_PER_SOL),
      ]);
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );
      if (sigResult) {
        toast.success('Airdrop was confirmed!', {
          description: 'Your wallet has been credited with 0.1 SOL.',
          richColors: true,
          duration: 5000,
        });
        getBalance();
      }
    } catch (err) {
      toast.error('Airdrop failed', {
        description: 'You are rate limited for Airdrop. Please try again later.',
        richColors: true,
        duration: 5000,
      });
    } finally {
      setIsAirdropLoading(false);
    }
  };

  const sendSol = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSendLoading(true);

    if (!publicKey) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to send SOL.',
        richColors: true,
        duration: 5000,
      });
      setIsSendLoading(false);
      return;
    }

    try {
      const recipientPubKey = new PublicKey(recipientAddress);
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: amountLamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      toast.success('Transaction successful', {
        description: `Sent ${amount} SOL to ${recipientAddress.slice(0, 4)}...${recipientAddress.slice(-4)}`,
        richColors: true,
        duration: 5000,
      });

      setRecipientAddress('');
      setAmount('');
      getBalance();
    } catch (error: any) {
      toast.error('Transaction failed', {
        description: error.message,
        richColors: true,
        duration: 5000,
      });
    } finally {
      setIsSendLoading(false);
    }
  };

  return {
    isAirdropLoading,
    isSendLoading,
    recipientAddress,
    setRecipientAddress,
    amount,
    setAmount,
    getAirdrop,
    sendSol,
  };
};
