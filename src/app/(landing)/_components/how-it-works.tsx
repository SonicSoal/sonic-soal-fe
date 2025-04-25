import { Music, Play, Waves, Sparkles, Coins, Brain, Vibrate, Ear } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorks() {
  const steps = [
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "1. Choose Your Session",
      description: "Pick from our curated library of sonic experiences designed to help with:",
      bullets: [
        "Energy Boost",
        "Emotional Reset",
        "Focus & Flow",
        "Calm & Clarity",
        "Love & Connection"
      ],
      extra: "Each session pairs real music with embedded SonicSoal frequency layers tailored to your intention."
    },
    {
      icon: <Play className="h-8 w-8 text-primary" />,
      title: "2. Just Press Play",
      description: "No complicated setup. Just play the track. Headphones are optional—but recommended for deeper immersion.",
    },
    {
      icon: <Waves className="h-8 w-8 text-primary" />,
      title: "3. Subtle Frequencies Go to Work",
      description: "SonicSoal uses layered frequencies that include:",
      bullets: [
        "Binaural & Isochronic tones (for brainwave entrainment)",
        "Solfeggio & Planetary harmonics (for emotional and spiritual tuning)",
        "Psychoacoustic blending (so you feel the shift without hearing the tech)"
      ]
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "4. You Feel the Shift",
      description: "Within seconds to minutes, the blend begins syncing with your body's natural rhythms. Whether you notice a physical calm, mental alertness, or emotional grounding—your system is tuning itself.",
    },
    {
      icon: <Coins className="h-8 w-8 text-primary" />,
      title: "5. Earn $LUV for Every Session",
      description: "Each time you complete a session, maintain a streak, or hit a milestone, you earn $LUV—our official token of alignment. You can redeem $LUV for premium sessions, upgrades, or special access.",
    }
  ]

  const sciencePoints = [
    {
      icon: <Brain className="h-5 w-5 text-primary" />,
      title: "Brainwave Entrainment",
      description: "Certain frequencies (like 4.5 Hz or 10 Hz) can gently guide the brain into states like deep relaxation, focus, or creativity."
    },
    {
      icon: <Vibrate className="h-5 w-5 text-primary" />,
      title: "Vibrational Influence",
      description: "Just like sound can break glass or move water, subtle audio layers can influence your nervous system, mood, and energy."
    },
    {
      icon: <Ear className="h-5 w-5 text-primary" />,
      title: "Subconscious Reception",
      description: "Our tech uses low-volume, adaptive tones designed to bypass the conscious mind and speak directly to your body's frequency field."
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-bl from-secondary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-primary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
      </div>

      <div className="mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">How It Works</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Step Into Your Frequency
        </p>
        <p className="text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          SonicSoal is more than music—it&apos;s energetic alignment through sound. Every session is embedded with precise, inaudible frequency patterns that work with your body and brain to help shift your mood, focus, energy, or emotional state—without you even realizing it.
        </p>

        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-background to-background/80 border border-primary/30 flex items-center justify-center shadow-md relative group shrink-0 mx-auto md:mx-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">{step.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary text-center md:text-left">{step.title}</h3>
                <p className="text-muted-foreground mb-3">{step.description}</p>
                
                {step.bullets && (
                  <ul className="space-y-2 mb-3">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {step.extra && (
                  <p className="text-muted-foreground italic">{step.extra}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-card/80 backdrop-blur-sm border border-border rounded-xl max-w-3xl mx-auto shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-center text-foreground">Why It Works – The Science Behind SonicSoal</h3>
          
          <div className="space-y-6">
            {sciencePoints.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  {point.icon}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{point.title}</h4>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Try It Now</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start your first session and feel what it&apos;s like to be in harmony with your own frequency.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group"
            asChild
          >
            <Link href="#samples">
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">Try a Free Session</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}