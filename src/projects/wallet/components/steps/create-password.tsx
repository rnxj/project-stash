import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useWalletStore } from '@/projects/wallet/hooks/use-wallet-store';
import { sha256 } from '@/projects/wallet/lib/utils';

interface CreatePasswordProps {
  nextStep: () => void;
}

export const CreatePassword: React.FC<CreatePasswordProps> = ({ nextStep }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
  });
  const { setHashedPassword } = useWalletStore();

  const checkPasswordStrength = (value: string) => {
    setPasswordCriteria({
      length: value.length >= 8,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    const hashedPassword = await sha256(password);
    setHashedPassword(hashedPassword);
    nextStep();
  };

  const isSubmitDisabled = !passwordCriteria.length || !agreedToTerms;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isSubmitDisabled) {
        e.preventDefault();
        handleSubmit(new Event('submit') as any);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmitDisabled]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='space-y-6'
    >
      <h2 className='text-center text-2xl font-bold'>Create a Password</h2>
      <p className='text-center text-muted-foreground'>
        It should be at least 8 characters. You'll need this to unlock Wallet.
      </p>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>

          <div className='relative'>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className='pr-10'
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='absolute right-0 top-0 h-full'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
            </Button>
          </div>
          <div className='mt-2 space-y-1'>
            <div className='flex justify-between text-xs'>
              <span className='text-muted-foreground'>Password strength:</span>
              <span className='font-medium'>
                {Object.values(passwordCriteria).filter(Boolean).length} / 5
              </span>
            </div>
            <div className='flex h-1 gap-1'>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    index < Object.values(passwordCriteria).filter(Boolean).length
                      ? [
                          'bg-red-500',
                          'bg-orange-500',
                          'bg-yellow-500',
                          'bg-lime-500',
                          'bg-green-500',
                        ][Object.values(passwordCriteria).filter(Boolean).length - 1]
                      : 'bg-secondary'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='terms'
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <label
            htmlFor='terms'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            I agree to the Terms of Service
          </label>
        </div>
        <Button type='submit' className='w-full' disabled={isSubmitDisabled} id='next-password'>
          Next
        </Button>
      </form>
    </motion.div>
  );
};
