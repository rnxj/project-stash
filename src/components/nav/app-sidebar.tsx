'use client';

import { BoltIcon, PackageOpen, RocketIcon, TicketIcon, WalletIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

const navGroups = [
  {
    label: 'Web3',
    items: [
      // {
      //   type: 'collapsible' as const,
      //   data: {
      //     title: 'Wallet',
      //     url: '/wallet',
      //     icon: WalletIcon,
      //     isActive: true,
      //     items: [
      //       {
      //         title: 'Create',
      //         url: '/wallet/create',
      //       },
      //       {
      //         title: 'Import',
      //         url: '/wallet/import',
      //       },
      //     ],
      //   },
      // },
      {
        type: 'normal' as const,
        data: {
          title: 'Wallet',
          url: '/wallet',
          icon: WalletIcon,
        },
      },
      {
        type: 'normal' as const,
        data: {
          title: 'Wallet Adapter UI',
          url: '/wallet-adapter',
          icon: BoltIcon,
        },
      },
      {
        type: 'normal' as const,
        data: {
          title: 'Token Launchpad',
          url: '/token-launchpad',
          icon: RocketIcon,
        },
      },
    ],
  },
  {
    label: 'Web Dev',
    items: [
      {
        type: 'link' as const,
        data: {
          title: 'ICVIT Landing Page',
          url: 'https://icvit.vercel.app',
          icon: TicketIcon,
        },
      },
      {
        type: 'link' as const,
        data: {
          title: 'Warewise',
          url: 'https://warewise.rnxj.dev',
          icon: PackageOpen,
        },
      },
    ],
  },
  // {
  //   label: 'DevOps',
  //   items: [],
  // },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='/'>
                <div className='flex aspect-square size-8 items-center justify-center'>
                  <Image src='/logo.svg' alt='Logo' width={40} height={40} />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>Project Stash</span>
                  <span className='truncate text-xs'>by Reuel Nixon</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={navGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
