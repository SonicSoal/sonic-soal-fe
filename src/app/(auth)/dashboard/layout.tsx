import type React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/app-sidebar';
import { PreloadAudio } from '@/components/audio-player/preload-audio';
import { SiteHeader } from './_components/site-header';
import audioTracks from "@/app/(landing)/data/audio-track-list";
import DashboardProvider from "./DashboardProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <DashboardProvider>
       <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden">
        <PreloadAudio tracks={audioTracks} />

        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <div className="fixed inset-0 z-0 opacity-60">
              <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-70 dark:opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-full h-[50vh] bg-gradient-to-tl from-primary/5 via-secondary/5 to-transparent opacity-70 dark:opacity-30 blur-3xl"></div>
              <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/4 left-1/4 w-[25vw] h-[25vw] rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
            </div>
            <div className="relative z-10 flex flex-col overflow-hidden">
              <SiteHeader />
              <div className="p-5">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
     </DashboardProvider>
  );
}
