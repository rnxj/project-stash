import { generateMnemonic } from 'bip39';
import { motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { RecoveryPhraseDisplay } from '@/projects/wallet/components/recovery-phrase-display';
import { useWalletStore } from '@/projects/wallet/hooks/use-wallet-store';

interface CreateWalletProps {
  nextStep: () => void;
}

export const CreateWallet: React.FC<CreateWalletProps> = ({ nextStep }) => {
  const [savedRecoveryPhrase, setSavedRecoveryPhrase] = useState(false);
  const { setRecoveryPhrase } = useWalletStore();
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  const handleNext = () => {
    setRecoveryPhrase(mnemonic);
    nextStep();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && savedRecoveryPhrase) {
      handleNext();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [savedRecoveryPhrase]);

  useEffect(() => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic.split(' '));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-6'
    >
      <h2 className='text-center text-2xl font-bold'>Secret Recovery Phrase</h2>
      <p className='text-center text-muted-foreground'>Save these words in a safe place.</p>
      <RecoveryPhraseDisplay phrase={mnemonic} />
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='saved'
          checked={savedRecoveryPhrase}
          onCheckedChange={(checked) => setSavedRecoveryPhrase(checked as boolean)}
        />
        <label
          htmlFor='saved'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          I saved my secret recovery phrase
        </label>
      </div>
      <Button
        className='w-full'
        onClick={handleNext}
        disabled={!savedRecoveryPhrase}
        id='next-saved'
      >
        Next
      </Button>
    </motion.div>
  );
};
