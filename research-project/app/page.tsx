'use client'

import React, { useState, useEffect, useRef } from 'react'
import { LiquidButton } from '@/components/liquid-button'
import { LiquidGlass } from '@/components/liquid-glass'
import { CustomIcon } from '@/components/custom-icon'
import { Profile, Publications, Projects, Connect } from '@/components/sections'

export default function HomePage() {

  // Background images
  const backgroundImages = [
    '/images/road_forward.jpg',
    '/images/sunrise.jpg',
    '/images/wakeup.jpg',
  ]

  // Background system - initialize with random image but persist selection
  const [currentBgIndex, setCurrentBgIndex] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [selectedButton, setSelectedButton] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showPageContent, setShowPageContent] = useState(false)
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const buttons = [
    {
      id: 'profile',
      icon: <CustomIcon src="/buttons/profile.svg" alt="Go to Profile page" size={40} />,
      iconSmall: <CustomIcon src="/buttons/profile.svg" alt="Go to Profile page" size={24} />,
      label: 'Profile',
      tooltip: 'Go to Profile',
      route: '/profile',
      activeBackground:
        'linear-gradient(135deg, rgba(249, 115, 22, 0.7) 0%, rgba(234, 88, 12, 0.7) 100%)',
      activeBorder: 'rgba(251, 146, 60, 0.8)',
    },
    {
      id: 'publications',
      icon: <CustomIcon src="/buttons/publications.svg" alt="Go to Publications page" size={40} />,
      iconSmall: <CustomIcon src="/buttons/publications.svg" alt="Go to Publications page" size={24} />,
      label: 'Publications',
      tooltip: 'Go to Publications',
      route: '/publications',
      activeBackground:
        'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)',
      activeBorder: 'rgba(96, 165, 250, 0.8)',
    },
    {
      id: 'projects',
      icon: <CustomIcon src="/buttons/projects.svg" alt="Go to Projects page" size={40} />,
      iconSmall: <CustomIcon src="/buttons/projects.svg" alt="Go to Projects page" size={24} />,
      label: 'Projects',
      tooltip: 'Go to Projects',
      route: '/projects',
      activeBackground:
        'linear-gradient(135deg, rgba(16, 185, 129, 0.7) 0%, rgba(5, 150, 105, 0.7) 100%)',
      activeBorder: 'rgba(52, 211, 153, 0.8)',
    },
    {
      id: 'connect',
      icon: <CustomIcon src="/buttons/connect.svg" alt="Go to Connect page" size={40} />,
      iconSmall: <CustomIcon src="/buttons/connect.svg" alt="Go to Connect page" size={24} />,
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
    if (!isLargeScreen) {
      setIsMenuExpanded(!isMenuExpanded)
    }
  }

  // Initialize state from URL and localStorage on mount
  useEffect(() => {
    // Check current URL path to determine selected button
    const currentPath = window.location.pathname
    const buttonFromPath = buttons.find(b => b.route === currentPath)
    
    if (buttonFromPath) {
      setSelectedButton(buttonFromPath.id)
      setShowPageContent(true)
    }

    // Get or set background index
    const savedBgIndex = localStorage.getItem('bgIndex')
    if (savedBgIndex !== null && !isNaN(Number(savedBgIndex))) {
      setCurrentBgIndex(Number(savedBgIndex))
    } else {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length)
      setCurrentBgIndex(randomIndex)
      localStorage.setItem('bgIndex', randomIndex.toString())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const wasLargeScreen = isLargeScreen
      const nowLargeScreen = window.innerWidth > 1670
      setIsLargeScreen(nowLargeScreen)
      
      // Hide menu when shrinking below threshold
      if (wasLargeScreen && !nowLargeScreen) {
        setIsMenuExpanded(false)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [isLargeScreen])

  // Handle click outside to close menu (only on smaller screens)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isLargeScreen && isMenuExpanded) {
        if (
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsMenuExpanded(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuExpanded, isLargeScreen])

  // Auto-expand menu on large screens
  useEffect(() => {
    if (isLargeScreen && selectedButton) {
      setIsMenuExpanded(true)
    }
  }, [isLargeScreen, selectedButton])

  // Use first background as default if not set yet
  const bgIndex = currentBgIndex !== null ? currentBgIndex : 0

  const selectedButtonData = buttons.find(b => b.id === selectedButton)

  // Render the appropriate section component
  const renderSectionContent = () => {
    switch(selectedButton) {
      case 'profile':
        return <Profile />
      case 'publications':
        return <Publications />
      case 'projects':
        return <Projects />
      case 'connect':
        return <Connect />
      default:
        return null
    }
  }

  // Get background gradient for current section
  const getSectionBackground = () => {
    switch(selectedButton) {
      case 'profile':
        return 'bg-gradient-to-br from-orange-500/10 to-amber-600/10'
      case 'publications':
        return 'bg-gradient-to-br from-blue-500/10 to-indigo-600/10'
      case 'projects':
        return 'bg-gradient-to-br from-green-500/10 to-emerald-600/10'
      case 'connect':
        return 'bg-gradient-to-br from-purple-500/10 to-violet-600/10'
      default:
        return 'bg-white/10'
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cycling background images */}
      {backgroundImages.map((bgUrl, index) => (
        <div
          key={index}
          className={`fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === bgIndex ? 'opacity-100' : 'opacity-0'
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
              ref={buttonRef}
              onClick={handleMenuToggle}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/20 hover:scale-105 transition-transform ${
                isLargeScreen ? 'cursor-default' : 'cursor-pointer'
              }`}
              style={{
                background: selectedButtonData?.activeBackground,
                borderColor: selectedButtonData?.activeBorder,
              }}
              title={isLargeScreen ? selectedButtonData?.label : "Navigation Menu"}
              disabled={isLargeScreen}
            >
              {React.cloneElement(selectedButtonData?.icon as React.ReactElement, { size: 32 })}
            </button>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {selectedButtonData?.label}
            </h1>
          </div>

          {/* Expanded Navigation Menu - Vertical sidebar style */}
          {(isMenuExpanded || isLargeScreen) && selectedButton && (
            <div 
              ref={menuRef}
              className="fixed top-28 left-8 animate-in slide-in-from-top-2 fade-in-0 duration-300"
              style={{ zIndex: 35 }}
            >
              <LiquidGlass
                variant="panel"
                intensity="medium"
                rippleEffect={false}
                flowOnHover={false}
                stretchOnDrag={false}
                className="p-3"
                style={{ borderRadius: '20px' }}
              >
                <div className="flex flex-col gap-3">
                  {buttons.map((button) => (
                    <button
                      key={button.id}
                      onClick={() => handleButtonClick(button)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:translate-x-1 ${
                        button.id === selectedButton ? 'opacity-50' : 'opacity-100'
                      }`}
                      style={{
                        background: button.id === selectedButton ? button.activeBackground : 'rgba(255, 255, 255, 0.1)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: button.id === selectedButton ? button.activeBorder : 'rgba(255, 255, 255, 0.2)',
                        minWidth: '200px',
                      }}
                      title={button.tooltip}
                      disabled={button.id === selectedButton}
                    >
                      {button.iconSmall}
                      <span className="text-white font-medium">{button.label}</span>
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
            {renderSectionContent()}
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
              onClick={() => {
                setCurrentBgIndex(index)
                localStorage.setItem('bgIndex', index.toString())
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === bgIndex 
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