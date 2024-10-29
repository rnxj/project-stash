import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const WalletSkeleton = () => {
  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-gradient-to-br from-background to-secondary/20'>
      <div className='w-full max-w-2xl'>
        <Card className='overflow-hidden shadow-lg'>
          <CardHeader className='bg-primary/5 text-center'>
            <div>
              <Skeleton className='mx-auto h-9 w-48' />
            </div>
            <div>
              <Skeleton className='mx-auto mt-2 h-4 w-64' />
            </div>
          </CardHeader>
          <CardContent className='space-y-6 p-6'>
            <div className='flex justify-center'>
              <Skeleton className='h-10 w-40' />
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg bg-muted p-3'>
                <Skeleton className='h-5 w-12 sm:w-24' />
                <div className='flex items-center'>
                  <Skeleton className='mr-2 h-5 w-24 sm:w-48' />
                  <Skeleton className='h-4 w-4' />
                </div>
              </div>
              <div className='flex items-center justify-between rounded-lg bg-muted p-3'>
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-24' />
              </div>
              <div>
                <Skeleton className='h-10 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-32 w-full' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
