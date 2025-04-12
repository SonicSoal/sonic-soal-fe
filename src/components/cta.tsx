import { Button } from "@/components/ui/button"
import { AudioWaveformIcon as WaveformIcon } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background z-0"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-primary/20 relative overflow-hidden shadow-lg">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-primary/10 to-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30 rounded-full"></div>
                <WaveformIcon size={48} className="text-primary relative z-10" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Begin Your SonicSoul Journey</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Start your frequency alignment journey today and experience the difference in your focus, creativity,
              spiritual connection, and overall wellbeing.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 transition-all duration-300 text-base shadow-md hover:shadow-lg relative overflow-hidden group"
                asChild
              >
                <Link href="#">
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
                className="border-primary text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 text-base relative overflow-hidden group"
                asChild
              >
                <Link href="#">
                  <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative">Sign In</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
