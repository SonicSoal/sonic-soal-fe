'use client';

import { AudioPlayer } from '@/components/audio-player/audio-player';
import { motion } from 'framer-motion';
import audioTracks from '../data/audio-track-list';

export default function MusicSession() {
  return (
    <section id="samples" className="py-20 px-4 relative">
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
          Experience TPO-Enhanced <span className="text-secondary">SonicSoal</span> Sessions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Listen to sample sessions featuring our TPO-enhanced audio with
          SonicSoal subliminal tuning, designed to transform your state of mind
          and connect you to deeper levels of consciousness.
        </motion.p>

        <AudioPlayer
          tracks={audioTracks}
          onTrackChange={(track, index) => {
            console.log(`Now playing: ${track.title} (index: ${index})`);
          }}
        />
      </div>
    </section>
  );
}
