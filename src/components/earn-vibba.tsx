import { Trophy, Star, Clock, Sparkles } from "lucide-react"

export function EarnVibba() {
  return (
    <section id="earn" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-primary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-secondary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual Element */}
          <div className="relative order-2 md:order-1">
            <div className="w-full aspect-square max-w-md mx-auto relative">
              {/* Animated gradient circles */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-[15%] bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-[30%] bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full animate-pulse animation-delay-2000"></div>
              <div className="absolute inset-[45%] bg-gradient-to-r from-primary to-primary/90 rounded-full flex items-center justify-center shadow-lg">
                <span className="font-bold text-primary-foreground">SS</span>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-[10%] right-[20%] bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-primary/30 shadow-glow">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute bottom-[15%] left-[10%] bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-primary/30 shadow-glow">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute top-[30%] left-[15%] bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-primary/30 shadow-glow">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute bottom-[25%] right-[15%] bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-primary/30 shadow-glow">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Earn SonicSoul Points</h2>
            <p className="text-muted-foreground mb-8">
              Enhance your journey by earning SonicSoul points as you progress through your frequency alignment
              practice. Use points to unlock premium sessions, exclusive content, and special features designed to
              deepen your sonic experience.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">Consistent Practice</h3>
                  <p className="text-muted-foreground">
                    Earn points for each completed session and build streaks for bonus rewards and deeper sonic
                    experiences.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">Achieve Goals</h3>
                  <p className="text-muted-foreground">
                    Complete challenges and reach milestones to earn special point bonuses and unlock advanced
                    frequencies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">Share & Refer</h3>
                  <p className="text-muted-foreground">
                    Invite friends to join the SonicSoul community and earn points when they start their journey.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">Unlock Premium</h3>
                  <p className="text-muted-foreground">
                    Use your earned points to access exclusive premium content, advanced frequency patterns, and
                    personalized sonic journeys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
