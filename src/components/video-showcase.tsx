/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // For demo purposes, we'll simulate video controls
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section id="video" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-bl from-secondary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-primary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">SonicSoul in Action</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Watch how {`SonicSoul's`} frequency-optimized audio transforms lives and enhances wellbeing.
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Main Featured Video */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-8 group">
            {/* Video Thumbnail/Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="SonicSoul Experience"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center transition-transform transform hover:scale-110"
                  >
                    <Play size={36} className="ml-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-0"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={handlePlayPause} className="text-white hover:text-primary transition-colors">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>

                  <div className="text-white text-sm">1:23 / 4:56</div>

                  <button onClick={handleMute} className="text-white hover:text-primary transition-colors ml-2">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>

                <button className="text-white hover:text-primary transition-colors">
                  <Maximize2 size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "28%" }}></div>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2 text-primary">The SonicSoul Experience</h3>
            <p className="text-muted-foreground">
              Experience the transformative power of frequency-optimized audio in this demonstration video. See how
              SonicSoul helps users achieve deeper states of focus, relaxation, and spiritual connection.
            </p>
          </div>

          {/* Video Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Video Thumbnail 1 */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group cursor-pointer">
              <img
                src="/placeholder.svg?height=360&width=640"
                alt="User Testimonial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={36} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-medium">User Testimonial</h4>
                <p className="text-white/80 text-sm">2:45</p>
              </div>
            </div>

            {/* Video Thumbnail 2 */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group cursor-pointer">
              <img
                src="/placeholder.svg?height=360&width=640"
                alt="Behind the Science"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={36} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-medium">Behind the Science</h4>
                <p className="text-white/80 text-sm">3:18</p>
              </div>
            </div>

            {/* Video Thumbnail 3 */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group cursor-pointer">
              <img
                src="/placeholder.svg?height=360&width=640"
                alt="Guided Session"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={36} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white font-medium">Guided Session</h4>
                <p className="text-white/80 text-sm">5:42</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg">
              View More Videos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
