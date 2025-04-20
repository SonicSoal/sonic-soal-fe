'use client';

import * as React from 'react';

import {
  MessageCircleIcon,
  SparklesIcon,
  AudioWaveformIcon,
  LayoutDashboardIcon,
  ClockIcon,
} from 'lucide-react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

// This is sample data.
const data = {
  user: {
    name: 'Pro Lab Software',
    email: 'contact@prosoftwarelab.com',
    avatar: 'https://avatars.githubusercontent.com/u/158130513?s=200&v=4',
  },
  navMain: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboardIcon className="h-4 w-4" />,
    },
    {
      title: 'My Sessions',
      href: '/dashboard/sessions',
      icon: <AudioWaveformIcon className="h-4 w-4" />,
    },
    {
      title: 'Session Feedback',
      href: '/dashboard/feedback',
      icon: <MessageCircleIcon className="h-4 w-4" />,
    },
    {
      title: 'Recently Played',
      href: '/dashboard/history',
      icon: <ClockIcon className="h-4 w-4" />,
    },
    {
      title: 'Coming Soon',
      href: '/dashboard/coming-soon',
      icon: <SparklesIcon className="h-4 w-4" />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={cn('flex items-center gap-2', {
            'justify-center': !open,
          })}
        >
          <AudioWaveformIcon className="h-6 w-6 text-primary" />
          {open && (
            <span className="font-semibold bg-gradient-to-r from-primary to-secondary text-2xl text-transparent bg-clip-text">
              SonicSoal
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
