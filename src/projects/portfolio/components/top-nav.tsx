import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export function TopNav({ time }: { time: Date | null }) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
    }).format(date);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4'
    >
      <div className='flex items-center space-x-2'>
        <div
          className={cn(
            'flex items-center space-x-2 rounded-md border border-border bg-muted/30 px-3 py-1 backdrop-blur-xl',
            'transition-colors duration-200 hover:bg-muted'
          )}
        >
          <div className='relative h-2 w-2'>
            <div className='absolute h-full w-full animate-pulse rounded-full bg-green-500' />
            <div className='absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-75' />
          </div>
          <span className='text-sm text-foreground'>Available For Work</span>
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center space-x-2'>
          <span className='hidden text-sm text-muted-foreground sm:block'>Local Time (IST)</span>
          <span
            className={cn(
              'rounded-md border border-border bg-muted/30 px-3 py-1 text-sm text-foreground backdrop-blur-xl',
              'transition-colors duration-200 hover:bg-muted',
              time ? '' : 'animate-pulse'
            )}
          >
            {time ? (
              formatTime(time)
            ) : (
              <span className='inline-block h-4 w-[3.4rem]' aria-hidden='true' />
            )}
            <span className='sr-only'>
              {time ? `Current time is ${formatTime(time)}` : 'Loading time'}
            </span>
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
