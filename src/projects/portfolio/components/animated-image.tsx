'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function AnimatedImage({ src, alt, width, height, className }: AnimatedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleChunks, setVisibleChunks] = useState<number[]>([]);

  useEffect(() => {
    if (imageLoaded) {
      const totalChunks = 100;
      const revealInterval = 10;
      let remainingChunks = Array.from({ length: totalChunks }, (_, i) => i);

      const intervalId = setInterval(() => {
        if (remainingChunks.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingChunks.length);
          const chunkToReveal = remainingChunks[randomIndex];
          remainingChunks.splice(randomIndex, 1);
          setVisibleChunks((prev) => [...prev, chunkToReveal]);
        } else {
          clearInterval(intervalId);
        }
      }, revealInterval);

      return () => clearInterval(intervalId);
    }
  }, [imageLoaded]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className='absolute inset-0 z-10 grid grid-cols-10 grid-rows-10'>
        <AnimatePresence>
          {Array.from({ length: 100 }).map((_, index) =>
            visibleChunks.includes(index) ? null : (
              <motion.div
                key={index}
                className='bg-background'
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )
          )}
        </AnimatePresence>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='object-cover'
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
