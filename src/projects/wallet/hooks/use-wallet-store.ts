import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WalletState {
  selectedNetwork: string;
  recoveryPhrase: string[];
  isWalletCreated: boolean;
  hashedPassword: string;
  walletPaths: number[];
  setSelectedNetwork: (network: string) => void;
  setRecoveryPhrase: (phrase: string[]) => void;
  setIsWalletCreated: (created: boolean) => void;
  setHashedPassword: (password: string) => void;
  setWalletPaths: (paths: number[]) => void;
  clearWalletStore: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      selectedNetwork: '',
      recoveryPhrase: [],
      isWalletCreated: false,
      hashedPassword: '',
      walletPaths: [],
      setSelectedNetwork: (network) => set({ selectedNetwork: network }),
      setRecoveryPhrase: (phrase) => set({ recoveryPhrase: phrase }),
      setIsWalletCreated: (created) => set({ isWalletCreated: created }),
      setHashedPassword: (password) => set({ hashedPassword: password }),
      setWalletPaths: (paths) => set({ walletPaths: paths }),
      clearWalletStore: () =>
        set({
          recoveryPhrase: undefined,
          hashedPassword: undefined,
          selectedNetwork: undefined,
          isWalletCreated: undefined,
          walletPaths: undefined,
        }),
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
