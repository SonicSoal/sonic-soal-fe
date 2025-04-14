import { AudioWaveformIcon as WaveformIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Animated gradient circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl opacity-60 dark:opacity-30"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl opacity-60 dark:opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-3xl opacity-60 dark:opacity-30 animate-pulse-slow animation-delay-1000"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30 rounded-full"></div>
            <WaveformIcon size={64} className="text-primary relative z-10" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] text-transparent bg-clip-text">
          SonicSoal:
          Frequency for Your Soul
        </h1>
        <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto mb-10">
          Experience the transformative power of frequency-optimized audio
          designed to harmonize your mind, body, and spirit through the science
          of sound.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group"
            asChild
          >
            <Link href="#samples">
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center">
                Try for Free
                <span className="ml-2 relative">
                  <span className="absolute -inset-1 rounded-full bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">→</span>
                </span>
              </span>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 relative overflow-hidden group"
            asChild
          >
            <Link href="#how-it-works">
              <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">Learn More</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
