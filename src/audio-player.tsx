"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const audioTracks = [
  {
    id: 1,
    title: "Script Your Reality",
    description: "8-12 Hz | Enhance concentration",
    duration: 164,
    url: "/audio/script-your-reality.mp3",
  },
  {
    id: 2,
    title: "That Vibe Soundroll",
    description: "4-8 Hz | Inner peace",
    duration: 144,
    url: "/audio/that-vibe-soundroll-main-version-1677-02-24.mp3",
  },
  {
    id: 3,
    title: "The Cleaner Night Drift",
    description: "0.5-4 Hz | Restorative sleep",
    duration: 121,
    url: "/audio/the-cleaner-night-drift-main-version-20732-02-01.mp3",
  },
  {
    id: 4,
    title: "Vivre Prigida",
    description: "30-100 Hz | Creative inspiration",
    duration: 133,
    url: "/audio/vivre-prigida-main-version-02-13-19119.mp3",
  },
  {
    id: 5,
    title: "Win Jeff Kaale",
    description: "7.83 Hz | Schumann resonance",
    duration: 180,
    url: "/audio/win-jeff-kaale-main-version-27222-03-00.mp3",
  },
  {
    id: 6,
    title: "Zen Garden Danijel Zambo",
    description: "13-30 Hz | Mental alertness",
    duration: 120,
    url: "/audio/zen-garden-danijel-zambo-main-version-1397-02-00.mp3",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.03 },
  },
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 30, duration: 0.2 },
  },
}

const buttonVariants = {
  initial: { scale: 1 },
  tap: { scale: 0.97 },
  hover: { scale: 1.03 },
}

export function AudioPlayer() {
  const [isClient, setIsClient] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const [loaderKey, setLoaderKey] = useState(0)
  const [audioData, setAudioData] = useState<number[]>([])
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const waveformRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  // Set client flag and initial duration whenever track changes
  useEffect(() => {
    setIsClient(true)
    setDuration(audioTracks[currentTrack].duration)

    // Generate random audio data for visualization
    generateAudioData()
  }, [currentTrack])

  // Generate audio data for visualization
  const generateAudioData = () => {
    const sampleCount = 100
    const data = []

    // Create a more realistic audio waveform pattern
    for (let i = 0; i < sampleCount; i++) {
      // Base pattern with some randomness
      const baseValue = Math.sin(i * 0.2) * 0.5 + 0.5
      const randomFactor = Math.random() * 0.3
      data.push(baseValue + randomFactor)
    }

    setAudioData(data)
  }

  // Draw waveform on canvas
  useEffect(() => {
    if (!isClient || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    const drawWaveform = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      const barWidth = rect.width / audioData.length
      const barGap = 2
      const barWidthWithGap = barWidth - barGap

      // Draw each bar
      audioData.forEach((value, i) => {
        const percent = i / audioData.length
        const isActive = percent < currentTime / duration

        // Dynamic height based on audio playback
        let height = value * (rect.height * 0.8)

        // Add some animation when playing
        if (isPlaying) {
          const time = Date.now() / 1000
          const oscillation = Math.sin(time * 3 + i * 0.2) * 0.1
          height = Math.max(2, height * (1 + oscillation))
        }

        // Position each bar
        const x = i * barWidth
        const y = (rect.height - height) / 2

        // Create gradient for active/inactive parts
        let gradient
        if (isActive) {
          gradient = ctx.createLinearGradient(0, y, 0, y + height)
          gradient.addColorStop(0, "rgba(20, 217, 196, 0.8)")
          gradient.addColorStop(1, "rgba(20, 217, 196, 0.4)")
        } else {
          gradient = ctx.createLinearGradient(0, y, 0, y + height)
          gradient.addColorStop(0, "rgba(150, 150, 150, 0.3)")
          gradient.addColorStop(1, "rgba(150, 150, 150, 0.1)")
        }

        ctx.fillStyle = gradient

        // Draw rounded bars
        const radius = barWidthWithGap / 2
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + barWidthWithGap - radius, y)
        ctx.quadraticCurveTo(x + barWidthWithGap, y, x + barWidthWithGap, y + radius)
        ctx.lineTo(x + barWidthWithGap, y + height - radius)
        ctx.quadraticCurveTo(x + barWidthWithGap, y + height, x + barWidthWithGap - radius, y + height)
        ctx.lineTo(x + radius, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
        ctx.closePath()
        ctx.fill()
      })

      // Draw playhead
      const playheadX = (currentTime / duration) * rect.width
      ctx.beginPath()
      ctx.moveTo(playheadX, 0)
      ctx.lineTo(playheadX, rect.height)
      ctx.strokeStyle = "rgba(20, 217, 196, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Continue animation
      animationRef.current = requestAnimationFrame(drawWaveform)
    }

    // Start animation
    drawWaveform()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient, audioData, currentTime, duration, isPlaying])

  // Listen to audio events and update currentTime/duration and buffering state
  useEffect(() => {
    if (!isClient) return
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      if (audio.duration) setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }
    const setAudioTime = () => setCurrentTime(audio.currentTime)

    // Buffering events handlers
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlayThrough = () => setIsLoading(false)
    const handleWaiting = () => setIsLoading(true)
    const handlePlaying = () => setIsLoading(false)

    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplaythrough", handleCanPlayThrough)
    audio.addEventListener("waiting", handleWaiting)
    audio.addEventListener("playing", handlePlaying)

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplaythrough", handleCanPlayThrough)
      audio.removeEventListener("waiting", handleWaiting)
      audio.removeEventListener("playing", handlePlaying)
    }
  }, [isClient])

  // Update the audio element's volume when volume changes
  useEffect(() => {
    if (!isClient || !audioRef.current) return
    audioRef.current.volume = volume
  }, [volume, isClient])

  // If buffering is active, update loaderKey every 1.5 seconds (animation duration + delay)
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoaderKey((prev) => prev + 1)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  const handlePlayPause = () => {
    if (!isClient || !audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((e) => console.log("Playback prevented. Interaction required first:", e))
    }
    setIsPlaying(!isPlaying)
  }

  const handleTrackChange = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(false)
    setCurrentTime(0)
    if (!isClient) return
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((e) => console.log("Playback prevented. Interaction required first:", e))
        setIsPlaying(true)
      }
    }, 100)
  }

  const handleNext = () => {
    handleTrackChange((currentTrack + 1) % audioTracks.length)
  }

  const handlePrev = () => {
    handleTrackChange((currentTrack - 1 + audioTracks.length) % audioTracks.length)
  }

  const handleTimeChange = (value: number[]) => {
    if (!isClient || !audioRef.current) return
    audioRef.current.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Clicking on the waveform visualization will seek to a corresponding position
  const handleWaveformClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current || !audioRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = clickX / rect.width
    const newTime = percent * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Toggle mute/unmute
  const toggleMute = () => {
    if (!isClient || !audioRef.current) return
    const newMuted = !muted
    setMuted(newMuted)
    audioRef.current.muted = newMuted
  }

  // Memoized track list to avoid unnecessary re-renders
  const trackList = useMemo(() => {
    return audioTracks.map((track, index) => (
      <motion.div
        key={track.id}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: index * 0.03,
          ease: "easeOut",
        }}
        onClick={() => handleTrackChange(index)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "p-4 rounded-lg cursor-pointer transition-all backdrop-blur-sm",
          currentTrack === index
            ? "bg-gradient-to-br from-primary/10 via-card/80 to-background border border-primary/20 shadow-sm"
            : "bg-card/50 border border-border hover:border-primary/30 dark:bg-card/20",
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              currentTrack === index
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground",
            )}
          >
            {currentTrack === index && isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={cn("font-medium truncate", currentTrack === index ? "text-primary" : "text-foreground")}>
              {track.title}
            </h4>
            <p className="text-sm text-muted-foreground truncate">{track.description}</p>
          </div>
          <div className="text-xs text-muted-foreground shrink-0">{formatTime(track.duration)}</div>
        </div>
      </motion.div>
    ))
  }, [currentTrack, isPlaying])

  if (!isClient) {
    return (
      <section id="samples" className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-foreground">
            Experience SonicSoal Sessions
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Listen to sample sessions and discover how our frequency-optimized audio can transform your state of mind.
          </p>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 max-w-4xl mx-auto shadow-lg h-[300px]"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {audioTracks.map((_, index) => (
              <div key={index} className="p-4 rounded-lg bg-card/50 border border-border h-[72px]"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="samples" className="py-20 px-4 relative">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioTracks[currentTrack].url} onEnded={handleNext} hidden />

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/5 to-background z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-primary/5 to-transparent opacity-60 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-secondary/5 to-transparent opacity-60 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-2 text-center text-foreground"
        >
          Experience SonicSoal Sessions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Listen to sample sessions and discover how our frequency-optimized audio can transform your state of mind and
          connect you to deeper levels of consciousness.
        </motion.p>

        {/* Player Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 max-w-4xl mx-auto shadow-md relative dark:bg-card/30"
        >
          {/* Current Track Info */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6 text-center">
            <AnimatePresence mode="wait">
              <motion.h3
                key={`title-${currentTrack}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xl sm:text-2xl font-bold text-foreground mb-1"
              >
                {audioTracks[currentTrack].title}
              </motion.h3>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentTrack}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm sm:text-base text-muted-foreground"
              >
                {audioTracks[currentTrack].description}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Modern Waveform Visualization with Canvas */}
          <motion.div
            variants={itemVariants}
            className="mb-2 h-16 sm:h-20 rounded-lg overflow-hidden relative w-full cursor-pointer"
          >
            <canvas
              ref={canvasRef}
              onClick={handleWaveformClick}
              className="w-full h-full"
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          {/* Horizontal Loader Bar (Absolute at Bottom) */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key={loaderKey}
                className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full"
                initial={{ width: 0, opacity: 1 }}
                animate={{ width: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleTimeChange}
              className="cursor-pointer"
            />
          </motion.div>

          {/* Player Controls */}
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-4 sm:mb-6 gap-4 sm:gap-8">
            {/* Volume Control with Mute/Unmute */}
            <div className="relative">
              <motion.div
                className="flex items-center gap-2"
                onMouseEnter={() => !isMobile && setShowVolumeSlider(true)}
                onMouseLeave={() => !isMobile && setShowVolumeSlider(false)}
              >
                <motion.button
                  onClick={isMobile ? () => setShowVolumeSlider(!showVolumeSlider) : toggleMute}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX size={isMobile ? 16 : 18} /> : <Volume2 size={isMobile ? 16 : 18} />}
                </motion.button>

                {/* Desktop always shows volume, mobile shows conditionally */}
                <AnimatePresence>
                  {(!isMobile || showVolumeSlider) && (
                    <motion.div
                      className={cn(
                        "flex items-center gap-2",
                        isMobile
                          ? "absolute left-0 bottom-10 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border z-10"
                          : "",
                      )}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Slider
                        value={[volume * 100]}
                        max={100}
                        step={1}
                        onValueChange={(value) => {
                          setVolume(value[0] / 100)
                          if (audioRef.current) {
                            audioRef.current.muted = false
                            setMuted(false)
                          }
                        }}
                        className="w-24 cursor-pointer"
                        aria-label="Volume"
                      />
                      <motion.span className="text-xs text-muted-foreground ml-1 select-none">
                        {Math.round(volume * 100)}%
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Main Controls */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handlePrev}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={isMobile ? 20 : 24} />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handlePlayPause}
              className="bg-primary text-primary-foreground w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={isMobile ? 16 : 20} /> : <Play size={isMobile ? 16 : 20} className="ml-1" />}
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleNext}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={isMobile ? 20 : 24} />
            </motion.button>

            {/* Track info icon */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }} 
              className="text-muted-foreground"
            >
              <Music2 size={isMobile ? 16 : 18} />
            </motion.div>
          </motion.div>

        {/* Track List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 sm:mt-12">{trackList}</div>
      </motion.div>
    </section>
  )
}
