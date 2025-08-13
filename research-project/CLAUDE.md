# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Jason Starace's personal research portfolio website - a Next.js 14 single-page application featuring liquid glass morphism effects, smooth animations, and an innovative expandable navigation system.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Components**: Custom liquid glass morphism system
- **Icons**: SVG-based navigation icons

### Key Features
1. **Single Page Application**: All navigation happens within the homepage
2. **Liquid Glass Effects**: Custom glass morphism components with animations
3. **Expandable Navigation**: Click icon in top-left to expand menu
4. **Random Backgrounds**: Randomly selects from personal image collection
5. **URL Management**: Updates URLs without page navigation using `window.history.pushState()`

### Directory Structure
- `app/page.tsx` - Main homepage with all navigation and content
- `app/[...slug]/page.tsx` - Catch-all route that redirects to homepage
- `components/` - Reusable liquid glass components
  - `liquid-glass.tsx` - Core glass morphism component
  - `liquid-button.tsx` - Interactive button wrapper
  - `custom-icon.tsx` - SVG icon wrapper with styling
- `public/images/` - Background images (randomly selected)
- `public/*.svg` - Navigation icons (profile, publications, projects, connect)

### Navigation System
The site uses a sophisticated single-page navigation system:

1. **Main Navigation**: 2x2 grid of liquid glass buttons
2. **Page Selection**: Buttons animate out, selected icon moves to top-left
3. **Expandable Menu**: Click top-left icon to show all navigation options
4. **Content Areas**: Dynamic content loaded based on selection
5. **URL Updates**: Browser URL changes to reflect current section

### Component Architecture

#### LiquidGlass Component
- **Variants**: `button`, `card`, `panel`, `floating`
- **Intensities**: `subtle`, `medium`, `strong`
- **Effects**: Ripple, hover flow, drag stretching, wobble animations
- **Touch Support**: Full mobile interaction support

#### Navigation State Management
```typescript
// Key state variables
const [selectedButton, setSelectedButton] = useState<string | null>(null)
const [isMenuExpanded, setIsMenuExpanded] = useState(false)
const [showPageContent, setShowPageContent] = useState(false)
const [currentBgIndex, setCurrentBgIndex] = useState<number | null>(null)
```

### Background System
- Random selection on page load using `useEffect(() => {}, [])`
- Prevents flash by not rendering until background is selected (`currentBgIndex !== null`)
- Manual selection via indicator dots at bottom
- Supports any number of images in `public/images/`

### Content Management
Page content is dynamically generated using `getPageContent()` function:
- Each section has unique title, description, and background gradient
- Placeholder content areas ready for expansion
- Glass morphism styling consistent throughout

### Important Implementation Notes
- **No Traditional Routing**: Everything happens on the homepage
- **URL Simulation**: Uses `window.history.pushState()` for URL updates
- **Catch-All Route**: `[...slug]` redirects any direct URL access to homepage
- **Animation Sequences**: Complex timing with `setTimeout` for smooth transitions
- **Mobile-First**: Responsive design with mobile interactions

### CSS Architecture
- Custom keyframes for liquid animations (`liquidRipple`, `liquidWobble`)
- Tailwind utility classes for responsive design
- Glass morphism achieved with `backdrop-blur` and transparency
- Z-index layering system for proper element stacking

### Performance Considerations
- Background images are loaded on-demand
- Animations use CSS transforms for hardware acceleration
- Components use React.memo patterns where appropriate
- Single bundle - no code splitting needed for this architecture

## Development Guidelines
- All navigation logic is centralized in `app/page.tsx`
- New sections should be added to the `buttons` array and `getPageContent()` function
- Maintain mobile-first responsive design principles
- Use consistent glass morphism styling across components
- Test animation timing when modifying transition sequences