'use client';

import { usePathname } from 'next/navigation';
import { Suspense, lazy, useEffect, useState } from 'react';

import { AppSidebar } from '@/components/nav/app-sidebar';
import { ThemeToggle } from '@/components/nav/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const DynamicBreadcrumbs = lazy(() => import('@/components/custom/dynamic-breadcrumb'));

function BreadcrumbsFallback() {
  return <div className='h-6 w-40 animate-pulse rounded bg-muted' />;
}

export function SidebarNavLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b'>
          <div className='flex items-center gap-2 px-3'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='mr-2 h-4' />
            {isClient ? (
              <Suspense fallback={<BreadcrumbsFallback />}>
                <DynamicBreadcrumbs pathname={pathname} />
              </Suspense>
            ) : (
              <BreadcrumbsFallback />
            )}
          </div>
          <div className='flex items-center gap-2 px-3'>
            <ThemeToggle />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
