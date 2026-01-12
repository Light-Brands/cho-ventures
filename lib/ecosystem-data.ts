export type EntityCategory = 'hub' | 'real-estate' | 'regenerative' | 'authority' | 'philanthropy';
export type EntityStatus = 'active' | 'planned' | 'foundation';

export interface Entity {
  id: string;
  name: string;
  shortName: string;
  category: EntityCategory;
  status: EntityStatus;
  tagline: string;
  description: string;
  location?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  aiApplications?: string[];
  connections: string[];
  icon: string;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  type: 'primary' | 'secondary' | 'data-flow';
  label?: string;
  bidirectional: boolean;
}

export const entities: Entity[] = [
  {
    id: 'cho-ventures',
    name: 'Cho Ventures',
    shortName: 'CHO',
    category: 'hub',
    status: 'active',
    tagline: 'AI-Powered Command Center',
    description: 'The central nervous system connecting all Cho Ventures entities. A unified CRM, AI orchestration, content engine, and analytics dashboard that enables seamless cross-entity experiences and operational efficiency.',
    location: 'Miami, FL',
    metrics: [
      { label: 'Entities Connected', value: '10+' },
      { label: 'Cross-Entity Intelligence', value: 'Real-time' },
      { label: 'Community Members', value: '10,000+' },
      { label: 'AI Automations', value: '50+' },
    ],
    aiApplications: [
      'Unified CRM with cross-entity intelligence',
      'AI-powered lead routing and scoring',
      'Automated content generation',
      'Real-time analytics dashboard',
      'Cross-entity referral engine',
    ],
    connections: ['metro-1', 'future-of-cities', 'phx-jax', 'climate-hub', 'chozen-retreat', 'chozen-community', 'book-platform', 'course-platform', 'speaking-media', 'cho-foundation', 'm1-fund'],
    icon: 'hub',
  },
  {
    id: 'metro-1',
    name: 'Metro 1 Commercial',
    shortName: 'M1',
    category: 'real-estate',
    status: 'active',
    tagline: 'Miami\'s Premier Commercial Brokerage',
    description: 'A leading commercial real estate brokerage pioneering regenerative development in Miami\'s urban core. Known for transformative work in Wynwood and beyond.',
    location: 'Miami, FL',
    metrics: [
      { label: 'Transactions', value: '$4B+' },
      { label: 'Experience', value: '25+ Years' },
      { label: 'Team', value: '30+ Agents' },
      { label: 'Markets', value: 'South Florida' },
    ],
    aiApplications: [
      'Lead qualification and scoring',
      'Property-to-client matching',
      'Market intelligence monitoring',
      'Automated follow-up sequences',
      'Cross-entity client referrals',
    ],
    connections: ['cho-ventures', 'future-of-cities', 'climate-hub'],
    icon: 'building',
  },
  {
    id: 'future-of-cities',
    name: 'Future of Cities',
    shortName: 'FoC',
    category: 'real-estate',
    status: 'active',
    tagline: 'ESG Development Consortium',
    description: 'A development consortium focused on creating regenerative, ESG-compliant developments that demonstrate how real estate can serve people, planet, and profit.',
    location: 'Multi-City',
    metrics: [
      { label: 'Projects', value: '12+' },
      { label: 'Focus', value: 'ESG Development' },
      { label: 'Impact', value: 'Regenerative' },
      { label: 'Expansion', value: 'National' },
    ],
    aiApplications: [
      'ESG trend analysis and monitoring',
      'Stakeholder communication automation',
      'Sustainability impact reporting',
      'Investor relations personalization',
      'Policy monitoring and alerts',
    ],
    connections: ['cho-ventures', 'metro-1', 'phx-jax', 'climate-hub'],
    icon: 'city',
  },
  {
    id: 'phx-jax',
    name: 'PHX-JAX District',
    shortName: 'PHX',
    category: 'real-estate',
    status: 'active',
    tagline: 'Arts & Innovation Campus',
    description: 'An 8.5-acre mixed-use development in Jacksonville creating a vibrant arts, innovation, and creative workspace campus that brings community together.',
    location: 'Jacksonville, FL',
    metrics: [
      { label: 'Campus Size', value: '8.5 Acres' },
      { label: 'Focus', value: 'Arts & Innovation' },
      { label: 'Type', value: 'Mixed-Use' },
      { label: 'Community', value: 'Growing' },
    ],
    aiApplications: [
      'Tenant prospecting and matching',
      'Event marketing automation',
      'Community building facilitation',
      'Space optimization analytics',
      'Predictive maintenance',
    ],
    connections: ['cho-ventures', 'future-of-cities'],
    icon: 'warehouse',
  },
  {
    id: 'climate-hub',
    name: 'Climate + Innovation HUB',
    shortName: 'HUB',
    category: 'real-estate',
    status: 'active',
    tagline: 'Miami Climate Tech Incubator',
    description: 'An innovation center in Little Haiti focused on climate tech incubation, startup acceleration, and programming that addresses environmental challenges.',
    location: 'Miami (Little Haiti)',
    metrics: [
      { label: 'Focus', value: 'Climate Tech' },
      { label: 'Startups', value: '50+' },
      { label: 'Programs', value: 'Incubation' },
      { label: 'Impact', value: 'Global' },
    ],
    aiApplications: [
      'Startup screening and evaluation',
      'Mentor-startup matching',
      'Investor matching algorithms',
      'Program personalization',
      'Impact measurement tracking',
    ],
    connections: ['cho-ventures', 'metro-1', 'future-of-cities', 'cho-foundation'],
    icon: 'leaf',
  },
  {
    id: 'chozen-retreat',
    name: 'ChoZen Retreat',
    shortName: 'CZR',
    category: 'regenerative',
    status: 'active',
    tagline: 'Regenerative Wellness Sanctuary',
    description: 'A 40-acre wellness retreat and eco-tourism destination in Sebastian, FL. A living laboratory for regenerative living and Blue Zone principles.',
    location: 'Sebastian, FL',
    metrics: [
      { label: 'Property', value: '40 Acres' },
      { label: 'Experience', value: 'Wellness' },
      { label: 'Model', value: 'Blue Zone' },
      { label: 'Impact', value: 'Transformative' },
    ],
    aiApplications: [
      'Booking optimization and pricing',
      'Guest experience personalization',
      'Post-visit nurture sequences',
      'Event targeting and promotion',
      'Demand forecasting',
    ],
    connections: ['cho-ventures', 'chozen-community', 'book-platform', 'course-platform'],
    icon: 'sun',
  },
  {
    id: 'chozen-community',
    name: 'ChoZen Community',
    shortName: 'CZC',
    category: 'regenerative',
    status: 'planned',
    tagline: 'Member Engagement Platform',
    description: 'A dedicated community app connecting ChoZen members, retreat guests, and regenerative living practitioners in a vibrant digital ecosystem.',
    location: 'Digital',
    metrics: [
      { label: 'Target', value: '10,000+ Members' },
      { label: 'Features', value: 'Full Platform' },
      { label: 'Engagement', value: 'AI-Powered' },
      { label: 'Launch', value: 'Coming Soon' },
    ],
    aiApplications: [
      'Personalized content feeds',
      'Member-to-member matching',
      'Event recommendations',
      'Learning path curation',
      'Community health monitoring',
    ],
    connections: ['cho-ventures', 'chozen-retreat', 'course-platform'],
    icon: 'users',
  },
  {
    id: 'book-platform',
    name: 'Tony\'s Book',
    shortName: 'BOOK',
    category: 'authority',
    status: 'planned',
    tagline: 'Regenerative Living Philosophy',
    description: 'Tony Cho\'s upcoming book codifying his philosophy of regenerative living, placemaking, and building communities that thrive.',
    location: 'Publishing',
    metrics: [
      { label: 'Topic', value: 'Regenerative Living' },
      { label: 'Audience', value: 'Global' },
      { label: 'Format', value: 'Multi-Platform' },
      { label: 'Launch', value: 'Coming Soon' },
    ],
    aiApplications: [
      'Pre-launch list building',
      'Launch sequence automation',
      'AI book companion chatbot',
      'Reader-to-student conversion',
      'Review generation and monitoring',
    ],
    connections: ['cho-ventures', 'course-platform', 'speaking-media', 'chozen-retreat'],
    icon: 'book',
  },
  {
    id: 'course-platform',
    name: 'Online Course',
    shortName: 'COURSE',
    category: 'authority',
    status: 'planned',
    tagline: 'Learn Regenerative Principles',
    description: 'An online learning platform teaching regenerative development principles, with certification paths and direct connections to the ChoZen ecosystem.',
    location: 'Digital',
    metrics: [
      { label: 'Format', value: 'Online Learning' },
      { label: 'Goal', value: '1,000+ Students' },
      { label: 'Certification', value: 'Available' },
      { label: 'Integration', value: 'Full Ecosystem' },
    ],
    aiApplications: [
      'Personalized learning paths',
      'AI course companion',
      'Progress tracking and nudges',
      'Certification management',
      'Alumni engagement',
    ],
    connections: ['cho-ventures', 'book-platform', 'chozen-community', 'chozen-retreat'],
    icon: 'graduation',
  },
  {
    id: 'speaking-media',
    name: 'Speaking & Media',
    shortName: 'SPEAK',
    category: 'authority',
    status: 'active',
    tagline: 'Thought Leadership Engine',
    description: 'Tony\'s speaking engagements, podcast appearances, and media presence amplifying the regenerative development message globally.',
    location: 'Global',
    metrics: [
      { label: 'Engagements', value: '24+/Year' },
      { label: 'Podcasts', value: '50+/Year' },
      { label: 'Reach', value: 'Global' },
      { label: 'Topics', value: 'Regenerative' },
    ],
    aiApplications: [
      'Speaking kit generation',
      'Podcast prep and research',
      'Media follow-up automation',
      'Content repurposing',
      'Opportunity identification',
    ],
    connections: ['cho-ventures', 'book-platform'],
    icon: 'mic',
  },
  {
    id: 'cho-foundation',
    name: 'Cho Family Foundation',
    shortName: 'CFF',
    category: 'philanthropy',
    status: 'active',
    tagline: 'Environmental & Cultural Impact',
    description: 'A 501(c)(3) foundation supporting environmental conservation, wildlife protection, and indigenous culture preservation.',
    location: 'Miami, FL',
    metrics: [
      { label: 'Type', value: '501(c)(3)' },
      { label: 'Focus', value: 'Environment & Culture' },
      { label: 'Programs', value: 'Multiple' },
      { label: 'Impact', value: 'Growing' },
    ],
    aiApplications: [
      'Donor scoring and cultivation',
      'Grant application screening',
      'Impact story generation',
      'Donor communication personalization',
      'Program-donor matching',
    ],
    connections: ['cho-ventures', 'm1-fund', 'climate-hub'],
    icon: 'heart',
  },
  {
    id: 'm1-fund',
    name: 'M1 Community Fund',
    shortName: 'M1F',
    category: 'philanthropy',
    status: 'active',
    tagline: 'Community Relief & Support',
    description: 'A donor-advised fund providing community relief, small business support, and local impact in underserved Miami neighborhoods.',
    location: 'Miami, FL',
    metrics: [
      { label: 'Type', value: 'Donor-Advised Fund' },
      { label: 'Focus', value: 'Community Relief' },
      { label: 'Support', value: 'Small Business' },
      { label: 'Area', value: 'Local Miami' },
    ],
    aiApplications: [
      'Grant tracking and management',
      'Impact reporting automation',
      'Donor management',
      'Community needs analysis',
      'Success story generation',
    ],
    connections: ['cho-ventures', 'cho-foundation'],
    icon: 'handshake',
  },
];

export const connections: Connection[] = [
  // Hub connections (primary)
  { id: 'hub-m1', source: 'cho-ventures', target: 'metro-1', type: 'primary', bidirectional: true },
  { id: 'hub-foc', source: 'cho-ventures', target: 'future-of-cities', type: 'primary', bidirectional: true },
  { id: 'hub-phx', source: 'cho-ventures', target: 'phx-jax', type: 'primary', bidirectional: true },
  { id: 'hub-climate', source: 'cho-ventures', target: 'climate-hub', type: 'primary', bidirectional: true },
  { id: 'hub-retreat', source: 'cho-ventures', target: 'chozen-retreat', type: 'primary', bidirectional: true },
  { id: 'hub-community', source: 'cho-ventures', target: 'chozen-community', type: 'primary', bidirectional: true },
  { id: 'hub-book', source: 'cho-ventures', target: 'book-platform', type: 'primary', bidirectional: true },
  { id: 'hub-course', source: 'cho-ventures', target: 'course-platform', type: 'primary', bidirectional: true },
  { id: 'hub-speaking', source: 'cho-ventures', target: 'speaking-media', type: 'primary', bidirectional: true },
  { id: 'hub-foundation', source: 'cho-ventures', target: 'cho-foundation', type: 'primary', bidirectional: true },
  { id: 'hub-m1fund', source: 'cho-ventures', target: 'm1-fund', type: 'primary', bidirectional: true },

  // Real estate cluster
  { id: 'm1-foc', source: 'metro-1', target: 'future-of-cities', type: 'secondary', bidirectional: true },
  { id: 'm1-climate', source: 'metro-1', target: 'climate-hub', type: 'secondary', bidirectional: true },
  { id: 'foc-phx', source: 'future-of-cities', target: 'phx-jax', type: 'secondary', bidirectional: true },
  { id: 'foc-climate', source: 'future-of-cities', target: 'climate-hub', type: 'secondary', bidirectional: true },

  // Regenerative cluster
  { id: 'retreat-community', source: 'chozen-retreat', target: 'chozen-community', type: 'secondary', bidirectional: true },
  { id: 'retreat-course', source: 'chozen-retreat', target: 'course-platform', type: 'secondary', bidirectional: true },

  // Authority cluster
  { id: 'book-course', source: 'book-platform', target: 'course-platform', type: 'secondary', bidirectional: true },
  { id: 'book-speaking', source: 'book-platform', target: 'speaking-media', type: 'secondary', bidirectional: true },
  { id: 'course-community', source: 'course-platform', target: 'chozen-community', type: 'secondary', bidirectional: true },

  // Philanthropy cluster
  { id: 'foundation-m1fund', source: 'cho-foundation', target: 'm1-fund', type: 'secondary', bidirectional: true },
  { id: 'foundation-climate', source: 'cho-foundation', target: 'climate-hub', type: 'secondary', bidirectional: true },

  // Cross-cluster data flows
  { id: 'retreat-book', source: 'chozen-retreat', target: 'book-platform', type: 'data-flow', label: 'Content', bidirectional: false },
];

export const categoryLabels: Record<EntityCategory, string> = {
  'hub': 'Central Hub',
  'real-estate': 'Real Estate & Development',
  'regenerative': 'Regenerative Living',
  'authority': 'Authority Platform',
  'philanthropy': 'Impact & Philanthropy',
};

export const categoryColors: Record<EntityCategory, { bg: string; text: string; border: string; glow: string }> = {
  'hub': { bg: 'bg-hub', text: 'text-hub-light', border: 'border-hub', glow: 'shadow-hub/50' },
  'real-estate': { bg: 'bg-real-estate', text: 'text-real-estate-light', border: 'border-real-estate', glow: 'shadow-real-estate/50' },
  'regenerative': { bg: 'bg-regenerative', text: 'text-regenerative-light', border: 'border-regenerative', glow: 'shadow-regenerative/50' },
  'authority': { bg: 'bg-authority', text: 'text-authority-light', border: 'border-authority', glow: 'shadow-authority/50' },
  'philanthropy': { bg: 'bg-philanthropy', text: 'text-philanthropy-light', border: 'border-philanthropy', glow: 'shadow-philanthropy/50' },
};
