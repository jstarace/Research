'use client'

import React from 'react'
import { LiquidGlass } from '@/components/liquid-glass'
import Image from 'next/image'

interface ProfileProps {
  className?: string
}

export function Profile({ className = '' }: ProfileProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Hero Section */}
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-8"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src="/profile_images/starace_j.jpeg"
                alt="Jason Starace"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white mb-2">Jason Starace</h1>
            <p className="text-xl text-white/90 mb-4">PhD Candidate & Technical Product Manager</p>
            <p className="text-white/70 leading-relaxed">
              Advancing the frontiers of AI reasoning through strategic behavior research. This work develops next-generation AI systems capable of sophisticated goal-oriented decision-making and complex behavioral strategies, from creating compelling interactive experiences to advancing our understanding of how AI can navigate intricate scenarios with nuanced strategic thinking.
            </p>
          </div>
        </div>
      </LiquidGlass>

      {/* Research Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LiquidGlass
          variant="card"
          intensity="subtle"
          className="p-6"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Research Interests</h3>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">▸</span>
              <span>Strategic Deception in AI Systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">▸</span>
              <span>AI Ethics & Safety Research</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">▸</span>
              <span>Adaptive Goal-Oriented AI Behavior</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">▸</span>
              <span>Game-Theoretic AI Applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">▸</span>
              <span>Human-AI Interaction</span>
            </li>
          </ul>
        </LiquidGlass>

        <LiquidGlass
          variant="card"
          intensity="subtle"
          className="p-6"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Education</h3>
          <div className="space-y-4 text-white/80">
            <div>
              <h4 className="font-semibold text-white">Ph.D. in Computer Science</h4>
              <p className="text-sm">University of Idaho • Expected 2026</p>
              <p className="text-sm mt-1">Dissertation: Strategic AI Reasoning in Interactive Entertainment Systems</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">M.S. in Computer Science</h4>
              <p className="text-sm">University of Idaho • 2020-2023</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">B.S. in Computer Engineering</h4>
              <p className="text-sm">CSU - Sacramento • 2017-2020</p>
            </div>
          </div>
        </LiquidGlass>
      </div>

            {/* Current Focus */}
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className="p-6"
      >
        <h3 className="text-2xl font-semibold text-white mb-4">Current Focus</h3>
        <p className="text-white/80 leading-relaxed mb-4">
          Currently developing AI systems that can recognize strategic opportunities and implement sophisticated 
          behavioral responses in interactive environments. This research explores how AI can develop autonomous 
          goal-oriented strategies while investigating the implications for AI safety, human-AI collaboration, and 
          next-generation intelligent systems that can navigate complex scenarios with nuanced decision-making capabilities.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Strategic AI', 'Goal-Oriented Systems', 'Ethical AI', 'Intelligent Agents'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </LiquidGlass>

      {/* Skills & Expertise */}
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className="p-6"
      >
        <h3 className="text-2xl font-semibold text-white mb-4">Technical Expertise</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
              'Python', 'TensorFlow', 'C#', 'C++',
              'React', 'Node.js', 'MongoDB', 'Statistical Analysis',
              'Research Methods', 'Git'
          ].map((skill) => (
            <div
              key={skill}
              className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center text-white/90 border border-white/10 hover:bg-white/20 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </LiquidGlass>

      {/* Professional Expertise */}
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className="p-6"
      >
        <h3 className="text-2xl font-semibold text-white mb-4">Professional Expertise</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
              'Agile', 'Waterfall', 'SCRUM', 'Requirement Gathering',
              'Prioritization', 'Cross-Team Leadership', 'Stakeholder Communications',
              'Product Roadmapping', 'Risk Management', 'Technical Documentation', 'Performance Metrics'
          ].map((skill) => (
            <div
              key={skill}
              className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center text-white/90 border border-white/10 hover:bg-white/20 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </LiquidGlass>

    </div>
  )
}