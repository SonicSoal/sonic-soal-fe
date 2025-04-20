"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AudioWaveformIcon } from "lucide-react"

interface SonicLoaderProps {
  isLoading?: boolean
  text?: string
  onLoadingComplete?: () => void
  loadingTime?: number
}

export function SonicLoader({
  isLoading = true,
  text = "Harmonizing frequencies...",
  onLoadingComplete,
  loadingTime = Number.POSITIVE_INFINITY, // Changed to Infinity so it stays visible until isLoading is false
}: SonicLoaderProps) {
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    setLoading(isLoading)

    // This will only run if loadingTime is not Infinity and isLoading is true
    if (isLoading && loadingTime !== Number.POSITIVE_INFINITY) {
      const timer = setTimeout(() => {
        setLoading(false)
        onLoadingComplete?.()
      }, loadingTime)

      return () => clearTimeout(timer)
    }
  }, [isLoading, loadingTime, onLoadingComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            filter: "blur(8px)",
            transition: {
              duration: 0.7,
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 z-0">
            {/* Animated gradient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl opacity-60 dark:opacity-30"></div>
            <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl opacity-60 dark:opacity-30 animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-secondary/20 blur-3xl opacity-60 dark:opacity-30 animate-pulse-slow animation-delay-1000"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Waveform icon with pulsing effect */}
            <div className="relative mb-8">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="relative">
                <AudioWaveformIcon size={64} className="text-primary" />
              </div>
            </div>

            {/* Audio wave animation */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
                  initial={{ height: 15 }}
                  animate={{
                    height: [15, 30, 15],
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      duration: 0.3,
                      delay: i * 0.05,
                    },
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Loading text */}
            <motion.p
              className="text-xl font-medium bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              exit={{
                opacity: 0,
                y: 10,
                transition: { duration: 0.5 },
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {text}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
