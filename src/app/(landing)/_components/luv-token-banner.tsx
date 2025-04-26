"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CoinsIcon as CoinIcon } from "lucide-react"
import Link from "next/link"

export function LuvTokenBanner() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative py-12 overflow-hidden bg-secondary/5 backdrop-blur-sm ">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[30vw] max-w-[900px] max-h-[300px] rounded-full bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent blur-3xl opacity-60 dark:opacity-20"></div>
      </div>

      <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent"></div>

      <div className="mx-auto px-4 relative z-10 py-20">
        <motion.div
          className="max-w-6xl mx-auto text-center rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Token icon with animation */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl opacity-30 rounded-full"></div>
              <div className="relative bg-gradient-to-r p-3 rounded-full from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/10">
                <CoinIcon size={32} className="text-primary relative z-10" />
              </div>
              <div
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0"
                style={{
                  animation: "pulse 4s ease-in-out infinite",
                }}
              ></div>
            </div>
          </motion.div>

          {/* Announcement headline */}
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-primary via-[#5CB8FF] to-secondary text-transparent bg-clip-text">
              $LUV is now live on the XRP Ledger
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto mb-6 text-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            SonicSoal&apos;s utility token has officially launched on the XRPL mainnet, unlocking a decentralized future of
            healing, ritual access, and rewards.
          </motion.p>

          {/* CTA button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="relative h-12 px-8 overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary font-medium shadow-xl hover:shadow-[0_8px_25px_-5px_rgba(20,217,196,0.3)] transition-all duration-300 border-0 group"
              asChild
            >
              <Link href="#" passHref>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                <span className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center z-10">
                  View on XRPL Explorer
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default LuvTokenBanner
