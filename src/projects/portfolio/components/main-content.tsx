'use client';

import { certificationsData, experienceData, projectsData, toolsData } from '../data/data';
import { CertificationsSection } from './sections/certifications';
import { ExperienceSection } from './sections/experience';
import { Footer } from './sections/footer';
import { HeroSection } from './sections/hero';
import { ProjectsSection } from './sections/projects';
import { ToolsSection } from './sections/tools';

export function MainContent() {
  return (
    <div className='mx-auto min-h-screen max-w-4xl bg-background text-foreground'>
      <HeroSection />
      <ExperienceSection experience={experienceData} />
      <ToolsSection tools={toolsData} />
      <ProjectsSection projects={projectsData} />
      <CertificationsSection certifications={certificationsData} />
      <Footer />
    </div>
  );
}
