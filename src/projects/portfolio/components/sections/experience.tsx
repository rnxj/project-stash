'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@/components/ui/card';

import { childVariants } from '../../data/animations';
import { AnimatedSection } from '../animated-section';

interface ExperienceProps {
  experience: Array<{
    company: string;
    role: string;
    period: string;
    type: string;
    website: string;
    image: {
      light: string;
      dark?: string;
    };
    description: string;
  }>;
}

export function ExperienceSection({ experience }: ExperienceProps) {
  return (
    <AnimatedSection className='container mx-auto px-4 py-16'>
      <motion.div variants={childVariants} className='mb-8 flex items-center gap-2'>
        <Briefcase className='h-6 w-6' />
        <h2 className='text-2xl font-bold'>My Experience</h2>
      </motion.div>
      <motion.p variants={childVariants} className='mb-12 text-muted-foreground'>
        Navigating diverse environments with adaptability and expertise for holistic solutions.
      </motion.p>
      <div className='space-y-6'>
        {experience.map((job, index) => (
          <motion.div key={index} variants={childVariants}>
            <Card className='rounded-xl border bg-card p-6'>
              <div className='flex flex-wrap items-start justify-between gap-4'>
                <div className='flex items-center gap-4'>
                  {job.image.dark ? (
                    <>
                      <Image
                        src={job.image.dark}
                        alt={job.company}
                        width={40}
                        height={40}
                        className='hidden dark:block'
                      />
                      <Image
                        src={job.image.light}
                        alt={job.company}
                        width={40}
                        height={40}
                        className='block dark:hidden'
                      />
                    </>
                  ) : (
                    <Image src={job.image.light} alt={job.company} width={40} height={40} />
                  )}
                  <div>
                    <h3 className='font-semibold'>{job.company}</h3>
                    <p className='text-sm text-muted-foreground'>{job.type}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='font-medium'>{job.period}</div>
                  <a href='#' className='text-sm text-muted-foreground hover:text-foreground'>
                    {job.website}
                  </a>
                </div>
              </div>
              <div className='mt-4'>
                <div className='font-medium'>{job.role}</div>
                <p className='mt-2 text-sm text-muted-foreground'>{job.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
