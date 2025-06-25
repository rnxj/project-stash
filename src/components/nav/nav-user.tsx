'use client';

import {
  GitHubLogoIcon,
  InfoCircledIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { FileCode2Icon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function NavUser() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <InfoCircledIcon />
              <span>About Me</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src='/avatar.png' alt='Reuel Nixon' />
                  <AvatarFallback className='rounded-lg'>RN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>Reuel Nixon</span>
                  <Link
                    href='mailto:reuelnixon@gmail.com'
                    className='truncate text-xs text-muted-foreground hover:underline'
                  >
                    reuelnixon@gmail.com
                  </Link>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href='https://www.linkedin.com/in/ReuelNixon/'
                  target='_blank'
                  rel='noreferrer'
                  className='flex w-full cursor-pointer items-center gap-2 text-left text-sm'
                >
                  <LinkedInLogoIcon />
                  LinkedIn
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href='https://github.com/rnxj'
                  target='_blank'
                  rel='noreferrer'
                  className='flex w-full cursor-pointer items-center gap-2 text-left text-sm'
                >
                  <GitHubLogoIcon />
                  GitHub
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href='https://www.instagram.com/_rnxj/'
                  target='_blank'
                  rel='noreferrer'
                  className='flex w-full cursor-pointer items-center gap-2 text-left text-sm'
                >
                  <InstagramLogoIcon />
                  Instagram
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href='https://x.com/_rnxj'
                  target='_blank'
                  rel='noreferrer'
                  className='flex w-full cursor-pointer items-center gap-2 text-left text-sm'
                >
                  <span className='mr-1'>𝕏</span>Twitter
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href='https://drive.google.com/file/d/1JMeD3WHdEohQawxGgGzNC0VBKDFopAEu/view'
                  target='_blank'
                  rel='noreferrer'
                  className='flex w-full cursor-pointer items-center gap-2 text-left text-sm'
                >
                  <FileCode2Icon className='h-4 w-4' />
                  Resume
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
