'use client'

import React, { useState } from 'react'
import { LiquidGlass } from '@/components/liquid-glass'
import Image from 'next/image'

interface ProjectsProps {
  className?: string
}

interface ProjectMedia {
  type: 'image' | 'video' | 'youtube'
  url: string
  thumbnail?: string // For videos
  alt?: string // For images
  caption?: string
}

interface ProjectPaper {
  title: string
  doi?: string
  url?: string
  venue?: string
}

interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  keyMetrics?: string[]
  technologies: string[]
  status: 'completed' | 'in-progress' | 'planning' | 'archived'
  year: string
  category: 'research' | 'web' | 'game' | 'tool' | 'academic'
  media?: ProjectMedia[]
  papers?: ProjectPaper[]
  links?: {
    github?: string
    demo?: string
    video?: string
    website?: string
  }
  featured?: boolean
}

function ProjectMediaGallery({ media, projectTitle }: { media: ProjectMedia[], projectTitle: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  if (!media || media.length === 0) return null

  const currentMedia = media[currentIndex]

  const renderMedia = (mediaItem: ProjectMedia) => {
    switch (mediaItem.type) {
      case 'image':
        return (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-black/5">
            <Image
              src={mediaItem.url}
              alt={mediaItem.alt || `${projectTitle} screenshot`}
              fill
              className="object-contain"
            />
          </div>
        )
      case 'video':
        return (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
            <video
              controls
              className="w-full h-full object-cover"
              poster={mediaItem.thumbnail}
            >
              <source src={mediaItem.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      case 'youtube':
        return (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
            <iframe
              src={mediaItem.url}
              title={`${projectTitle} video`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {renderMedia(currentMedia)}
      
      {currentMedia.caption && (
        <p className="text-white/70 text-sm italic text-center">
          {currentMedia.caption}
        </p>
      )}
      
      {media.length > 1 && (
        <div className="flex justify-center gap-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, layout = 'default' }: { project: Project, layout?: 'default' | 'featured' | 'compact' }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'in-progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'planning': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'archived': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'research': return '🔬'
      case 'web': return '🌐'
      case 'game': return '🎮'
      case 'tool': return '🛠️'
      case 'academic': return '📚'
      default: return '📁'
    }
  }

  if (layout === 'featured') {
    return (
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-8 hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getCategoryIcon(project.category)}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="text-white/60 text-sm">{project.year}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-white/80 leading-relaxed">
              {showFullDescription && project.longDescription 
                ? project.longDescription 
                : project.description
              }
            </p>
            
            {/* Key Metrics - shown when expanded */}
            {showFullDescription && project.keyMetrics && project.keyMetrics.length > 0 && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-sm font-semibold text-white mb-3">Key Metrics:</h4>
                <ul className="space-y-2">
                  {project.keyMetrics.map((metric, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-white/80 text-sm">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.longDescription && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-green-400 hover:text-green-300 text-sm transition-colors"
              >
                {showFullDescription ? 'Show less' : 'Read more'}
              </button>
            )}
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/10 text-white/90 rounded-lg text-sm border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Action Links */}
            {project.links && (
              <div className="flex flex-wrap gap-3">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors border border-green-500/30"
                  >
                    Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors border border-gray-500/30"
                  >
                    GitHub
                  </a>
                )}
                {project.links.video && (
                  <a
                    href={project.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Video
                  </a>
                )}
                {project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                  >
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
          
          {project.media && project.media.length > 0 && (
            <div>
              <ProjectMediaGallery media={project.media} projectTitle={project.title} />
            </div>
          )}
        </div>
        
        {/* Related Publications - Full Width Section */}
        {project.papers && project.papers.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-lg font-semibold text-white mb-4">Related Publications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.papers.map((paper, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  {paper.doi || paper.url ? (
                    <a
                      href={paper.doi ? `https://doi.org/${paper.doi}` : paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 font-medium block mb-2"
                    >
                      {paper.title}
                    </a>
                  ) : (
                    <span className="text-white font-medium block mb-2">{paper.title}</span>
                  )}
                  {paper.venue && (
                    <span className="text-white/60 text-sm">{paper.venue}</span>
                  )}
                  {paper.doi && (
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30">
                        DOI: {paper.doi}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </LiquidGlass>
    )
  }

  // Default layout
  return (
    <LiquidGlass
      variant="card"
      intensity="medium"
      className="p-6 hover:scale-[1.01] transition-transform duration-300"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getCategoryIcon(project.category)}</span>
            <div>
              <h4 className="text-xl font-bold text-white">{project.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className="text-white/60 text-xs">{project.year}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-white/70 text-sm leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-white/5 text-white/80 rounded text-xs border border-white/10"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-white/60 text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
    </LiquidGlass>
  )
}

export function Projects({ className = '' }: ProjectsProps) {
  // Sample projects - you can replace with real data
  const projects: Project[] = [
      {
      id: 'research_1',
      title: 'AI-Driven Player Behavior Modeling and Deception Research Platform',
      description: 'Developed a text-based dungeon crawler platform that models player behavior through LLM-driven agents and enables research into strategic deception in gaming environments.',
      longDescription: 'Created a comprehensive research platform combining a dynamically generated text-based dungeon crawler with LLM-controlled player agents guided by D&D alignment systems and custom motivations. The platform processes over 5.7×10¹⁴ possible map configurations and achieved 75-93% accuracy in LLM behavior modeling across 36 character profiles. This work enabled systematic research into strategic AI deception, resulting in two published papers exploring belief-driven NPC behavior and deceptive algorithm frameworks.',
      keyMetrics: [
        '17,386 papers processed across 3 academic databases',
        '99.9% reduction in search results through intelligent filtering',
        '4-phase systematic review methodology implementation',
        '3 API integrations (arXiv, Springer, CORE)',
        'Collaborative workflow supporting 4+ researchers'
      ],
      technologies: ['Python', 'OpenAI GPT-4', 'LLM Integration', 'Game Theory', 'Statistical Analysis', 'Academic Research Methodology'],
      status: 'completed',
      year: '2024-2025',
      category: 'research',
      featured: true,
      media: [
        {
          type: 'image',
          url: '/images/map.png',
          alt: 'Grid map of the created game',
          caption: 'Example of a random game generated within the game.'
        }
      ],
      papers: [
        {
          title: 'Modeling Player Types with LLMs: A Framework for Belief- and Motivation-Driven NPC Behavior',
          doi: '',  // Replace with actual DOI when published
          venue: 'Joint Conference on Serious Games 2025'
        },
        {
          title: 'Deceptive Algorithms in Massive Multiplayer Online Role Playing Games (MMOs)',
          doi: '10.1007/978-3-031-74138-8_32',
          venue: 'Joint Conference on Serious Games 2024'
        }
      ],
      links: {
        github: 'https://github.com/jstarace/NPC-Profile-Creation',
        //video: 'https://youtube.com/watch?v=example'
      }
    },
    {
      id: 'profile_1',
      title: 'Systematic Literature Review Management Platform',
      description: 'Automated systematic literature review platform processing 17K+ papers through collaborative four-phase filtration workflows.',
      longDescription: 'Developed a comprehensive web application that processed over 17,000 academic papers through a rigorous four-phase systematic review methodology. Integrated arXiv, Springer Open Access, and CORE APIs to automate literature discovery and aggregation. Built collaborative filtering workflows that reduced 17,386 initial search results to 18 highly relevant papers through intelligent deduplication, categorical sorting, and team-based evaluation processes.',
      keyMetrics: [
        '17,386 papers processed across 3 academic databases',
        '99.9% reduction in search results through intelligent filtering',
        '4-phase systematic review methodology implementation',
        '3 API integrations (arXiv, Springer, CORE)',
        'Collaborative workflow supporting 4+ researchers'
      ],
      technologies: ['Node.js', 'Express.js', 'REST APIs', 'Xata', 'Clerk', 'React', 'TypeScript', 'Git', 'Vercel', 'CI/CD'],
      status: 'completed',
      year: '2024',
      category: 'research',
      featured: true,
      media: [
        {
          type: 'image',
          url: '/images/paper_filtration.png',
          alt: 'Funnel depicting the filtration process used on the site',
          caption: 'Visual overview of systematic literature review process showing progressive paper filtration and selection criteria.'
        }
      ],
      links: {
        //github: 'https://github.com/example/deceptive-agents',
        //paper: '/publications#deceptive-algorithms',
        //video: 'https://youtube.com/watch?v=example'
      }
    },
    {
      id: 'profile_2',
      title: 'Personal Research Portfolio & Academic Website',
      description: 'Redesigned and developed a responsive academic portfolio website showcasing AI research with mobile-first design principles.',
      longDescription: 'Complete redesign and development of a professional academic portfolio website targeting both academic and industry audiences. Implemented mobile-first responsive design, integrated research publications and projects, and created an engaging user experience. Built modern interface showcasing strategic AI research while maintaining professional academic standards.',
      technologies: ['React', 'Node.js', 'Responsive Design', 'Vercel', 'Git'],
      status: 'completed',
      year: '2025',
      category: 'web',
      featured: false,
      media: [
        {
          type: 'image',
          url: '/images/paper_filtration.png',
          alt: 'Funnel depicting the filtration process used on the site',
          caption: 'Visual overview of systematic literature review process showing progressive paper filtration and selection criteria.'
        }
      ],
      links: {
        //github: 'https://github.com/example/deceptive-agents',
        //paper: '/publications#deceptive-algorithms',
        //video: 'https://youtube.com/watch?v=example'
      }
    }
  ]

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Projects & Development</h2>
        <p className="text-white/80 leading-relaxed">
          Selected projects demonstrating my work in strategic AI research, academic tool development, and practical applications.
        </p>
      </LiquidGlass>

      {/* Featured Projects */}
      {projects.filter(p => p.featured).length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Featured Projects</h3>
          {projects.filter(p => p.featured).map(project => (
            <ProjectCard key={project.id} project={project} layout="featured" />
          ))}
        </div>
      )}

      {/* Other Projects */}
      {projects.filter(p => !p.featured).length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Other Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map(project => (
              <ProjectCard key={project.id} project={project} layout="default" />
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-3">Interested in Collaboration?</h3>
        <p className="text-white/80 mb-4">
          I&apos;m always interested in working on innovative projects that push the boundaries 
          of AI and interactive systems. Whether it&apos;s research collaboration, technical 
          consulting, or open-source contributions, let&apos;s build something amazing together.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
            AI Systems
          </span>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
            Game Development
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
            Research Tools
          </span>
          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
            Web Applications
          </span>
        </div>
      </LiquidGlass>
    </div>
  )
}