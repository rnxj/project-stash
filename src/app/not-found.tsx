import { Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Custom404() {
  return (
    <div className='flex h-[calc(100vh-6rem)] items-center justify-center bg-background text-foreground'>
      <main className='flex w-full flex-col items-center justify-center px-4 text-center sm:px-20'>
        <h1 className='mb-2 text-6xl font-bold md:text-7xl'>404</h1>
        <h2 className='mb-4 text-xl font-semibold md:text-2xl'>This page could not be found.</h2>
        <p className='mb-6 max-w-md text-muted-foreground'>
          But don't worry, you can find plenty of other things on the homepage.
        </p>
        <Button asChild size='lg'>
          <Link href='/'>
            <Home className='mr-2 h-4 w-4' /> Return Home
          </Link>
        </Button>
      </main>
    </div>
  );
}
