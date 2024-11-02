import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, ScrollText, Twitter } from 'lucide-react';

export function RightSidebar() {
  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/_rnxj',
      label: 'Instagram Profile',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/reuelnixon',
      label: 'LinkedIn Profile',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/_rnxj',
      label: 'Twitter Profile',
    },
    {
      icon: Github,
      href: 'https://github.com/rnxj',
      label: 'GitHub Profile',
    },
    {
      icon: ScrollText,
      href: '/resume.pdf',
      label: 'Download Resume',
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 hidden h-screen w-16 flex-col items-center justify-center gap-6 border-l bg-background/50 backdrop-blur-lg md:flex'
    >
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={href}
          href={href}
          className='rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
          aria-label={label}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Icon className='h-6 w-6' />
        </a>
      ))}
    </motion.aside>
  );
}
