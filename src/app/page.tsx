'use client';

import { useEffect, useState } from 'react';

import { LeftSidebar } from '@/projects/portfolio/components/left-sidebar';
import { MainContent } from '@/projects/portfolio/components/main-content';
import { MobileBottomNav } from '@/projects/portfolio/components/mobile-bottom-nav';
import { RightSidebar } from '@/projects/portfolio/components/right-sidebar';
import { TopNav } from '@/projects/portfolio/components/top-nav';

export default function Portfolio() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='relative min-h-[calc(100vh-64px)]'>
      <div className='flex min-h-[calc(100vh-64px)]'>
        <LeftSidebar scrollToTop={scrollToTop} />
        <div className='flex-1'>
          <TopNav time={time} />
          <MainContent />
        </div>
        <RightSidebar />
      </div>
      <MobileBottomNav scrollToTop={scrollToTop} />
    </div>
  );
}
