import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function MobileBottomNav({ scrollToTop }: { scrollToTop: () => void }) {
  return (
    <div className='fixed bottom-4 right-4 md:hidden'>
      <Button
        onClick={scrollToTop}
        size='icon'
        className='rounded-full shadow-lg'
        aria-label='Scroll to top'
      >
        <ArrowUp className='h-5 w-5' />
      </Button>
    </div>
  );
}
