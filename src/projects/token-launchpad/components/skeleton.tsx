import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonLoader() {
  return (
    <div className='flex min-h-[calc(100vh-96px)] items-center justify-center bg-background p-4'>
      <div className='w-full max-w-3xl'>
        <Card className='shadow-lg'>
          <CardHeader className='space-y-2 bg-primary/5 text-center'>
            <Skeleton className='mx-auto h-9 w-3/4' />
            <Skeleton className='mx-auto h-5 w-2/3' />
          </CardHeader>
          <CardContent className='mt-6 space-y-6'>
            <Skeleton className='mx-auto h-10 w-40' />
            <div className='space-y-4'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='space-y-2'>
                  <Skeleton className='h-4 w-1/4' />
                  <Skeleton className='h-10 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              ))}
              <Skeleton className='h-10 w-full' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
