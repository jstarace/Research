'use client'

import React, { useState, useEffect } from 'react'
import { LiquidButton } from '@/components/liquid-button'
import { LiquidGlass } from '@/components/liquid-glass'
import { CustomIcon } from '@/components/custom-icon'

export default function HomePage() {

  // Background images
  const backgroundImages = [
    '/images/road_forward.jpg',
    '/images/sunrise.jpg',
    '/images/wakeup.jpg',
  ]

  // Background system - initialize with random image
  const [currentBgIndex, setCurrentBgIndex] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [selectedButton, setSelectedButton] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showPageContent, setShowPageContent] = useState(false)
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  // Set random background on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length)
    setCurrentBgIndex(randomIndex)
  }, [])

  // Don't render until background is selected
  if (currentBgIndex === null) {
    return null
  }

  const buttons = [
    {
      id: 'profile',
      icon: <CustomIcon src="/profile.svg" alt="Go to Profile page" size={40} />,
      iconSmall: <CustomIcon src="/profile.svg" alt="Go to Profile page" size={24} />,
      label: 'Profile',
      tooltip: 'Go to Profile',
      route: '/profile',
      activeBackground:
        'linear-gradient(135deg, rgba(249, 115, 22, 0.7) 0%, rgba(234, 88, 12, 0.7) 100%)',
      activeBorder: 'rgba(251, 146, 60, 0.8)',
    },
    {
      id: 'publications',
      icon: <CustomIcon src="/publications.svg" alt="Go to Publications page" size={40} />,
      iconSmall: <CustomIcon src="/publications.svg" alt="Go to Publications page" size={24} />,
      label: 'Publications',
      tooltip: 'Go to Publications',
      route: '/publications',
      activeBackground:
        'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)',
      activeBorder: 'rgba(96, 165, 250, 0.8)',
    },
    {
      id: 'projects',
      icon: <CustomIcon src="/projects.svg" alt="Go to Projects page" size={40} />,
      iconSmall: <CustomIcon src="/projects.svg" alt="Go to Projects page" size={24} />,
      label: 'Projects',
      tooltip: 'Go to Projects',
      route: '/projects',
      activeBackground:
        'linear-gradient(135deg, rgba(16, 185, 129, 0.7) 0%, rgba(5, 150, 105, 0.7) 100%)',
      activeBorder: 'rgba(52, 211, 153, 0.8)',
    },
    {
      id: 'connect',
      icon: <CustomIcon src="/connect.svg" alt="Go to Connect page" size={40} />,
      iconSmall: <CustomIcon src="/connect.svg" alt="Go to Connect page" size={24} />,
      label: 'Connect',
      tooltip: 'Go to Connect',
      route: '/connect',
      activeBackground:
        'linear-gradient(135deg, rgba(168, 85, 247, 0.7) 0%, rgba(147, 51, 234, 0.7) 100%)',
      activeBorder: 'rgba(196, 181, 253, 0.8)',
    },
  ]

  const handleButtonClick = (button: typeof buttons[0]) => {
    setSelectedButton(button.id)
    setIsTransitioning(true)
    setIsMenuExpanded(false)
    
    // Update URL without navigating
    window.history.pushState({}, '', button.route)
    
    // Wait for animation to complete before showing content
    setTimeout(() => {
      setShowPageContent(true)
    }, 800)
  }

  const handleMenuToggle = () => {
    setIsMenuExpanded(!isMenuExpanded)
  }

  const selectedButtonData = buttons.find(b => b.id === selectedButton)

  // Page content based on selection
  const getPageContent = () => {
    switch(selectedButton) {
      case 'profile':
        return {
          title: 'Profile Overview',
          content: 'This is where your professional profile, research interests, and academic background will be displayed.',
          bg: 'bg-gradient-to-br from-orange-500/10 to-amber-600/10'
        }
      case 'publications':
        return {
          title: 'Research Publications',
          content: 'Browse through academic papers, journal articles, and conference presentations.',
          bg: 'bg-gradient-to-br from-blue-500/10 to-indigo-600/10'
        }
      case 'projects':
        return {
          title: 'Current Projects',
          content: 'Explore ongoing research projects, collaborations, and development work.',
          bg: 'bg-gradient-to-br from-green-500/10 to-emerald-600/10'
        }
      case 'connect':
        return {
          title: 'Connect & Collaborate',
          content: 'Find ways to connect, collaborate, or get in touch for research opportunities.',
          bg: 'bg-gradient-to-br from-purple-500/10 to-violet-600/10'
        }
      default:
        return {
          title: 'Welcome',
          content: 'Select a section to explore.',
          bg: 'bg-white/10'
        }
    }
  }

  const pageContent = getPageContent()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cycling background images */}
      {backgroundImages.map((bgUrl, index) => (
        <div
          key={index}
          className={`fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${bgUrl}')`,
            zIndex: 0,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/20" style={{ zIndex: 1 }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Navigation Header - Shows when button is selected */}
      {selectedButton && (
        <>
          <div 
            className={`fixed top-8 left-8 flex items-center gap-4 transition-all duration-700 ${
              showPageContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ zIndex: 30 }}
          >
            <button
              onClick={handleMenuToggle}
              className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/20 hover:scale-105 transition-transform cursor-pointer"
              style={{
                background: selectedButtonData?.activeBackground,
                borderColor: selectedButtonData?.activeBorder,
              }}
              title="Navigation Menu"
            >
              {React.cloneElement(selectedButtonData?.icon as React.ReactElement, { size: 32 })}
            </button>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {selectedButtonData?.label}
            </h1>
          </div>

          {/* Expanded Navigation Menu */}
          {isMenuExpanded && (
            <div 
              className="fixed top-8 left-28 animate-in slide-in-from-left-2 fade-in-0 duration-300"
              style={{ zIndex: 35 }}
            >
              <LiquidGlass
                variant="panel"
                intensity="medium"
                rippleEffect={false}
                flowOnHover={false}
                stretchOnDrag={false}
                className="p-2"
                style={{ borderRadius: '16px' }}
              >
                <div className="flex gap-2">
                  {buttons.map((button) => (
                    <button
                      key={button.id}
                      onClick={() => handleButtonClick(button)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                        button.id === selectedButton ? 'opacity-50' : 'opacity-100'
                      }`}
                      style={{
                        background: button.id === selectedButton ? button.activeBackground : 'rgba(255, 255, 255, 0.1)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: button.id === selectedButton ? button.activeBorder : 'rgba(255, 255, 255, 0.2)',
                      }}
                      title={button.label}
                      disabled={button.id === selectedButton}
                    >
                      {button.iconSmall}
                    </button>
                  ))}
                </div>
              </LiquidGlass>
            </div>
          )}
        </>
      )}
      
      {/* Page Content Area */}
      {showPageContent && selectedButton && (
        <div 
          className="relative pt-32 px-8 pb-8 min-h-screen animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ zIndex: 20 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className={`${pageContent.bg} backdrop-blur-md rounded-3xl p-8 border border-white/20`}>
              <h2 className="text-3xl font-bold text-white mb-6">
                {pageContent.title}
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                {pageContent.content}
              </p>
              
              {/* Additional content area for each page */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Section 1</h3>
                  <p className="text-white/70">Content placeholder for {selectedButtonData?.label}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">Section 2</h3>
                  <p className="text-white/70">Additional content area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Panel */}
      <div 
        className={`flex items-center justify-center p-8 transition-all duration-700 ${
          selectedButton ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <LiquidGlass
          variant="panel"
          intensity="medium"
          rippleEffect={false}
          flowOnHover={false}
          stretchOnDrag={false}
          className={`relative transition-all duration-700 ${
            isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{ padding: '24px', borderRadius: '64px', zIndex: 20 }}
        >
          <div className="grid grid-cols-2 relative">
            {buttons.map((button) => (
              <div 
                key={button.id} 
                className={`relative transition-all duration-500 ${
                  selectedButton && selectedButton !== button.id 
                    ? 'opacity-0 scale-0 rotate-90' 
                    : 'opacity-100 scale-100 rotate-0'
                }`}
                style={{
                  transitionDelay: selectedButton ? `${buttons.indexOf(button) * 50}ms` : '0ms'
                }}
              >
                <LiquidButton
                  variant="primary"
                  size="xl"
                  onClick={() => handleButtonClick(button)}
                  onMouseEnter={() => setHoveredButton(button.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  rippleEffect={true}
                  className={`shadow-2xl w-24 h-24 !p-0 !rounded-full flex items-center justify-center m-2 transition-all duration-300 hover:scale-105`}
                  style={{
                    width: '96px',
                    height: '96px',
                    padding: '0',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '8px',
                  }}
                >
                  {button.icon}
                </LiquidButton>
                
                {/* Tooltip */}
                {hoveredButton === button.id && !selectedButton && (
                  <div 
                    className="fixed px-3 py-1 bg-black/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap shadow-lg border border-white/20"
                    style={{
                      zIndex: 9999,
                      top: button.id === 'profile' || button.id === 'publications' ? '35%' : '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }}
                  >
                    {button.tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </LiquidGlass>
      </div>
      
      {/* Background indicator dots */}
      {!selectedButton && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2" style={{ zIndex: 30 }}>
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBgIndex 
                  ? 'bg-white/80 w-4' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}