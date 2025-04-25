"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X } from "lucide-react"

interface FaqItem {
  question: React.ReactNode
  answer: React.ReactNode
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs: FaqItem[] = [
    {
      question: <div>What is SonicSoal?</div>,
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            SonicSoal is a frequency-optimized audio platform designed to enhance focus, clarity, and
            spiritual alignment through personalized sound experiences powered by your birth data, daily
            mood, and intention.
          </p>
        </div>
      ),
    },
    {
      question: "Is this the same as binaural beats?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            No. While SonicSoal may use elements of frequency entrainment, it’s not just binaural beats.
            Our audio is dynamic, intention-based, and personalized using tools like AstroSync™ and Inner
            Archive™ readings.
          </p>
        </div>
      ),
    },
    {
      question: "How does SonicSoal increase focus?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            By aligning frequencies with your personal energetic profile, SonicSoal tunes your mental and
            emotional state for clarity, flow, and reduced cognitive clutter. Users often report entering “flow”
            states within minutes.
          </p>
        </div>
      ),
    },
    {
      question: <div>What is <b>$LUV</b> and how is it used?</div>,
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            <b>$LUV</b>  is the utility token used within the SonicSoal ecosystem. It’s used to unlock premium
            rituals, personalized content, and eventually contribute to your SoulPrint™ progression and
            Inner Archive™ access.
          </p>
        </div>
      ),
    },
    {
      question: "Do I need to have ADHD to use SonicSoal?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            Not at all. While it can support neurodivergent focus needs, SonicSoal is built for anyone
            seeking better mental clarity, emotional balance, or spiritual insight through sound.
          </p>
        </div>
      ),
    },
    {
      question: "What makes this better than normal music or meditation apps?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>SonicSoal goes beyond generic soundtracks. It personalizes audio in real time based on your
            birth chart, mood, and intentions. It’s part sound healing, part ritual technology.</p>
        </div>
      ),
    },
    {
      question: "How large are your studies or user base?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>We’re currently building our first wave of data from early users and community testers. The
            platform is evolving through real-time feedback and research.</p>
        </div>
      ),
    },
    {
      question: "How do I make SonicSoal work best for me?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>Consistency is key. Use it daily with intention, track your experience in the app, and engage with
            the Inner Archive™ to deepen your transformation.</p>
        </div>
      ),
    },
    {
      question: <div>Can I use SonicSoal without <b>$LUV</b> tokens? </div>,
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>Yes — basic features are free. However, <b>$LUV</b> unlocks deeper tools, personalized sessions,
            and community-based rewards.</p>
        </div>
      ),
    },
    {
      question: "Where can I leave feedback or share my experience?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>We love hearing from you. You can share feedback directly inside the app or join our community
            channels to contribute to the evolution of SonicSoal. Your input helps shape future updates.</p>
        </div>
      ),
    },
    {
      question: "Is my personal data and birth information secure?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>Yes. We take data security seriously. Your birth data and personal inputs are encrypted and
            never sold. They’re used solely to generate your unique sound experience within SonicSoal.</p>
        </div>
      ),
    },
    {
      question: "Is it safe to use SonicSoal while driving?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>Use caution. Some frequencies are deeply immersive or meditative and may reduce alertness.
            We recommend using “Focus Mode” only while stationary or during light tasks, not while driving
            or operating machinery.</p>
        </div>
      ),
    },
    {
      question: "Should I stay hydrated while using it?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>Yes. Hydration supports the body’s natural energy flow and can enhance the effects of
            SonicSoal’s sound alignment. We recommend drinking water before and after longer sessions.</p>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about how <b>$LUV</b> works and why it&apos;s different from other focus tools.
        </p>
      </div>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-border">
          <button
            onClick={() => toggleFaq(index)}
            className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
          >
            <span className="text-xl font-medium text-foreground">{faq.question}</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border">
              {openIndex === index ? <X size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {openIndex === index && <div className="pb-6">{faq.answer}</div>}
        </div>
      ))}
    </div>
  )
}
