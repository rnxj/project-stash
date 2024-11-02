'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { childVariants } from '../../data/animations';
import { AnimatedSection } from '../animated-section';

interface CertificationsProps {
  certifications: Array<{
    name: string;
    provider: string;
    date: string;
    image: string;
    skills: string[];
  }>;
}

export function CertificationsSection({ certifications }: CertificationsProps) {
  return (
    <AnimatedSection className='container mx-auto px-4 py-16'>
      <motion.div variants={childVariants} className='mb-8 flex items-center gap-2'>
        <GraduationCap className='h-6 w-6' />
        <h2 className='text-2xl font-bold'>Certifications</h2>
      </motion.div>
      <motion.p variants={childVariants} className='mb-12 text-muted-foreground'>
        Continuous learning and skill development through recognized certifications.
      </motion.p>
      <div className='grid gap-6 sm:grid-cols-2'>
        {certifications.map((cert, index) => (
          <motion.div key={index} variants={childVariants}>
            <Card className='h-full transition-colors duration-200 hover:bg-muted'>
              <CardHeader className='flex flex-row items-start justify-between'>
                <div className='flex items-start gap-4'>
                  <Image
                    src={cert.image}
                    alt={cert.provider}
                    width={48}
                    height={48}
                    className='rounded-full'
                  />
                  <div>
                    <CardTitle className='text-lg'>{cert.name}</CardTitle>
                    <CardDescription>{cert.provider}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='mb-4 text-sm text-muted-foreground'>Issued: {cert.date}</p>
                <div className='flex flex-wrap gap-2'>
                  {cert.skills.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className='rounded-full bg-primary/10 px-2 py-1 text-xs text-primary'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
