"use client"

import { useEffect } from "react"
import { AudioTrack } from "./types"

type PreloadAudioProps = {
  tracks: AudioTrack[]
}

export function PreloadAudio({ tracks }: PreloadAudioProps) {
  useEffect(() => {
    tracks.forEach((track) => {
      const audio = new Audio()
      audio.src = track.url
      audio.preload = "auto"
    })
  }, [tracks])

  return null
}
