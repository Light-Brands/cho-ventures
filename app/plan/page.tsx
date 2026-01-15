'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  masterPlanMeta,
  executiveSummary,
  entityProfiles,
  unifiedStory,
  currentStatePainPoints,
  integrationChallenges,
  hiddenPotential,
  coreCapabilities,
  centralHubLayers,
  techStackRecommendations,
  aiPriorities,
  authorityFlywheel,
  bookLaunchStrategy,
  speakingMediaEngine,
  threePhases,
  entityStrategies,
  successMetrics,
  planSections,
} from '@/lib/master-plan-data';

const categoryColors = {
  hub: { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400', glow: 'shadow-purple-500/30' },
  'real-estate': { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', glow: 'shadow-blue-500/30' },
  regenerative: { bg: 'bg-teal-500/20', border: 'border-teal-500/50', text: 'text-teal-400', glow: 'shadow-teal-500/30' },
  authority: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400', glow: 'shadow-cyan-500/30' },
  philanthropy: { bg: 'bg-indigo-500/20', border: 'border-indigo-500/50', text: 'text-indigo-400', glow: 'shadow-indigo-500/30' },
};

const sectionIcons: Record<string, JSX.Element> = {
  sparkles: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  network: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  rocket: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  hub: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  brain: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  crown: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
    </svg>
  ),
  layers: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  ),
  building: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  target: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
};

export default function MasterPlanPage() {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div data-plan-page className="min-h-screen bg-[#080B14] text-white overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080B14]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/v2" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Back to Ecosystem</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:block">Source:</span>
            <a
              href={masterPlanMeta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              Brand Factory
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Side Navigation */}
      <nav className="fixed left-0 top-20 bottom-0 w-64 bg-[#0D1117]/50 backdrop-blur-xl border-r border-white/5 overflow-y-auto hidden lg:block z-40">
        <div className="p-4 space-y-1">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">Contents</div>
          {planSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeSection === section.id
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={activeSection === section.id ? 'text-purple-400' : 'text-gray-500'}>
                {sectionIcons[section.icon]}
              </span>
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs mb-6">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Strategic Master Plan
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              {masterPlanMeta.title}
            </h1>
            <p className="text-xl text-gray-400 italic">
              {masterPlanMeta.subtitle}
            </p>
          </motion.div>

          {/* Executive Summary */}
          <section id="executive-summary" className="mb-20 scroll-mt-24">
            <SectionHeader icon="sparkles" title="Executive Summary" />

            {/* The Opportunity */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">{executiveSummary.opportunity.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{executiveSummary.opportunity.intro}</p>
              <div className="text-lg font-medium text-white mb-4">The opportunity is threefold:</div>
              <div className="grid gap-4">
                {executiveSummary.opportunity.points.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-purple-400">{point.label}</span>
                      <span className="text-gray-400"> — {point.description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* The Stakes */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">{executiveSummary.stakes.title}</h3>
              <p className="text-gray-400 mb-4">{executiveSummary.stakes.intro}</p>
              <ul className="space-y-2 mb-6">
                {executiveSummary.stakes.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-yellow-500 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20">
                <div className="text-sm text-green-400 font-medium mb-3">Organizations that integrate AI now will:</div>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {executiveSummary.stakes.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The Solution */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">{executiveSummary.solution.title}</h3>
              <p className="text-gray-400 mb-6">{executiveSummary.solution.description}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {executiveSummary.solution.layers.map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-xl bg-[#161B22] border border-white/10 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="text-sm font-semibold text-purple-400 mb-2">{layer.name}</div>
                    <ul className="space-y-1">
                      {layer.items.map((item, j) => (
                        <li key={j} className="text-xs text-gray-400 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* The Ecosystem */}
          <section id="ecosystem" className="mb-20 scroll-mt-24">
            <SectionHeader icon="network" title="The Cho Ventures Ecosystem" />

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Entity Profiles</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Entity</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Core Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entityProfiles.map((entity, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-medium text-white">{entity.entity}</td>
                        <td className="py-3 px-4 text-gray-400">{entity.type}</td>
                        <td className="py-3 px-4 text-gray-400">{entity.location}</td>
                        <td className="py-3 px-4 text-gray-400">{entity.function}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">The Unified Story</h3>
              <p className="text-gray-300 mb-4">{unifiedStory.mission}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {unifiedStory.entities.map((entity, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-purple-400 font-medium">{entity.name}</span>
                    <span className="text-gray-500">{entity.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Current State */}
          <section id="current-state" className="mb-20 scroll-mt-24">
            <SectionHeader icon="chart" title="Current State Assessment" />

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">Likely Pain Points</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentStatePainPoints.map((pain, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-xl bg-red-500/5 border border-red-500/20"
                  >
                    <div className="text-sm font-semibold text-red-400 mb-3">{pain.category}</div>
                    <ul className="space-y-1">
                      {pain.issues.map((issue, j) => (
                        <li key={j} className="text-xs text-gray-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">Integration Challenges</h3>
              <div className="space-y-3">
                {integrationChallenges.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#161B22] border border-white/10 grid sm:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Challenge</div>
                      <div className="text-sm font-medium text-white">{item.challenge}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Impact</div>
                      <div className="text-sm text-red-400">{item.impact}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Current State</div>
                      <div className="text-sm text-gray-400">{item.state}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">The Hidden Potential</h3>
              <p className="text-gray-300 mb-4">{hiddenPotential.intro}</p>
              <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                {hiddenPotential.potentials.map((p, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="text-yellow-400 font-medium text-sm">{hiddenPotential.conclusion}</p>
            </div>
          </section>

          {/* Transformation Vision */}
          <section id="transformation" className="mb-20 scroll-mt-24">
            <SectionHeader icon="rocket" title="The Transformation Vision" />

            <h3 className="text-xl font-semibold text-white mb-6">Core Capabilities</h3>
            <div className="space-y-4">
              {coreCapabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-[#161B22] border border-white/10 hover:border-green-500/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex-1">
                      <div className="font-semibold text-white">{cap.capability}</div>
                      <div className="text-sm text-gray-400">{cap.description}</div>
                    </div>
                    <div className="sm:text-right">
                      <div className="text-xs text-gray-500 mb-1">Impact</div>
                      <div className="text-sm text-green-400">{cap.impact}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Central Hub */}
          <section id="central-hub" className="mb-20 scroll-mt-24">
            <SectionHeader icon="hub" title="Central Hub Architecture" />

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-6">The Command Center</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {centralHubLayers.map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-5 rounded-xl bg-gradient-to-br from-[#161B22] to-[#0D1117] border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        {sectionIcons.hub}
                      </div>
                      <div className="font-semibold text-white">{layer.name}</div>
                    </div>
                    <ul className="space-y-2">
                      {layer.components.map((comp, j) => (
                        <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                          {comp}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technology Stack Recommendations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Layer</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Recommended Tools</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {techStackRecommendations.map((tech, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-medium text-white">{tech.layer}</td>
                        <td className="py-3 px-4 text-cyan-400">{tech.tools}</td>
                        <td className="py-3 px-4 text-gray-400">{tech.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* AI Integration */}
          <section id="ai-integration" className="mb-20 scroll-mt-24">
            <SectionHeader icon="brain" title="AI Integration Map" />

            <h3 className="text-xl font-semibold text-white mb-6">Priority AI Implementations</h3>
            <div className="space-y-6">
              {aiPriorities.map((priority, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 via-[#161B22] to-[#161B22] border border-cyan-500/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">
                      {priority.priority}
                    </span>
                    <h4 className="text-lg font-semibold text-white">{priority.title}</h4>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-red-400 font-medium mb-1">Problem</div>
                      <div className="text-sm text-gray-400">{priority.problem}</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-400 font-medium mb-1">Solution</div>
                      <div className="text-sm text-gray-400">{priority.solution}</div>
                    </div>
                    <div>
                      <div className="text-xs text-cyan-400 font-medium mb-1">Example</div>
                      <div className="text-sm text-gray-400">{priority.example}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Authority Platform */}
          <section id="authority" className="mb-20 scroll-mt-24">
            <SectionHeader icon="crown" title="Authority Platform Strategy" />

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-6">The Authority Flywheel</h3>
              <div className="flex flex-wrap items-center justify-center gap-2 p-6 rounded-xl bg-[#161B22] border border-white/10">
                {authorityFlywheel.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-sm font-medium">
                      {item.step}
                    </span>
                    {i < authorityFlywheel.length - 1 && (
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Book Launch Strategy</h3>
                <div className="space-y-3">
                  {bookLaunchStrategy.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#161B22] border border-white/10">
                      <div className="font-medium text-white mb-1">{item.component}</div>
                      <div className="text-sm text-gray-400">{item.aiRole}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Speaking & Media Engine</h3>
                <div className="space-y-3">
                  {speakingMediaEngine.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#161B22] border border-white/10">
                      <div className="font-medium text-white mb-1">{item.component}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Three Phases */}
          <section id="phases" className="mb-20 scroll-mt-24">
            <SectionHeader icon="layers" title="Three-Phase Framework" />

            <div className="space-y-8">
              {threePhases.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-gradient-to-br from-[#161B22] to-[#0D1117] border border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                      {phase.phase}
                    </span>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{phase.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Duration: {phase.duration}</span>
                        <span className="text-purple-400">Deliverable: {phase.deliverable}</span>
                      </div>
                    </div>
                  </div>

                  {phase.sessions && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-300 mb-3">Discovery Sessions</div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {phase.sessions.map((session, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm">
                            <span className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs flex-shrink-0">
                              {session.session}
                            </span>
                            <div>
                              <div className="text-gray-300">{session.focus}</div>
                              <div className="text-xs text-gray-500">{session.participants}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.deliverables && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-300 mb-3">Deliverables</div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((d, j) => (
                          <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                            </svg>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.components && (
                    <div>
                      <div className="text-sm font-medium text-gray-300 mb-3">Components</div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.components.map((comp, j) => (
                          <div key={j} className="p-3 rounded-lg bg-white/5 border border-white/5">
                            <div className="font-medium text-white text-sm">{comp.component}</div>
                            <div className="text-xs text-gray-400">{comp.description}</div>
                            {'dependencies' in comp && (
                              <div className="text-xs text-purple-400 mt-1">Depends on: {comp.dependencies}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Entity Strategies */}
          <section id="entity-strategies" className="mb-20 scroll-mt-24">
            <SectionHeader icon="building" title="Entity-Specific AI Strategies" />

            <div className="space-y-6">
              {entityStrategies.map((entity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-[#161B22] border border-white/10"
                >
                  <h4 className="text-lg font-semibold text-white mb-4">{entity.entity}</h4>

                  {entity.flow && (
                    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-lg bg-white/5">
                      {entity.flow.map((step, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 text-xs">
                            {step}
                          </span>
                          {j < entity.flow.length - 1 && (
                            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3">
                    {entity.applications.map((app, j) => (
                      <div key={j} className="p-3 rounded-lg bg-white/5">
                        <div className="font-medium text-cyan-400 text-sm">{app.application}</div>
                        <div className="text-xs text-gray-400">{app.description}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Success Metrics */}
          <section id="metrics" className="mb-20 scroll-mt-24">
            <SectionHeader icon="target" title="Success Metrics" />

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Ecosystem Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Metric</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Current</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {successMetrics.ecosystem.map((m, i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-3 px-4 text-white">{m.metric}</td>
                          <td className="py-3 px-4 text-red-400">{m.current}</td>
                          <td className="py-3 px-4 text-green-400">{m.target}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Authority Metrics</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {successMetrics.authority.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                      <div className="text-2xl font-bold text-purple-400 mb-1">{m.target}</div>
                      <div className="text-sm text-gray-400">{m.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Entity Key Metrics</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {successMetrics.entity.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#161B22] border border-white/10">
                      <div className="text-sm font-medium text-white mb-1">{m.entity}</div>
                      <div className="text-xs text-cyan-400">{m.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Impact Metrics</h3>
                <div className="space-y-3">
                  {successMetrics.impact.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20">
                      <div className="font-medium text-green-400">{m.metric}</div>
                      <div className="text-sm text-gray-400">{m.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 via-[#161B22] to-blue-500/20 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Transform?</h3>
            <p className="text-gray-400 mb-6">
              Cho Ventures AI — Regenerative impact, amplified by intelligence
            </p>
            <Link
              href="/v2"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Explore the Ecosystem
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-purple-400">
        {sectionIcons[icon]}
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
  );
}
