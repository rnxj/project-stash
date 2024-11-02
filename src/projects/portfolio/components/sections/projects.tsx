'use client';

import { motion } from 'framer-motion';
import { FolderGit2, Link2 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { childVariants } from '../../data/animations';
import { AnimatedSection } from '../animated-section';

interface ProjectsProps {
  projects: Array<{
    title: string;
    type: string;
    pages: string;
    theme: string;
    description: string;
    link: string;
    image: string;
  }>;
}

export function ProjectsSection({ projects }: ProjectsProps) {
  return (
    <AnimatedSection className='container mx-auto px-4 py-16'>
      <motion.div variants={childVariants} className='mb-8 flex items-center gap-2'>
        <FolderGit2 className='h-6 w-6' />
        <h2 className='text-2xl font-bold'>My Projects</h2>
      </motion.div>
      <motion.p variants={childVariants} className='mb-12 text-muted-foreground'>
        Explore a collection of my most innovative and impactful personal projects.
      </motion.p>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project, index) => (
          <motion.div key={index} variants={childVariants}>
            <Card className='group overflow-hidden'>
              <CardHeader className='p-0'>
                <div className='aspect-video overflow-hidden'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={225}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </CardHeader>
              <CardContent className='p-6'>
                <CardTitle className='mb-2 text-xl'>{project.title}</CardTitle>
                <div className='mb-4 flex flex-wrap gap-2'>
                  <span className='text-xs text-muted-foreground'>{project.type}</span>
                  <span className='text-muted-foreground'>•</span>
                  <span className='text-xs text-muted-foreground'>{project.pages}</span>
                  <span className='text-muted-foreground'>•</span>
                  <span className='text-xs text-muted-foreground'>{project.theme}</span>
                </div>
                <p className='mb-4 text-sm text-muted-foreground'>{project.description}</p>
                <Button variant='outline' size='sm' className='w-full gap-2'>
                  <Link2 className='h-4 w-4' />
                  {project.link}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
