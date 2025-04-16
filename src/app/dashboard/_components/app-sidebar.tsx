'use client';

import * as React from 'react';

import {
  LayoutDashboardIcon,
  LibraryIcon,
  CompassIcon,
  HeartIcon,
  ClockIcon,
  SettingsIcon,
  UserIcon,
  MusicIcon,
  AudioWaveformIcon,
  CalendarIcon,
  BarChart3Icon,
} from "lucide-react"


import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from "@/lib/utils";

// This is sample data.
const data = {
  user: {
    name: 'Pro Lab Software',
    email: 'contact@prosoftwarelab.com',
    avatar: 'https://avatars.githubusercontent.com/u/158130513?s=200&v=4',
  },
  navMain: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="h-4 w-4" />,
    },
    {
      title: "My Library",
      href: "/dashboard/library",
      icon: <LibraryIcon className="h-4 w-4" />,
    },
    {
      title: "Discover",
      href: "/dashboard/discover",
      icon: <CompassIcon className="h-4 w-4" />,
    },
    {
      title: "Favorites",
      href: "/dashboard/favorites",
      icon: <HeartIcon className="h-4 w-4" />,
    },
    {
      title: "History",
      href: "/dashboard/history",
      icon: <ClockIcon className="h-4 w-4" />,
    },
    {
      title: "Frequency Sessions",
      href: "/dashboard/sessions",
      icon: <AudioWaveformIcon className="h-4 w-4" />,
    },
    {
      title: "Playlists",
      href: "/dashboard/playlists",
      icon: <MusicIcon className="h-4 w-4" />,
    },
    {
      title: "Schedule",
      href: "/dashboard/schedule",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3Icon className="h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <UserIcon className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <SettingsIcon className="h-4 w-4" />,
    },
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={cn("flex items-center gap-2", {
          'justify-center': !open,
        })}>
          <AudioWaveformIcon className="h-6 w-6 text-primary" />
          {open && <span className="font-semibold bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] text-2xl text-transparent bg-clip-text">
            SonicSoal
          </span>}
          
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
