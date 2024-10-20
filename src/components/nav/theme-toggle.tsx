'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Suspense, lazy, useEffect, useState } from 'react';

import { ButtonWithTooltip } from '@/components/custom/tooltip-button';

const ThemeToggleFallback = () => (
  <div className='h-8 w-8 animate-pulse rounded-full border border-input bg-muted' />
);

const ThemeToggleContent = () => {
  const { setTheme, theme } = useTheme();

  return (
    <ButtonWithTooltip
      tooltipText={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      tooltipProps={{ side: 'bottom' }}
      className='h-8 w-8 rounded-full bg-background'
      variant='outline'
      size='icon'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100' />
      <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0' />
      <span className='sr-only'>Switch Theme to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
    </ButtonWithTooltip>
  );
};

const ThemeToggleWithMountCheck = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <ThemeToggleFallback />;
  }

  return <ThemeToggleContent />;
};

const LazyThemeToggle = lazy(() => Promise.resolve({ default: ThemeToggleWithMountCheck }));

export function ThemeToggle() {
  return (
    <Suspense fallback={<ThemeToggleFallback />}>
      <LazyThemeToggle />
    </Suspense>
  );
}
