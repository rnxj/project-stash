import { motion } from 'framer-motion';
import { ArrowUp, Code2 } from 'lucide-react';

export function LeftSidebar({ scrollToTop }: { scrollToTop: () => void }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      className='sticky top-0 hidden h-screen w-16 flex-col justify-between border-r bg-background/50 backdrop-blur-lg md:flex'
    >
      <div className='flex flex-col items-center pt-4'>
        <Code2 className='m-2 h-6 w-6' />
      </div>

      {/* <div className='flex flex-col items-center gap-4'>
        <button className='rounded-lg p-2 hover:bg-muted' aria-label='Services'>
          <Settings className='h-6 w-6' />
        </button>
        <button className='rounded-lg p-2 hover:bg-muted' aria-label='Contact'>
          <Mail className='h-6 w-6' />
        </button>
      </div> */}

      <div className='mt-auto flex flex-col items-center pb-4'>
        <button
          onClick={scrollToTop}
          className='rounded-lg p-2 transition-all hover:bg-muted'
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-6 w-6' />
        </button>
      </div>
    </motion.aside>
  );
}
