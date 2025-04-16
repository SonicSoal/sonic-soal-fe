import { CTA } from '@/app/(landing)/_components/cta';
import { EarnSoal } from '@/app/(landing)/_components/earn-soal';
import FaqAccordion from '@/app/(landing)/_components/faq-section';
import { Footer } from '@/app/(landing)/_components/footer';
import { Header } from '@/app/(landing)/_components/header';
import { Hero } from '@/app/(landing)/_components/hero';
import { HowItWorks } from '@/app/(landing)/_components/how-it-works';
import { VideoShowcase } from '@/app/(landing)/_components/video-showcase';
import MusicSession from './_components/music-session';
import { PreloadAudio } from '@/components/audio-player/preload-audio';
import audioTracks from './data/audio-track-list';

export default function Home() {
  return (
    <>
      <PreloadAudio tracks={audioTracks} />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-70 dark:opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-full h-[50vh] bg-gradient-to-tl from-primary/5 via-secondary/5 to-transparent opacity-70 dark:opacity-30 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[25vw] h-[25vw] rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <MusicSession />
            <VideoShowcase />
            <HowItWorks />
            <EarnSoal />
            <CTA />
            <FaqAccordion />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
