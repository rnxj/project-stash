'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import Image from 'next/image';

import { childVariants } from '../../data/animations';
import { AnimatedSection } from '../animated-section';

interface ToolsProps {
  tools: Array<{
    name: string;
    type: string;
    link: string;
    image: {
      light: string;
      dark?: string;
    };
  }>;
}

export function ToolsSection({ tools }: ToolsProps) {
  return (
    <AnimatedSection className='container mx-auto px-4 py-16'>
      <motion.div variants={childVariants} className='mb-8 flex items-center gap-2'>
        <Code className='h-6 w-6' />
        <h2 className='text-2xl font-bold'>My Stacks</h2>
      </motion.div>
      <motion.p variants={childVariants} className='mb-12 text-muted-foreground'>
        Commitment to staying updated with the latest design trends and techniques.
      </motion.p>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {tools.map((tool, index) => (
          <motion.div key={index} variants={childVariants}>
            <motion.a
              href={tool.link}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-between rounded-xl border bg-card p-4 transition-colors duration-200 hover:bg-muted'
            >
              <div className='flex items-center gap-4'>
                {tool.image.dark ? (
                  <>
                    <Image
                      src={tool.image.dark}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className='hidden dark:block'
                    />
                    <Image
                      src={tool.image.light}
                      alt={tool.name}
                      width={40}
                      height={40}
                      className='block dark:hidden'
                    />
                  </>
                ) : (
                  <Image src={tool.image.light} alt={tool.name} width={40} height={40} />
                )}
                <div>
                  <h3 className='font-medium'>{tool.name}</h3>
                  <p className='text-sm text-muted-foreground'>{tool.type}</p>
                </div>
              </div>
              <ArrowRight className='h-5 w-5 transform transition-all duration-200 group-hover:-rotate-45 group-hover:scale-110' />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
