import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';

export const RecoveryPhraseDisplay = ({ phrase }: { phrase: string[] }) => {
  const [isRecoveryPhraseRevealed, setIsRecoveryPhraseRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(phrase.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [phrase]);

  return (
    <motion.div
      className='relative cursor-pointer overflow-hidden rounded-lg bg-secondary p-6 shadow-inner'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={copyToClipboard}
      onMouseEnter={() => setIsRecoveryPhraseRevealed(true)}
      onMouseLeave={() => setIsRecoveryPhraseRevealed(false)}
    >
      <motion.div
        className='absolute inset-0 z-10 flex items-center justify-center bg-secondary/80 backdrop-blur-sm'
        initial={{ opacity: 1 }}
        animate={{ opacity: isRecoveryPhraseRevealed ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className='text-muted-foreground'>Hover to reveal</p>
      </motion.div>
      <motion.div
        animate={{
          filter: isRecoveryPhraseRevealed ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4'>
          {phrase.map((word, index) => (
            <motion.div
              key={index}
              className='flex items-center space-x-2'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span className='text-xs text-muted-foreground'>{index + 1}</span>
              <span className='font-medium'>{word}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className='absolute right-2 top-2'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant='ghost'
          size='icon'
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard();
          }}
          className='text-muted-foreground hover:text-foreground'
        >
          {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
        </Button>
      </motion.div>
    </motion.div>
  );
};
