import {
  Trophy,
  Star,
  Clock,
  Sparkles,
  Goal,
  AudioWaveformIcon as WaveformIcon,
} from 'lucide-react';

export function EarnSoal() {
  return (
    <section id="earn" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-primary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-secondary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            How to Earn <span className="text-secondary">$SOAL</span> Tokens
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            SonicSoal is your gateway to personalized frequency sessions that
            boost your vibe—mentally, emotionally, and energetically. To reward
            your alignment journey, we&apos;ve created <b>$SOAL</b>, the
            official SonicSoal token.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual Element - Enhanced Token Design */}
          <div className="relative order-2 md:order-1">
            <div className="w-full aspect-square max-w-md mx-auto relative">
              {/* Animated gradient circles - adjusted sizes */}
              <div className="absolute inset-[5%] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse [animation-duration:5s]"></div>

              {/* Outer glow - reduced size */}
              <div className="absolute inset-[15%] bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb)/0.3)] animate-pulse [animation-duration:5s] animation-delay-1000"></div>

              {/* Inner circle - reduced size */}
              <div className="absolute inset-[25%] bg-gradient-to-br from-primary/50 to-secondary/50 rounded-full animate-pulse [animation-duration:5s] animation-delay-2000"></div>

              {/* Token - reduced size but still prominent */}
              <div className="absolute inset-[35%] bg-gradient-to-r from-primary/10 via-primary/20 to-primary/20 rounded-full flex items-center justify-center shadow-xl border-4 border-primary-foreground/10">
                <div className="text-2xl font-bold text-violet-900 dark:text-primary-foreground">
                  <WaveformIcon
                    size={48}
                    className="text-primary relative z-10"
                  />
                </div>
              </div>

              {/* Floating Elements - adjusted positions */}
              <div className="absolute top-[10%] right-[15%] bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-primary/30 shadow-glow">
                <Trophy className="h-7 w-7 text-primary" />
              </div>
              <div className="absolute bottom-[15%] left-[15%] bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-primary/30 shadow-glow">
                <Star className="h-7 w-7 text-primary" />
              </div>
              <div className="absolute top-[15%] left-[15%] bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-primary/30 shadow-glow">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <div className="absolute bottom-[15%] right-[15%] bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-primary/30 shadow-glow">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div>
                  <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-4 rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-foreground">
                    Daily Sessions
                  </h4>
                  <p className="text-muted-foreground">
                    Earn <b>$SOAL</b> for completing SonicSoal frequency
                    sessions each day. The more consistent you are, the more you
                    build.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div>
                  <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-4 rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-foreground">
                    Streak Bonuses
                  </h4>
                  <p className="text-muted-foreground">
                    Keep your momentum going—earn bonus tokens for multi-day
                    streaks and reach key vibration benchmarks for additional
                    <b> $SOAL</b> rewards.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div>
                  <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-4 rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                    <Goal className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-foreground">
                    ⁠Milestones & Challenges
                  </h4>
                  <p className="text-muted-foreground">
                    Reach key vibration benchmarks (like 3-day resets, 7-day
                    activations, etc.) and unlock <b>$SOAL</b> rewards.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div>
                  <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-4 rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-foreground">
                    Invite Your Circle
                  </h4>
                  <p className="text-muted-foreground">
                    Refer others to{' '}
                    <span className=" font-semibold">SonicSoal</span> and
                    receive token bonuses when they join and complete their
                    first sessions.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div>
                  <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-4 rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-foreground">
                    ⁠Unlock & Access
                  </h4>
                  <p className="text-muted-foreground text-base">
                    Use your earned <b>$SOAL</b> to unlock premium sessions,
                    higher-tier frequency blends, and upcoming features like:
                  </p>
                  <ul className="text-muted-foreground text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>AstroSync (natal chart-based sessions)</li>
                    <li>SoalSight (ambient mood-based alignment)</li>
                    <li>SoalBond (relationship-based harmonic syncing)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
