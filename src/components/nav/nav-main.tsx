'use client';

import { ChevronRight } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type NormalMenuData = {
  type: 'normal';
  data: {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
  };
};

type CollapsibleMenuData = {
  type: 'collapsible';
  data: {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
    isActive?: boolean;
    items: {
      title: string;
      url: string;
    }[];
  };
};

type NavMainItem = NormalMenuData | CollapsibleMenuData;

type NavGroup = {
  label: string;
  items: NavMainItem[];
};

export function NavMain({ groups }: { groups: NavGroup[] }) {
  return (
    <>
      {groups.map((group, groupIndex) => (
        <SidebarGroup key={groupIndex}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((menuItem, itemIndex) => {
              if (menuItem.type === 'normal') {
                const item = menuItem.data;
                return (
                  <SidebarMenuItem key={`${groupIndex}-${itemIndex}`}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        {item.icon ? <item.icon /> : null}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              } else if (menuItem.type === 'collapsible') {
                const item = menuItem.data;
                return (
                  <Collapsible
                    key={`${groupIndex}-${itemIndex}`}
                    asChild
                    defaultOpen={item.isActive}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.items?.length ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className='data-[state=open]:rotate-90'>
                              <ChevronRight />
                              <span className='sr-only'>Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem, subIndex) => (
                                <SidebarMenuSubItem key={`${groupIndex}-${itemIndex}-${subIndex}`}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
              return null;
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
