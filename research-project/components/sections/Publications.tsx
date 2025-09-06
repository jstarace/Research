'use client'

import React, { useState } from 'react'
import { LiquidGlass } from '@/components/liquid-glass'

interface PublicationsProps {
  className?: string
}

interface Publication {
  title: string
  authors: string
  venue: string
  journal?: string
  year: string
  type: 'journal' | 'conference' | 'workshop' | 'preprint'
  doi?: string
  arxiv?: string
  abstract: string
  status?: 'published' | 'accepted' | 'under-review' | 'in-preparation'
}

// Author profiles - add URLs here as co-authors provide them
const authorProfiles: { [key: string]: string } = {
  'Terence Soule Ph.D.': 'https://www.linkedin.com/in/terence-soule-1218b416/',
  'Jennie Tafoya': 'https://www.linkedin.com/in/jennie-tafoya/',
  'Anmol Singh': 'https://www.linkedin.com/in/anmol-s-288078172/',
  'Dr. Terence Soule': 'https://www.linkedin.com/in/terence-soule/',
  // Add more author profiles here as needed
  // Format: 'Author Name': 'URL' (leave empty string if no URL available)
}

function CollapsibleAbstract({ abstract }: { abstract: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Determine if we need to truncate (roughly 2 lines = ~120 characters)
  const shouldTruncate = abstract.length > 120
  const displayText = shouldTruncate && !isExpanded 
    ? abstract.substring(0, 120) + '...'
    : abstract

  // Split text into paragraphs and render each as a separate <p> tag
  const renderText = (text: string) => {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0)
    
    if (paragraphs.length <= 1) {
      // Single paragraph - render as before
      return (
        <p className="text-white/70 leading-relaxed">
          {text}
        </p>
      )
    } else {
      // Multiple paragraphs - render each separately
      return (
        <div className="space-y-3">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-white/70 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      )
    }
  }

  return (
    <div>
      {renderText(displayText)}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-300 text-sm mt-2 transition-colors duration-200 flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <span>Show less</span>
              <span className="text-xs">↑</span>
            </>
          ) : (
            <>
              <span>Show more</span>
              <span className="text-xs">↓</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}

// Component to render author names with optional links
function AuthorsList({ authors }: { authors: string }) {
  const authorArray = authors.split(',').map(author => author.trim())
  
  return (
    <p className="text-white/90 font-medium">
      {authorArray.map((author, index) => {
        const profileUrl = authorProfiles[author]
        const isLastAuthor = index === authorArray.length - 1
        const isSecondToLast = index === authorArray.length - 2
        
        return (
          <span key={index}>
            {profileUrl ? (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors underline decoration-dotted underline-offset-4"
              >
                {author}
              </a>
            ) : (
              <span>{author}</span>
            )}
            {!isLastAuthor && (isSecondToLast ? ', and ' : ', ')}
          </span>
        )
      })}
    </p>
  )
}

export function Publications({ className = '' }: PublicationsProps) {
  const publications: Publication[] = [
    {
      title: "Deceptive Algorithms in Video Games: A Systematic Literature Review",
      authors: "Jason Starace, Jennie Tafoya, Anmol Singh, Terence Soule Ph.D.",
      venue: "",
      journal: "Entertainment Computing",
      year: "2025",
      type: "journal",
      status: "under-review",
      abstract: "This systematic literature review examines the evolving landscape of deception in video games and artificial intelligence (AI). The integration of deceptive strategies in AI, particularly within gaming environments, represents a growing area of interest with significant implications for both gameplay and broader applications, such as cybersecurity. Through a systematic review of 97 papers, 79 were excluded after introduction analysis revealed focus on deception outside gaming contexts (e.g., advertising, propaganda, movement detection), leaving 18 papers directly applicable to game-based deception. Of these 18, 61% provided formal or contextual definitions while 39% relied on assumed understanding. The review categorizes the current body of research into three primary areas: definitions of deception, methods for implementing and mitigating deception, and the frameworks used to analyze these strategies. The review highlights the diversity in the conceptualization of deception, ranging from formal definitions grounded in game theory, to more context-specific operational definitions. Key models such as signaling games (information asymmetry scenarios), Stackelberg games (leader-follower dynamics), and hypergames (perception-based interactions) are explored alongside AI-driven approaches like reinforcement learning (trial-and-error learning) and generative neural networks, which simulate and detect deception in complex environments. The review identifies significant gaps in the standardization of definitions and the practical implementation of deceptive strategies, calling for further interdisciplinary research to address these challenges. The ethical implications of deploying deceptive AI systems are discussed, emphasizing the need for comprehensive frameworks that balance innovation with responsible usage. Future research must prioritize the standardized definitions and interdisciplinary collaboration across ethics, law, and social sciences to address the expanding applications and ethical implications of deceptive AI technologies."
    },
    {
      title: "A Systematic Evaluation of Multi-modal Approaches to Complex Player Profile Classification",
      authors: "Jason Starace, Terence Soule Ph.D.",
      venue: "",
      year: "2025",
      type: "preprint",
      status: "in-preparation",
      abstract: `Modern adaptive games require nuanced player understanding for personalization, yet current modeling approaches use simplified 5-10 category taxonomies that inadequately capture player diversity. Existing behavioral clustering cannot distinguish players with different motivations who exhibit similar actions. We present a systematic evaluation of multi-modal classification at realistic scales, examining how behavioral telemetry combined with semantic context performs when supporting 36 distinct player profiles.

Using 19,413 gameplay sessions from an AI-controlled text-based Role Playing Game (RPG), we compared behavioral-only baselines against multi-modal approaches integrating action sequences with semantic descriptions. Traditional behavioral clustering achieved only 10% accuracy for 36-category classification, limited by semantic conflation where morally opposite actions produce identical statistical features. Our multi-modal LSTM architecture processing complete action-text pairs improved accuracy to 21%, revealing both the potential and limitations of non-conversational data.

Analysis by behavioral complexity revealed the core limitation: non-neutral profiles achieved 42% accuracy (15× above random baseline), matching established benchmarks, while neutral profiles&apos; performance dropped to 25% (still 9× above random). This performance gap exposes why behavioral-only approaches fail—identical actions like &lsquo;help the merchant&rsquo; cannot reveal whether players are genuinely neutral or employing strategic patience (players who appear neutral while waiting for advantageous moments to act). Without access to player reasoning, even multi-modal approaches struggle with this distinction, though the above-baseline performance confirms that a meaningful signal exists.

With game-based prediction beyond 20 categories being virtually unexplored these findings establish empirical benchmarks for complex player modeling: behavioral data plateaus at ~10% for 36 categories, while multi-modal integration enables 25% accuracy. For game designers, this provides concrete evidence that meaningful personality-based adaptation requires conversational interaction—our results demonstrate that predefined action choices alone cannot reliably capture player intent. Our systematic evaluation at a 36-category scale offers essential guidance for developing adaptive games that truly understand their players.`

    },    
    {
      title: "Modeling Player Types with LLMs: A Framework for Belief- and Motivation-Driven NPC Behavior",
      authors: "Jason Starace, Terence Soule Ph.D.",
      venue: "Joint Conference on Serious Games 2025",
      journal: "Serious Games: 11th Joint International Conference",
      year: "2025",
      type: "conference",
      status: "accepted",
      abstract: "This paper explores the potential for large language models (LLMs), specifically ChatGPT-4o, to engage in role-playing games (RPGs) by making decisions based on predefined belief systems and motivations. Using a text-based dungeon crawler environment, the LLM was assigned structured character profiles incorporating alignments from Dungeons & Dragons and motivations — wealth, wanderlust, speed, or safety—to guide decision-making. This approach supports player modeling by enabling the creation of non-player characters (NPCs) that reflect diverse player types, facilitating personalized, adaptive serious games. We also introduce a system for evaluating an LLM’s effectiveness in character generation, offering a structured framework for assessing its ability to maintain consistent, motivation-driven behavior. LLMs demonstrated improved decision-making accuracy ranging from 75% to 93% under the structured framework. The lowest performance appeared in chaotic and evil profiles—behavioral patterns often attenuated during pretraining—while the highest accuracy was found in lawful and neutral profiles oriented toward safety. These findings highlight the potential for LLMs to enhance game design through richer NPC interactions and more dynamic, player-adaptive experiences."
    },
    {
      title: "Deceptive Algorithms in Massive Multiplayer Online Role Playing Games (MMOs)",
      authors: "Jason Starace, Anmol Singh, Terence Soule Ph.D.",
      venue: "Joint Conference on Serious Games 2024",
      journal: "Serious Games: 10th Joint International Conference",
      year: "2024",
      type: "conference",
      status: "published",
      doi: "10.1007/978-3-031-74138-8_32",
      abstract: "This paper proposes using a text-based dungeon crawler adventure as a case study to explore the methods to implement deception in video games. The study proposes a framework for integrating deception into gameplay, leveraging the alignment system from Dungeons and Dragons to define character behavior and motivation. The proposed approach would create an environment that allows researchers to observe AI-controlled characters in a dynamically generated environment that leverages LLMs. The framework is designed to address the issue of monotony in current games by training a deceptive agent, or villain, to recognize and exploit player beliefs and intentions. This adds complexity and depth to the gaming experience, making it more engaging and dynamic. Future research directions include integrating human players into the game environment and transitioning to 3-D gaming platforms, potentially leading to more immersive experiences, particularly in massive multiplayer online role-playing games (MMORPGs). By exploring the intersection of AI, deception, and gaming, this paper contributes to the evolving interactive entertainment landscape, paving the way for more sophisticated and captivating game experiences."
    },
  ]

  // Dynamic metrics calculation
  const calculateMetrics = () => {
    // Publication counts by status
    const published = publications.filter(p => p.status === 'published').length
    const accepted = publications.filter(p => p.status === 'accepted').length
    const underReview = publications.filter(p => p.status === 'under-review').length
    const inPreparation = publications.filter(p => p.status === 'in-preparation').length
    const totalPubs = published + accepted + underReview + inPreparation

    // Research areas (unique types and focus areas)
    const researchAreas = new Set([
      'Deceptive AI', 'Player Modeling', 'AI Ethics', 
      'Game Theory', 'Interactive Systems', 'LLM Behavior'
    ]).size

    // Collaborators (unique co-authors excluding yourself)
    const allAuthors = publications.flatMap(pub => 
      pub.authors.split(',').map(author => author.trim())
    )
    const uniqueCollaborators = new Set(allAuthors.filter(author => 
      !author.toLowerCase().includes('jason starace')
    )).size

    // Venues (conferences and journals)
    const uniqueVenues = new Set(
      publications.map(pub => pub.journal || pub.venue).filter(Boolean)
    ).size

    return {
      totalPubs,
      published,
      accepted,
      underReview,
      researchAreas,
      collaborators: uniqueCollaborators,
      venues: uniqueVenues
    }
  }

  const metrics = calculateMetrics()

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'accepted': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'under-review': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'in-preparation': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal': return '📰'
      case 'conference': return '🎤'
      case 'workshop': return '🔬'
      case 'preprint': return '📄'
      default: return '📄'
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
        <h2 className="text-3xl font-bold text-white mb-4">Research Publications</h2>
        <p className="text-white/80 leading-relaxed">
          My research publications document the development of strategically intelligent AI systems 
          capable of sophisticated reasoning and adaptive behavior. This work contributes to both 
          the technical advancement of goal-oriented AI and the critical understanding of ethical 
          considerations in AI system design.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-white/70 text-sm">Published</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-white/70 text-sm">Accepted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-white/70 text-sm">Under Review</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span className="text-white/70 text-sm">In Preparation</span>
          </div>
        </div>
      </LiquidGlass>

      {/* Publications List */}
      <div className="space-y-6">
        {publications.map((pub, index) => (
          <LiquidGlass
            key={index}
            variant="card"
            intensity="medium"
            className="p-6 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex flex-col space-y-4">
              {/* Header with status and type */}
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(pub.type)}</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    {pub.status && (
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(pub.status)}`}>
                        {pub.status.replace('-', ' ').toUpperCase()}
                      </span>
                    )}
                    <span className="text-white/60 text-sm capitalize">{pub.type}</span>
                  </div>
                </div>
                <span className="text-blue-400 font-semibold">{pub.year}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-tight">
                {pub.title}
              </h3>

              {/* Authors */}
              <AuthorsList authors={pub.authors} />

              {/* Venue and Journal */}
              <div className="space-y-1">
                <p className="text-blue-300 italic">
                  {pub.venue}
                </p>
                {pub.journal && (
                  <p className="text-green-300 text-sm font-medium">
                    Journal: {pub.journal}
                  </p>
                )}
              </div>

              {/* Abstract */}
              <CollapsibleAbstract abstract={pub.abstract} />

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-2">
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                  >
                    DOI
                  </a>
                )}
                {pub.arxiv && (
                  <a
                    href={`https://arxiv.org/abs/${pub.arxiv}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-sm hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                  >
                    arXiv
                  </a>
                )}
                {pub.status === 'in-preparation' && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-500/30">
                    Draft Available Upon Request
                  </span>
                )}
              </div>
            </div>
          </LiquidGlass>
        ))}
      </div>

      {/* Research Impact */}
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-6"
      >
        <h3 className="text-2xl font-semibold text-white mb-4">Research Impact & Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{metrics.totalPubs}</div>
            <div className="text-white/70">Total Publications</div>
            <div className="text-xs text-white/50 mt-1">
              {metrics.published} published • {metrics.underReview} under review
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{metrics.researchAreas}</div>
            <div className="text-white/70">Research Areas</div>
            <div className="text-xs text-white/50 mt-1">
              AI, Gaming, Ethics
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{metrics.collaborators}</div>
            <div className="text-white/70">Collaborators</div>
            <div className="text-xs text-white/50 mt-1">
              Co-authors & advisors
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">{metrics.venues}</div>
            <div className="text-white/70">Venues</div>
            <div className="text-xs text-white/50 mt-1">
              Conferences & journals
            </div>
          </div>
        </div>
      </LiquidGlass>

      {/* Call to Action */}
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-3">Collaboration Opportunities</h3>
        <p className="text-white/80 mb-4">
          Interested in collaborating on strategic AI research or discussing potential publications? 
          I&apos;m always open to working with fellow researchers in AI ethics, strategic behavior, and 
          interactive systems.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
            Strategic AI
          </span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
            AI Ethics
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
            Interactive Systems
          </span>
          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
            Deceptive Algorithms
          </span>
        </div>
      </LiquidGlass>
    </div>
  )
}