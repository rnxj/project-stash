'use client';

import { motion } from 'framer-motion';
import { Mail, User } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { childVariants, waveAnimation } from '../../data/animations';
import { AnimatedImage } from '../animated-image';
import { AnimatedSection } from '../animated-section';

export function HeroSection() {
  return (
    <AnimatedSection className='container mx-auto px-4 py-16'>
      <motion.div variants={childVariants} className='grid gap-8 md:grid-cols-2 md:items-center'>
        <AnimatedImage
          src='/avatar.png'
          alt='Profile'
          width={384}
          height={384}
          className='mx-auto aspect-square w-full max-w-xs rounded-3xl'
        />
        <motion.div variants={childVariants} className='space-y-6'>
          <div className='flex items-center gap-2'>
            <motion.span variants={waveAnimation} animate='animate'>
              👋
            </motion.span>
            <span className='text-muted-foreground'>Hello I Am</span>
          </div>
          <h1 className='text-4xl font-bold md:text-5xl'>Reuel Nixon</h1>
          <p className='text-muted-foreground'>
            Full-stack developer from Chennai, India, with expertise in React, Golang, Python, and
            TypeScript. Currently pursuing B.Tech in Computer Science at Vellore Institute of
            Technology.
          </p>
          <div className='flex flex-wrap gap-4'>
            <Button asChild className='gap-2'>
              <a href='mailto:reuelnixon@gmail.com'>
                <Mail className='h-4 w-4' /> Email Me
              </a>
            </Button>
            <Button asChild variant='outline' className='gap-2'>
              <a href='https://cal.com/reuel' target='_blank' rel='noopener noreferrer'>
                <User className='h-4 w-4' /> Schedule Call
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
