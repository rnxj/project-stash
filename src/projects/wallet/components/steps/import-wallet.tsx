import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useWalletStore } from '@/projects/wallet/hooks/use-wallet-store';

interface ImportWalletProps {
  nextStep: () => void;
}

export const ImportWallet: React.FC<ImportWalletProps> = ({ nextStep }) => {
  const [importedRecoveryPhrase, setImportedRecoveryPhrase] = useState(Array(12).fill(''));
  const [use24Words, setUse24Words] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setRecoveryPhrase } = useWalletStore();

  const handlePhraseChange = (index: number, value: string) => {
    const newPhrase = [...importedRecoveryPhrase];
    newPhrase[index] = value;
    setImportedRecoveryPhrase(newPhrase);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const words = pastedText.trim().split(/\s+/);
    const newPhrase = [...importedRecoveryPhrase];

    for (let i = 0; i < words.length && index + i < (use24Words ? 24 : 12); i++) {
      newPhrase[index + i] = words[i];
    }

    setImportedRecoveryPhrase(newPhrase);

    const nextEmptyIndex = newPhrase.findIndex((word, i) => i > index && !word);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[use24Words ? 23 : 11]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setRecoveryPhrase(importedRecoveryPhrase);
    nextStep();
  };

  const isFormValid = () => {
    return (
      !importedRecoveryPhrase.some((word) => !word) &&
      importedRecoveryPhrase.length === (use24Words ? 24 : 12)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-4'
    >
      <h2 className='text-center text-2xl font-bold'>Secret Recovery Phrase</h2>
      <p className='text-center text-muted-foreground'>Enter or paste your 12 or 24-word phrase.</p>
      <Button
        type='button'
        variant='link'
        className='w-full'
        onClick={() => {
          setUse24Words(!use24Words);
          setImportedRecoveryPhrase(Array(use24Words ? 24 : 12).fill(''));
        }}
      >
        Use {use24Words ? '12' : '24'} words
      </Button>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 gap-2'>
          {Array(use24Words ? 24 : 12)
            .fill(null)
            .map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <div className='flex items-center space-x-2'>
                  <Label htmlFor={`word-${index}`} className='w-6 text-right'>
                    {index + 1}
                  </Label>
                  <Input
                    id={`word-${index}`}
                    value={importedRecoveryPhrase[index] || ''}
                    onChange={(e) => handlePhraseChange(index, e.target.value)}
                    onPaste={(e) => handlePaste(e, index)}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    className='flex-1'
                  />
                </div>
              </motion.div>
            ))}
        </div>
        <Button type='submit' className='mt-4 w-full' disabled={!isFormValid()} id='next-import'>
          Import
        </Button>
      </form>
    </motion.div>
  );
};
