'use client';

import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import bs58 from 'bs58';
import { derivePath } from 'ed25519-hd-key';
import { ethers } from 'ethers';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Copy, Eye, EyeOff, Key, Loader, Plus, Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { RecoveryPhraseDisplay } from '@/projects/wallet/components/recovery-phrase-display';
import { useWalletStore } from '@/projects/wallet/hooks/use-wallet-store';
import { sha256 } from '@/projects/wallet/lib/utils';

interface WalletInfo {
  publicKey: string;
  privateKey: string;
  path: string;
}

export const WalletDashboard: React.FC = () => {
  const {
    recoveryPhrase: storedPhrase,
    hashedPassword,
    selectedNetwork,
    clearWalletStore,
    setWalletPaths,
    walletPaths,
  } = useWalletStore();
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([]);
  const [expandedWallet, setExpandedWallet] = useState<number | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (showRecoveryPhrase && storedPhrase && walletPaths.length === 0) {
      addWallet();
    }
    setVisiblePrivateKeys(new Array(walletPaths.length).fill(false));
  }, [showRecoveryPhrase, storedPhrase, walletPaths]);

  const deriveWalletInfo = (index: number): WalletInfo => {
    if (!storedPhrase) throw new Error('Recovery phrase not available');

    const seedBuffer = mnemonicToSeedSync(storedPhrase.join(' '));
    const path = `m/44'/${selectedNetwork === 'ethereum' ? '60' : '501'}'/0'/${index}'`;
    const { key: derivedSeed } = derivePath(path, seedBuffer.toString('hex'));

    let publicKey: string;
    let privateKey: string;

    if (selectedNetwork === 'solana') {
      const { secretKey } = Keypair.fromSeed(derivedSeed);
      const keypair = Keypair.fromSecretKey(secretKey);
      publicKey = keypair.publicKey.toBase58();
      privateKey = bs58.encode(secretKey);
    } else {
      const ethWallet = new ethers.Wallet(Buffer.from(derivedSeed).toString('hex'));
      publicKey = ethWallet.address;
      privateKey = ethWallet.privateKey;
    }

    return { publicKey, privateKey, path };
  };

  const addWallet = () => {
    const newIndex = walletPaths.length;
    setWalletPaths([...walletPaths, newIndex]);
    setVisiblePrivateKeys([...visiblePrivateKeys, false]);
  };

  const handleVerifyPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifying(true);
    setIsPasswordIncorrect(false);
    try {
      const hashedInputPassword = await sha256(password);
      if (hashedInputPassword === hashedPassword) {
        setShowRecoveryPhrase(true);
      } else {
        setIsPasswordIncorrect(true);
        toast.error('Incorrect password. Please try again.', {
          duration: 5000,
          richColors: true,
          closeButton: true,
        });
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.', {
        duration: 5000,
        richColors: true,
        closeButton: true,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setVisiblePrivateKeys(
      visiblePrivateKeys.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const toggleWalletExpansion = (index: number) => {
    setExpandedWallet(expandedWallet === index ? null : index);
  };

  const handleDeleteAllWallets = () => {
    clearWalletStore();
    setWalletPaths([]);
    setVisiblePrivateKeys([]);
    setShowRecoveryPhrase(false);
    setPassword('');
    toast.success('All wallets have been deleted.');
  };

  const handleDeleteWallet = (index: number) => {
    setWalletPaths(walletPaths.filter((_, i) => i !== index));
    setVisiblePrivateKeys(visiblePrivateKeys.filter((_, i) => i !== index));
    toast.success(`Wallet ${index + 1} has been deleted.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-6'
    >
      <div className='space-y-4'>
        {showRecoveryPhrase ? (
          <>
            <h2 className='text-center text-2xl font-bold'>Your Wallets</h2>
            <h3 className='text-xl font-semibold'>Recovery Phrase</h3>
            {storedPhrase && <RecoveryPhraseDisplay phrase={storedPhrase} />}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='mt-6 space-y-4'
            >
              <div className='flex flex-col items-start justify-between gap-4 sm:flex-row'>
                <h3 className='text-xl font-semibold'>Wallet Addresses</h3>
                <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
                  <Button onClick={addWallet} size='sm'>
                    <Plus className='mr-1 h-4 w-4' />
                    Add Wallet
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant='destructive' size='sm'>
                        <Trash2 className='mr-1 h-4 w-4' />
                        Delete All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete all your
                          wallets and clear the stored data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAllWallets}>
                          Yes, delete all
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <AnimatePresence>
                {walletPaths.map((pathIndex, index) => {
                  const walletInfo = deriveWalletInfo(pathIndex);
                  return (
                    <motion.div
                      key={pathIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className='mb-4'>
                        <CardHeader
                          className='cursor-pointer'
                          onClick={() => toggleWalletExpansion(index)}
                        >
                          <CardTitle className='flex items-center justify-between'>
                            <span>Wallet {pathIndex + 1}</span>
                            <div className='flex items-center gap-2'>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant='destructive'
                                    size='sm'
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Trash2 className='h-4 w-4' />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Wallet {index + 1}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete
                                      this wallet.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteWallet(index)}>
                                      Yes, delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              {expandedWallet === index ? (
                                <ChevronUp className='h-5 w-5' />
                              ) : (
                                <ChevronDown className='h-5 w-5' />
                              )}
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <AnimatePresence>
                          {expandedWallet === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <CardContent className='space-y-4'>
                                <div className='space-y-2'>
                                  <Label>Public Key</Label>
                                  <div className='flex items-center justify-between rounded-md bg-secondary p-2'>
                                    <code className='break-all text-sm'>
                                      {walletInfo.publicKey}
                                    </code>
                                    <Button
                                      variant='ghost'
                                      size='sm'
                                      onClick={() => copyToClipboard(walletInfo.publicKey)}
                                    >
                                      <Copy className='h-4 w-4' />
                                    </Button>
                                  </div>
                                </div>
                                <div className='space-y-2'>
                                  <Label>Private Key</Label>
                                  <div className='flex items-center justify-between rounded-md bg-secondary p-2'>
                                    <code className='break-all text-sm'>
                                      {visiblePrivateKeys[index]
                                        ? walletInfo.privateKey
                                        : '•'.repeat(20)}
                                    </code>
                                    <div className='flex flex-col items-center space-x-2 sm:flex-row'>
                                      <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => togglePrivateKeyVisibility(index)}
                                      >
                                        {visiblePrivateKeys[index] ? (
                                          <EyeOff className='h-4 w-4' />
                                        ) : (
                                          <Eye className='h-4 w-4' />
                                        )}
                                      </Button>
                                      <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => copyToClipboard(walletInfo.privateKey)}
                                      >
                                        <Copy className='h-4 w-4' />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <Card className='mx-auto w-full max-w-xl'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold'>Secure Access</CardTitle>
              <CardDescription>Enter your password to view sensitive information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyPassword} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-sm font-medium'>
                    Password
                  </Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pr-10 ${isPasswordIncorrect ? 'border-red-500 dark:border-red-400' : ''}`}
                      placeholder='Enter your password'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <EyeOff className='h-4 w-4 text-gray-500' />
                      ) : (
                        <Eye className='h-4 w-4 text-gray-500' />
                      )}
                    </Button>
                  </div>
                </div>
                {/* {isPasswordIncorrect && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-sm text-red-500 dark:text-red-400'
                  >
                    Incorrect password. Please try again.
                  </motion.p>
                )} */}
                <Button type='submit' className='w-full' disabled={!password || isVerifying}>
                  {isVerifying ? (
                    <Loader className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <Key className='mr-2 h-4 w-4' />
                  )}
                  {isVerifying ? 'Verifying...' : 'View Recovery Phrase and Wallets'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};
