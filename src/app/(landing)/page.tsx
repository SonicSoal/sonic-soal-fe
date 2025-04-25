import { CTA } from '@/app/(landing)/_components/cta';
import { EarnSoal } from '@/app/(landing)/_components/earn-soal';
import FaqAccordion from '@/app/(landing)/_components/faq-section';
import { Hero } from '@/app/(landing)/_components/hero';
import { HowItWorks } from '@/app/(landing)/_components/how-it-works';
import { VideoShowcase } from '@/app/(landing)/_components/video-showcase';
import MusicSession from './_components/music-session';
import { PreloadAudio } from '@/components/audio-player/preload-audio';
import audioTracks from './data/audio-track-list';
import { RequestCustomTone } from "./_components/request-custom-tone";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <MusicSession />
        <RequestCustomTone/>
        <VideoShowcase />
        <HowItWorks />
        <EarnSoal />
        <CTA />
        <FaqAccordion />
      </main>
      <PreloadAudio tracks={audioTracks} />
    </>
  );
}
