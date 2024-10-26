'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { WalletComplete } from '@/projects/wallet/components/steps/complete';
import { CreateWallet } from '@/projects/wallet/components/steps/copy-phrase';
import { CreatePassword } from '@/projects/wallet/components/steps/create-password';
import { WalletDashboard } from '@/projects/wallet/components/steps/dashboard';
import { ImportWallet } from '@/projects/wallet/components/steps/import-wallet';
import { NetworkSelection } from '@/projects/wallet/components/steps/network-selection';
import { WalletWelcome } from '@/projects/wallet/components/steps/welcome';
import { useWalletFlow } from '@/projects/wallet/hooks/use-wallet-flow';
import { useWalletStore } from '@/projects/wallet/hooks/use-wallet-store';

export default function WalletPage() {
  const { step, flow, setFlow, nextStep } = useWalletFlow();
  const { isWalletCreated } = useWalletStore();

  useEffect(() => {
    toast.warning(
      'This application is for educational purposes only and does not implement the actual security techniques used by cryptocurrency wallets. That said, your data remains secure and will not be transmitted off your device.',
      {
        duration: 10000,
        id: 'disclaimer',
        richColors: true,
        closeButton: true,
      }
    );
  }, []);

  const renderStep = () => {
    if (isWalletCreated) {
      return <WalletDashboard />;
    }

    switch (step) {
      case 0:
        return <WalletWelcome setFlow={setFlow} nextStep={nextStep} />;
      case 1:
        return <NetworkSelection nextStep={nextStep} />;
      case 2:
        return <CreatePassword nextStep={nextStep} />;
      case 3:
        return flow === 'create' ? (
          <CreateWallet nextStep={nextStep} />
        ) : (
          <ImportWallet nextStep={nextStep} />
        );
      default:
        return <WalletComplete />;
    }
  };

  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-background text-foreground'>
      <div className='w-full max-w-2xl space-y-8 p-0 sm:p-4 md:p-8'>
        <AnimatePresence mode='wait'>{renderStep()}</AnimatePresence>
      </div>
    </div>
  );
}
