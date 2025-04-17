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
      question: <div>Why does <b>$SOAL</b> increase focus?</div>,
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            <b>$SOAL</b> uses scientifically designed audio frequencies that synchronize with your brainwaves to enhance neural coherence and optimize cognitive function.
          </p>
          <p>
            In a way, you could think of <b>$SOAL</b> as neural entrainment 2.0. We took the concept behind traditional audio therapies and applied an updated understanding of neuroscience and auditory processing to create a more effective and powerful solution.``
          </p>
          <p>Some core mechanisms:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><b>$SOAL</b> impacts the prefrontal cortex which is where all your thinking and creativity comes from</li>
            <li>Our frequencies help reduce distracting thoughts by stabilizing neural oscillations</li>
            <li>The audio patterns create an optimal environment for sustained attention</li>
            <li>Background noise and distractions are effectively masked by our carefully designed soundscapes</li>
          </ul>
          <p>Most importantly, <b>$SOAL</b> uses many methods to make our audio work, not just a single technique!</p>
        </div>
      ),
    },
    {
      question: "Is this the same as binaural beats?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            <b>$SOAL</b> is not binaural beats. There are some similarities, but it&apos;s important to remember that binaural beats were first discovered in 1839, popularized in the 1970&apos;s and haven&apos;t really changed since.
          </p>
          <p>
            In a way, you could think of <b>$SOAL</b> as binaural beats 2.0. We took the concept behind binaural beats and applied an updated understanding of neuroscience and auditory processing to create a more effective and powerful solution.
          </p>
          <p>Some core differences:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Binaural beats primarily impact the lower brain which is not where thinking or creativity occurs.</li>
            <li><b>$SOAL</b> impacts the prefrontal cortex which is where all your thinking and creativity comes from</li>
            <li>Binaural beats require both ears to be free of hearing damage and high-quality headphones to be on.</li>
            <li><b>$SOAL</b> works with one or two ears, does not require headphones, and is not dependent on your ability to hear certain frequencies.</li>
          </ul>
          <p>Most importantly, <b>$SOAL</b> uses many methods to make our audio work, unlike binaural beats which is just one technique!</p>
        </div>
      ),
    },
    {
      question: "How large are your scientific studies?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            Our research is based on multiple studies with varying sample sizes, designed to validate different aspects of our technology.
          </p>
          <p>Our primary efficacy studies included:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A controlled laboratory study with 34 participants measuring cognitive performance</li>
            <li>A field study with over 150 regular users tracking productivity metrics over time</li>
            <li>EEG measurements from 28 subjects showing neural entrainment effects</li>
            <li>A comparative analysis against traditional focus-enhancing audio with 45 participants</li>
          </ul>
          <p>We continue to expand our research program and collaborate with neuroscience researchers to further validate and improve our technology.</p>
        </div>
      ),
    },
    {
      question: "Is this only for people with ADHD?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            No, <b>$SOAL</b> is designed for everyone who wants to improve their focus, relaxation, or sleep quality, regardless of whether they have ADHD or not.
          </p>
          <p>
            While many users with ADHD report significant benefits from our sessions, our technology works with the fundamental neural mechanisms that all humans share.
          </p>
          <p><b>$SOAL</b> helps with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>General focus and productivity for anyone doing knowledge work</li>
            <li>Creative flow states for artists, writers, and other creative professionals</li>
            <li>Relaxation and stress reduction for anyone experiencing tension</li>
            <li>Sleep quality improvement for those with occasional sleep difficulties</li>
          </ul>
          <p>Our diverse user base includes students, professionals, creatives, and anyone looking to optimize their mental state for specific activities.</p>
        </div>
      ),
    },
    {
      question: "Why is this better for focus than normal music?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>
            Unlike regular music, <b>$SOAL</b> is specifically engineered to enhance cognitive function rather than just provide entertainment.
          </p>
          <p>Key differences include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Regular music often contains lyrics, which compete for your verbal processing resources</li>
            <li>Music typically has dynamic changes in tempo, volume, and emotional tone that can be distracting</li>
            <li><b>$SOAL</b> uses precise frequencies and patterns that work with your brain&apos;s natural rhythms</li>
            <li>Our audio maintains consistent properties that create an optimal environment for sustained focus</li>
            <li>Regular music is designed to engage your emotions; <b>$SOAL</b> is designed to optimize your cognitive state</li>
          </ul>
          <p>While some instrumental music can be helpful for focus, it&apos;s not specifically designed for cognitive enhancement the way <b>$SOAL</b> is.</p>
        </div>
      ),
    },
    {
      question: "How do I make $SOAL work best for me?",
      answer: (
        <div className="space-y-4 text-muted-foreground">
          <p>To get the most out of <b>$SOAL</b>, we recommend following these best practices:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use headphones when possible for the most immersive experience</li>
            <li>Start with 15–30 minute sessions and gradually increase as needed</li>
            <li>Match the session type to your activity (focus for work, relax for unwinding, etc.)</li>
            <li>Set a clear intention for what you want to accomplish during your session</li>
            <li>Use <b>$SOAL</b> consistently to train your brain to respond more quickly to the frequencies</li>
            <li>Experiment with different volume levels to find what works best for you</li>
          </ul>
          <p>Everyone&apos;s brain is unique, so don&apos;t be afraid to experiment with different session types and settings to find your optimal configuration.</p>
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
          Everything you need to know about how <b>$SOAL</b> works and why it&apos;s different from other focus tools.
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
