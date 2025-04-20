"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Repeat1, Shuffle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { AudioTrack } from "./types"
import { TrackList } from "./track-list"

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


// Add a new type for repeat mode
type RepeatMode = "off" | "one" | "all"

interface AudioPlayerProps {
  tracks: AudioTrack[]
  initialTrack?: number
  showTrackList?: boolean
  className?: string
  onTrackChange?: (track: AudioTrack, index: number) => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  ref? : React.Ref<HTMLAudioElement>
}

export function AudioPlayer({
  tracks,
  initialTrack = 0,
  showTrackList = true,
  className,
  onTrackChange,
  onPlay,
  onEnded,
  onPause,
}: AudioPlayerProps) {
  const [isClient, setIsClient] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(initialTrack)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const [loaderKey, setLoaderKey] = useState(0)
  const [audioData, setAudioData] = useState<number[]>([])
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showMetadata, setShowMetadata] = useState(false)
  // Add repeatMode to the component state
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off")
  // Add shuffle state
  const [shuffle, setShuffle] = useState(false)
  // Track history for shuffle mode
  const [trackHistory, setTrackHistory] = useState<number[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const isMobile = useMediaQuery("(max-width: 640px)")

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  // Set client flag and initial duration whenever track changes
  useEffect(() => {
    setIsClient(true)
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
          gradient.addColorStop(0, "rgba(131, 38, 255, 0.8)")
          gradient.addColorStop(1, "rgba(23, 177, 204, 0.9)")
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
      ctx.strokeStyle = "rgba(23, 177, 204, 0.4)"
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
      onPause?.()
    } else {
      audioRef.current.play().catch((e) => console.log("Playback prevented. Interaction required first:", e))
      onPlay?.()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTrackChange = useCallback(
    (index: number) => {
      // Update track history for shuffle navigation
      if (index !== currentTrack) {
        const newHistory = trackHistory.slice(0, historyIndex + 1)
        newHistory.push(currentTrack)
        setTrackHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
      }

      setCurrentTrack(index)
      setIsPlaying(false)
      setCurrentTime(0)

      onTrackChange?.(tracks[index], index)

      if (!isClient) return
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch((e) => console.log("Playback prevented. Interaction required first:", e))
          setIsPlaying(true)
          onPlay?.()
        }
      }, 100)
    },
    [isClient, onTrackChange, onPlay, tracks, currentTrack, trackHistory, historyIndex],
  )

  // Get a random track index that's not the current one
  const getRandomTrackIndex = () => {
    if (tracks.length <= 1) return 0

    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * tracks.length)
    } while (randomIndex === currentTrack)

    return randomIndex
  }

  const handleNext = () => {
    if (shuffle) {
      // In shuffle mode, pick a random track
      handleTrackChange(getRandomTrackIndex())
    } else {
      // Normal mode - go to next track with looping
      handleTrackChange((currentTrack + 1) % tracks.length)
    }
  }

  const handlePrev = () => {
    // If we have history and not at the beginning, go back in history
    if (trackHistory.length > 0 && historyIndex > 0) {
      const prevIndex = trackHistory[historyIndex - 1]
      setHistoryIndex(historyIndex - 1)
      handleTrackChange(prevIndex)
    } else {
      // Otherwise use the standard behavior
      if (shuffle) {
        handleTrackChange(getRandomTrackIndex())
      } else {
        handleTrackChange((currentTrack - 1 + tracks.length) % tracks.length)
      }
    }
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

  // Toggle repeat mode
  const toggleRepeatMode = () => {
    setRepeatMode((current) => {
      if (current === "off") return "all"
      if (current === "all") return "one"
      return "off"
    })
  }

  // Toggle shuffle mode
  const toggleShuffle = () => {
    setShuffle(!shuffle)
    // Reset history when toggling shuffle
    if (!shuffle) {
      setTrackHistory([currentTrack])
      setHistoryIndex(0)
    }
  }

  if (!isClient) {
    return (
      <div className={cn("relative", className)}>
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 max-w-4xl mx-auto shadow-lg h-[300px]"></div>
        {showTrackList && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {tracks.map((_, index) => (
              <div key={index} className="p-4 rounded-lg bg-card/50 border border-border h-[72px]"></div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        onEnded={() => {

          onEnded?.();
          if (repeatMode === "one") {
            // Repeat the current track
            if (audioRef.current) {
              audioRef.current.currentTime = 0
              audioRef.current.play().catch((e) => console.log("Playback prevented:", e))
            }
          } else if (repeatMode === "all") {
            // Go to next track (with looping)
            handleNext()
          } else {
            // Default behavior - stop playing if it's the last track
            if (currentTrack === tracks.length - 1) {
              setIsPlaying(false)
            } else {
              handleNext()
            }
          }
        }}
        onLoadedMetadata={(e) => {
          if (e.currentTarget.duration) {
            setDuration(e.currentTarget.duration)
          }
        }}
        hidden
      />

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
              className="text-xl sm:text-2xl font-bold text-foreground mb-1 text-primary"
            >
             
              {tracks[currentTrack].title}
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
              {tracks[currentTrack].description}
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

        {/* Player Controls - Professional layout */}
        <div className="relative">
          {/* Playback mode controls (top row) */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 mb-4">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={toggleShuffle}
              className={cn("text-muted-foreground hover:text-primary transition-colors", shuffle && "text-primary")}
              aria-label={shuffle ? "Shuffle on" : "Shuffle off"}
              title={shuffle ? "Shuffle on" : "Shuffle off"}
            >
              <Shuffle size={18} />
            </motion.button>

            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={toggleRepeatMode}
              className={cn(
                "text-muted-foreground hover:text-primary transition-colors",
                repeatMode !== "off" && "text-primary",
              )}
              aria-label={`Repeat mode: ${repeatMode}`}
              title={repeatMode === "off" ? "Repeat off" : repeatMode === "all" ? "Repeat all" : "Repeat one"}
            >
              {repeatMode === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />}
            </motion.button>
          </motion.div>

          {/* Main playback controls (middle row) */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 sm:gap-12 mb-4">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handlePrev}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={isMobile ? 24 : 28} />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handlePlayPause}
              className="bg-primary text-primary-foreground w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors shadow-sm"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={isMobile ? 20 : 24} /> : <Play size={isMobile ? 20 : 24} className="ml-1" />}
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleNext}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={isMobile ? 24 : 28} />
            </motion.button>
          </motion.div>

          {/* Volume and info controls (bottom row) */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            {/* Volume Control on the left */}
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

            {/* Track info icon on the right */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setShowMetadata(!showMetadata)}
              aria-label={showMetadata ? "Hide track info" : "Show track info"}
              title="Track information"
            >
              <Info size={isMobile ? 16 : 18} />
            </motion.button>
          </motion.div>
        </div>

        {/* Metadata Section */}
        <AnimatePresence>
          {showMetadata && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Title:</p>
                  <p className="font-medium">{tracks[currentTrack].title}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Artist:</p>
                  <p className="font-medium">{tracks[currentTrack].artist}</p>
                </div>
                {tracks[currentTrack].album && (
                  <div>
                    <p className="text-muted-foreground">Album:</p>
                    <p className="font-medium">{tracks[currentTrack].album}</p>
                  </div>
                )}
                {tracks[currentTrack].genre && (
                  <div>
                    <p className="text-muted-foreground">Genre:</p>
                    <p className="font-medium">{tracks[currentTrack].genre}</p>
                  </div>
                )}
                {tracks[currentTrack].comments && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Comments:</p>
                    <p className="font-medium">{tracks[currentTrack].comments}</p>
                  </div>
                )}
                {tracks[currentTrack].moodTags && tracks[currentTrack].moodTags.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Mood Tags:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tracks[currentTrack].moodTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Track List */}
      {showTrackList && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <TrackList
            tracks={tracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackChange}
          />
        </div>
      )}
    </div>
  )
}
