"use client"

import { useEffect, useState } from "react"
import { AudioWaveformIcon as WaveformIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent blur-3xl opacity-60 dark:opacity-20"></div>
        <div
          className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/5 blur-3xl opacity-60 dark:opacity-20"
          style={{
            animation: "pulse 15s ease-in-out infinite",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-secondary/5 blur-3xl opacity-60 dark:opacity-20"
          style={{
            animation: "pulse 18s ease-in-out infinite",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      {/* Sound wave decorative elements */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      <div className="absolute left-0 right-0 top-[45%] -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent"></div>
      <div className="absolute left-0 right-0 top-[55%] -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo icon with enhanced animation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl opacity-30 rounded-full"></div>
              <div className="relative bg-gradient-to-r p-4 rounded-full from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/10">
                <WaveformIcon size={48} className="text-primary relative z-10" />
              </div>
              <div
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0"
                style={{
                  animation: "pulse 4s ease-in-out infinite",
                }}
              ></div>
            </div>
          </motion.div>

          {/* Headline with enhanced typography */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-[#14D9C4] via-[#5CB8FF] to-[#A46EFF] text-transparent bg-clip-text">
              Experience SonicSoal Sessions
            </span>
          </motion.h1>

          {/* Subheadline with improved styling */}
          <motion.p
            className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-6 text-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            Tap into immersive audio environments shaped to align your inner rhythm, soften mental noise, and guide you
            into elevated states of self-awareness.
          </motion.p>

          {/* Supporting copy with improved styling */}
          <motion.p
            className="text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-10 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            Crafted with techniques inspired by deep-brain integration and neural harmonics, each session helps reset
            your emotional landscape and unlock inner clarity.
          </motion.p>

          {/* CTA buttons with enhanced styling */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="relative h-14 px-8 overflow-hidden rounded-full bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] text-white font-medium shadow-xl hover:shadow-[0_8px_25px_-5px_rgba(20,217,196,0.3)] transition-all duration-300 border-0 group"
              asChild
            >
              <Link href="/sign-in" passHref>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                <span className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center z-10">
                  Try for Free
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 ease-out">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current"
                    >
                      <path d="M3.33334 8H12.6667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M8 3.33337L12.6667 8.00004L8 12.6667"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </Link>
            </Button>
            <Button
              size="lg"
              className="relative h-14 px-8 overflow-hidden rounded-full bg-transparent backdrop-blur-sm text-foreground font-medium border border-white/10 hover:border-white/20 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              asChild
            >
              <Link href="#how-it-works">
                <span className="absolute inset-0 bg-gradient-to-r from-[#14D9C4]/5 to-[#A46EFF]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
                <span className="relative flex items-center justify-center z-10">
                  <span className="bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                    Learn More
                  </span>
                  <span className="group-hover:opacity-0 transition-opacity duration-300">Learn More</span>
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
