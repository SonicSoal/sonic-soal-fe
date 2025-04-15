"use client"

import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AudioTrack } from "./types"

interface TrackListProps {
  tracks: AudioTrack[]
  currentTrack: number
  isPlaying: boolean
  onTrackSelect: (index: number) => void
}

export function TrackList({ tracks, currentTrack, isPlaying, onTrackSelect }: TrackListProps) {
  return (
    <>
      {tracks.map((track, index) => (
        <motion.div
          key={track.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.03,
            ease: "easeOut",
          }}
          onClick={() => onTrackSelect(index)}
          whileHover={{ scale: 1.01 }}
          className={cn(
            "p-4 rounded-lg cursor-pointer transition-all backdrop-blur-sm",
            currentTrack === index
              ? "bg-gradient-to-br from-primary/10 via-card/80 to-background border border-primary/20 shadow-sm"
              : "bg-card/50 border border-border hover:border-primary/30 dark:bg-card/20",
          )}
        >
          <div className="flex items-center gap-5">
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
              <div className="flex flex-wrap gap-1 mt-1">
                {track.category && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                    {track.category}
                  </span>
                )}
                {track.moodTags &&
                  track.moodTags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted/50 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  )
}
