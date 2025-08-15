'use client'

import React, { useState } from 'react'
import { LiquidGlass } from '@/components/liquid-glass'

interface ConnectProps {
  className?: string
}

interface ContactMethod {
  platform: string
  icon: string
  value: string
  url?: string
  action?: string
  primary?: boolean
}


export function Connect({ className = '' }: ConnectProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Contact information - replace with your actual details
  const contactMethods: ContactMethod[] = [
    {
      platform: 'Email',
      icon: '📧',
      value: 'jason_starace@icloud.com',
      action: 'mailto:jason_starace@icloud.com',
      primary: true
    },
    {
      platform: 'LinkedIn',
      icon: '💼',
      value: 'linkedin.com/in/jason-starace',
      url: 'https://www.linkedin.com/in/jason-starace',
    },
    {
      platform: 'GitHub',
      icon: '🐙',
      value: 'github.com/jstarace',
      url: 'https://github.com/jstarace',
    },
    {
      platform: 'Google Scholar',
      icon: '🎓',
      value: 'Jason Starace',
      url: 'https://scholar.google.com/citations?user=AHVTu-4AAAAJ&hl=en',
    },
    {
      platform: 'ORCID',
      icon: '🔬',
      value: '0009-0000-6602-9867',
      url: 'https://orcid.org/0009-0000-6602-9867',
    },
  ]


  const handleCopyEmail = () => {
    const email = contactMethods.find(m => m.platform === 'Email')?.value
    if (email) {
      navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Connect</h2>
        <p className="text-white/80 leading-relaxed">
          Let&apos;s collaborate on shaping the future of AI. I&apos;m eager to connect with researchers, 
          industry professionals, and organizations working on strategic AI systems, autonomous reasoning, 
          or ethical AI development. Whether you have a specific project in mind or want to explore possibilities, 
          reach out – I&apos;d love to hear from you.
        </p>
      </LiquidGlass>

      {/* Primary Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiquidGlass
          variant="card"
          intensity="subtle"
          className="p-6"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Get in Touch</h3>
          <div className="space-y-4">
            {contactMethods.filter(m => m.primary).map((method) => (
              <div key={method.platform} className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{method.platform}</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={method.action}
                        className="text-purple-300 hover:text-purple-200 transition-colors"
                      >
                        {method.value}
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 text-white/80 rounded transition-colors"
                      >
                        {copiedEmail ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm ml-11">
                  Best for academic inquiries, research collaborations, and professional opportunities
                </p>
              </div>
            ))}
          </div>

          {/* Quick Message Form */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Send a Quick Message</h4>
            <form 
              onSubmit={async (e) => {
                e.preventDefault()
                setIsSubmitting(true)
                
                const formData = new FormData(e.target as HTMLFormElement)
                
                try {
                  const response = await fetch('https://formspree.io/f/mjkozage', {
                    method: 'POST',
                    body: formData,
                    headers: {
                      'Accept': 'application/json'
                    }
                  })
                  
                  if (response.ok) {
                    setShowSuccess(true)
                    ;(e.target as HTMLFormElement).reset()
                  } else {
                    alert('There was an error sending your message. Please try again.')
                  }
                } catch (error) {
                  alert('There was an error sending your message. Please try again.')
                } finally {
                  setIsSubmitting(false)
                }
              }}
              className="space-y-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />
              <input type="hidden" name="_subject" value="New message from research portfolio" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </LiquidGlass>

        {/* Academic & Professional Info */}
        <div className="space-y-6">
          <LiquidGlass
            variant="card"
            intensity="subtle"
            className="p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Academic Affiliation</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">University of Idaho</p>
                <p className="text-white/70 text-sm">Department of Computer Science</p>
                <p className="text-white/70 text-sm">875 Perimeter Drive MS 1010</p>
                <p className="text-white/70 text-sm">Moscow, ID 83844-1010</p>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  PhD Candidate
                </p>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-white/70 text-sm">Harvard University</p>
                <p className="text-white/60 text-sm">Technical Product Manager</p>
              </div>
            </div>
          </LiquidGlass>

          {/* Professional Networks - moved here as 2x2 grid */}
          <LiquidGlass
            variant="card"
            intensity="subtle"
            className="p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Professional Networks</h3>
            <div className="grid grid-cols-2 gap-3">
              {contactMethods.filter(m => !m.primary).map((method) => (
                <a
                  key={method.platform}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all hover:scale-105 border border-white/10 hover:border-white/20"
                >
                  <span className="text-xl">{method.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-white text-sm font-medium block">{method.platform}</span>
                    <span className="text-white/60 text-xs truncate block">
                      {method.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </LiquidGlass>

          {/* Download CV/Resume Button */}
          <LiquidGlass
            variant="card"
            intensity="subtle"
            className="p-4"
          >
            <a
              href="/cv/JasonStarace_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all hover:scale-105 border border-purple-500/30"
            >
              <span className="text-xl">📄</span>
              <span className="font-medium">Download CV</span>
            </a>
          </LiquidGlass>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center" style={{ zIndex: 9999 }}>
          <LiquidGlass
            variant="card"
            intensity="medium"
            className="p-8 max-w-md mx-4"
          >
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-white/80">
                Thank you for reaching out! I&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors border border-green-500/30"
              >
                Perfect!
              </button>
            </div>
          </LiquidGlass>
        </div>
      )}

      {/* Research Interests for Collaboration */}
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className="p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Open to Collaborate On</h3>
        <p className="text-white/70 text-sm mb-4">
          I&apos;m available for virtual meetings and have a flexible schedule for research collaborations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Research Areas</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Strategic AI & Deceptive Algorithms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>AI Safety & Ethics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Interactive Entertainment AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">▸</span>
                <span>...</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Opportunities</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">▸</span>
                <span>Joint Research Publications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">▸</span>
                <span>Conference Presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">▸</span>
                <span>Grant Proposals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">▸</span>
                <span>...</span>
              </li>
            </ul>
          </div>
        </div>
      </LiquidGlass>

      {/* Call to Action */}
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className="p-6 text-center"
      >
        <p className="text-white/80 text-lg">
          Looking forward to connecting with passionate researchers and innovators in AI!
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
            Research Collaboration
          </span>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
            Speaking Engagements
          </span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
            Consulting
          </span>
        </div>
      </LiquidGlass>
    </div>
  )
}