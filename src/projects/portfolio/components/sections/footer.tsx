'use client';

import { motion } from 'framer-motion';

import { childVariants } from '../../data/animations';
import { AnimatedSection } from '../animated-section';

export function Footer() {
  return (
    <AnimatedSection className='mb-8 border-t py-8 sm:mb-0'>
      <motion.div variants={childVariants} className='mx-auto px-4'>
        <div className='flex flex-col items-center justify-between space-y-4 text-center sm:flex-row sm:space-y-0 sm:text-left'>
          <div className='text-sm text-muted-foreground'>
            &copy; 2024 Reuel Nixon. No rights reserved.
          </div>
          <div className='text-sm text-muted-foreground'>Crafting digital experiences</div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
