import { Brain, Headphones, Zap, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "Listen",
    description:
      "Choose a session that matches your desired state of mind and listen with headphones for optimal experience.",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Align",
    description:
      "Your brainwaves naturally synchronize with the audio frequencies, guiding you into the desired mental state.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Transform",
    description:
      "Experience enhanced focus, deeper relaxation, or elevated creativity as your mind aligns with the frequencies.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Progress",
    description:
      "Track your sessions and earn SonicSoul points as you consistently improve your mental wellness journey.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-bl from-secondary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-primary/5 to-transparent opacity-60 dark:opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">The SonicSoul Experience</h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Our scientifically designed audio sessions use specific frequencies to help your brain achieve optimal states
          for wellbeing and spiritual growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-background to-background/80 border border-primary/30 flex items-center justify-center mb-6 shadow-md relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">{step.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute transform translate-x-[160px]">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-card/80 backdrop-blur-sm border border-border rounded-xl max-w-3xl mx-auto shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-center text-foreground">The Science Behind SonicSoul</h3>
          <p className="text-muted-foreground mb-4">
            Our audio technology uses carefully calibrated sound frequencies that correspond to different brainwave
            states, creating a harmonious connection between sound and consciousness:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong className="text-foreground">Delta (0.5-4 Hz):</strong>{" "}
                <span className="text-muted-foreground">Deep sleep, healing, and subconscious exploration</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong className="text-foreground">Theta (4-8 Hz):</strong>{" "}
                <span className="text-muted-foreground">Meditation, creativity, and spiritual connection</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong className="text-foreground">Alpha (8-13 Hz):</strong>{" "}
                <span className="text-muted-foreground">Relaxation, calmness, and mindful awareness</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong className="text-foreground">Beta (13-30 Hz):</strong>{" "}
                <span className="text-muted-foreground">Focus, productivity, and active problem-solving</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong className="text-foreground">Gamma (30-100 Hz):</strong>{" "}
                <span className="text-muted-foreground">
                  Peak cognitive performance and higher states of consciousness
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
