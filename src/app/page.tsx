import { AudioPlayer } from "@/components/audio-player"
import { CTA } from "@/components/cta"
import { EarnVibba } from "@/components/earn-vibba"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { VideoShowcase } from "@/components/video-showcase"

export default function Home() {
  return (
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
          <AudioPlayer />
          <VideoShowcase />
          <HowItWorks />
          <EarnVibba />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
