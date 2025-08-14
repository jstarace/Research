'use client'

import React from 'react'
import { LiquidGlass } from '@/components/liquid-glass'

interface ProjectsProps {
  className?: string
}

export function Projects({ className = '' }: ProjectsProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Current Projects</h2>
        <p className="text-white/80">Projects content coming soon...</p>
      </LiquidGlass>
    </div>
  )
}