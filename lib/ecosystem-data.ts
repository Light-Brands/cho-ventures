export type EntityCategory = 'conglomerate' | 'real-estate' | 'regenerative' | 'authority' | 'philanthropy' | 'development';
export type EntityStatus = 'active' | 'planned' | 'foundation';
export type EntityType = 'ip-holder' | 'operating' | 'nonprofit' | 'daf' | 'development' | 'family-office' | 'personal-brand';
export type ConglomerateAffiliation = 'cho-ventures' | 'future-of-cities' | 'both';
export type RelationshipRole = 'investor' | 'donor' | 'developer' | 'in-kind-donor' | 'authority' | 'parent';

export interface ConglomerateRole {
  conglomerate: string;
  role: RelationshipRole;
  notes?: string;
}

export interface Entity {
  id: string;
  name: string;
  shortName: string;
  category: EntityCategory;
  status: EntityStatus;
  tagline: string;
  description: string;
  location?: string;
  entityType?: EntityType;
  notes?: string;
  affiliation: ConglomerateAffiliation;
  conglomerateRoles: ConglomerateRole[];
  isConglomerate?: boolean;
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
  type: 'primary' | 'secondary' | 'data-flow' | 'services' | 'platform' | 'ip-licensing' | 'conglomerate-bridge';
  label?: string;
  bidirectional: boolean;
  relationshipRole?: RelationshipRole;
  isAILayerConnection?: boolean;
}

export const entities: Entity[] = [
  {
    id: 'ai-system',
    name: 'AI Superintelligent System',
    shortName: 'AI',
    category: 'conglomerate',
    status: 'active',
    tagline: 'Central Intelligence Orchestrator',
    description: 'The AI superintelligent system that connects and orchestrates the entire Cho ecosystem. Unified CRM, AI orchestration engine, cross-entity intelligence, content automation, and real-time analytics powering every entity.',
    location: 'Cloud',
    isConglomerate: true,
    affiliation: 'both',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'parent', notes: 'Central AI orchestration layer' }],
    metrics: [
      { label: 'Entities Connected', value: '15+' },
      { label: 'Cross-Entity Intelligence', value: 'Real-time' },
      { label: 'AI Automations', value: '50+' },
      { label: 'Data Sync', value: 'Continuous' },
    ],
    aiApplications: [
      'Cross-conglomerate data synchronization',
      'Unified CRM intelligence',
      'AI-powered referral routing',
      'Content and brand consistency',
      'Real-time analytics orchestration',
    ],
    connections: ['cho-ventures', 'future-of-cities'],
    icon: 'hub',
  },
  {
    id: 'cho-ventures',
    name: 'Cho Ventures',
    shortName: 'CHO',
    category: 'conglomerate',
    status: 'active',
    tagline: 'AI-Powered Family Office',
    description: 'The Cho Ventures family office connecting all portfolio entities. A unified CRM, AI orchestration, content engine, and analytics dashboard that enables seamless cross-entity experiences and operational efficiency.',
    location: 'Miami, FL',
    entityType: 'family-office',
    isConglomerate: true,
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'parent', notes: 'Family office and portfolio parent' }],
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
    connections: ['ai-system', 'metro-1', 'phx-jax', 'climate-hub', 'chozen-ccrl', 'chozen-ip', 'book-platform', 'course-platform', 'speaking-media', 'cho-foundation', 'ximena-legacy-fund', 'friends-of-phxjax', 'tony-cho-brand'],
    icon: 'hub',
  },
  {
    id: 'future-of-cities',
    name: 'Future of Cities',
    shortName: 'FoC',
    category: 'conglomerate',
    status: 'active',
    tagline: 'Regenerative Placemaking IP & Development',
    description: 'FoC IP & Assets (NewCo): Regenerative Placemaking Framework, Membership Platform, Book 1: Generation Regeneration, trademark, global development pipeline, strategic partnerships, and demonstration projects (HUB, PHXJAX).',
    location: 'Multi-City',
    entityType: 'development',
    isConglomerate: true,
    affiliation: 'both',
    conglomerateRoles: [
      { conglomerate: 'cho-ventures', role: 'investor', notes: 'CV is investor in FoC' },
      { conglomerate: 'future-of-cities', role: 'parent', notes: 'Parent entity for development projects' },
    ],
    metrics: [
      { label: 'Projects', value: '12+' },
      { label: 'Focus', value: 'Regenerative Placemaking' },
      { label: 'Impact', value: 'Regenerative' },
      { label: 'Expansion', value: 'Global' },
    ],
    aiApplications: [
      'ESG trend analysis and monitoring',
      'Stakeholder communication automation',
      'Sustainability impact reporting',
      'Investor relations personalization',
      'Policy monitoring and alerts',
    ],
    connections: ['ai-system', 'phx-jax', 'climate-hub', 'chozen-ccrl', 'chozen-ip', 'foc-portugal', 'friends-of-phxjax'],
    icon: 'city',
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
    notes: 'Provides commercial brokerage support services to FoC (not investment participation)',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'investor', notes: 'CV portfolio company' }],
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
    connections: ['cho-ventures', 'climate-hub'],
    icon: 'building',
  },
  {
    id: 'phx-jax',
    name: 'PHX-JAX District',
    shortName: 'PHX',
    category: 'real-estate',
    status: 'active',
    tagline: 'Arts & Innovation District',
    description: 'Arts & Innovation District in Jacksonville: real estate investment, commercial + residential leasing, affordable housing, and PHXJAX.com.',
    location: 'Jacksonville, FL',
    affiliation: 'both',
    conglomerateRoles: [
      { conglomerate: 'cho-ventures', role: 'investor', notes: 'CV real estate investment' },
      { conglomerate: 'future-of-cities', role: 'developer', notes: 'FoC demonstration project' },
    ],
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
    connections: ['cho-ventures', 'future-of-cities', 'friends-of-phxjax'],
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
    affiliation: 'both',
    conglomerateRoles: [
      { conglomerate: 'cho-ventures', role: 'investor', notes: 'CV real estate investment' },
      { conglomerate: 'future-of-cities', role: 'developer', notes: 'FoC demonstration project' },
    ],
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
    id: 'chozen-ccrl',
    name: 'ChoZen Center for Regenerative Living',
    shortName: 'CCRL',
    category: 'regenerative',
    status: 'active',
    entityType: 'nonprofit',
    tagline: '501(c)(3) Regenerative Living Center',
    description: 'A 40-acre 501(c)(3) nonprofit in Sebastian, FL. Programs include Artisan Market, Farm Volunteer Days, Leadership Training, Weekly Programming, Artist Residency, and Youth Summer Camp.',
    location: 'Sebastian, FL',
    notes: 'Pending: CCRL <> ChoZen IP licensing agreement details',
    affiliation: 'both',
    conglomerateRoles: [
      { conglomerate: 'cho-ventures', role: 'donor', notes: 'CV philanthropic support' },
      { conglomerate: 'future-of-cities', role: 'developer', notes: 'FoC regenerative living program' },
    ],
    metrics: [
      { label: 'Property', value: '40 Acres' },
      { label: 'Type', value: '501(c)(3)' },
      { label: 'Programs', value: '6+' },
      { label: 'Impact', value: 'Transformative' },
    ],
    aiApplications: [
      'Booking optimization and pricing',
      'Guest experience personalization',
      'Post-visit nurture sequences',
      'Event targeting and promotion',
      'Demand forecasting',
    ],
    connections: ['cho-ventures', 'chozen-ip', 'book-platform', 'course-platform', 'future-of-cities'],
    icon: 'sun',
  },
  {
    id: 'chozen-ip',
    name: 'ChoZen IP',
    shortName: 'CZIP',
    category: 'regenerative',
    status: 'active',
    entityType: 'ip-holder',
    tagline: 'Brand & Intellectual Property',
    description: 'ChoZen brand identity, residential, hospitality, membership platform, Casa Colibri, Sacred Items Gift Shop, and tech framework. IP holder licensing to CCRL and ecosystem entities.',
    location: 'Miami, FL',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'investor', notes: 'CV IP portfolio' }],
    metrics: [
      { label: 'Assets', value: 'Brand & IP' },
      { label: 'Licensing', value: 'Active' },
      { label: 'Platform', value: 'Membership' },
      { label: 'Scope', value: 'Ecosystem-wide' },
    ],
    aiApplications: [
      'Personalized content feeds',
      'Member-to-member matching',
      'Event recommendations',
      'Learning path curation',
      'Community health monitoring',
    ],
    connections: ['cho-ventures', 'chozen-ccrl', 'course-platform', 'future-of-cities'],
    icon: 'users',
  },
  {
    id: 'book-platform',
    name: 'Tony\'s Book',
    shortName: 'BOOK',
    category: 'authority',
    status: 'planned',
    tagline: 'Regenerative Living Philosophy',
    description: 'Two book projects: Generation Regeneration (FoC book on regenerative placemaking) and Soft Power (Tony\'s personal philosophy on regenerative living and building communities that thrive).',
    location: 'Publishing',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'authority', notes: 'Tony Cho thought leadership' }],
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
    connections: ['cho-ventures', 'course-platform', 'speaking-media', 'chozen-ccrl', 'tony-cho-brand'],
    icon: 'book',
  },
  {
    id: 'course-platform',
    name: 'Online Course',
    shortName: 'COURSE',
    category: 'authority',
    status: 'planned',
    tagline: 'Learn Regenerative Principles',
    description: 'Online courses that can live on FoC and/or ChoZen platforms, also taught externally as lead generation. Certification paths and direct connections to the ecosystem.',
    location: 'Digital',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'authority', notes: 'Tony Cho education platform' }],
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
    connections: ['cho-ventures', 'book-platform', 'chozen-ip', 'chozen-ccrl', 'tony-cho-brand'],
    icon: 'graduation',
  },
  {
    id: 'speaking-media',
    name: 'Speaking & Media',
    shortName: 'SPEAK',
    category: 'authority',
    status: 'active',
    tagline: 'Thought Leadership Engine',
    description: 'Thought leadership spokesperson role across regenerative living + development. Speaking engagements, podcast appearances, and media presence amplifying the message globally.',
    location: 'Global',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'authority', notes: 'Tony Cho speaking platform' }],
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
    connections: ['cho-ventures', 'book-platform', 'tony-cho-brand'],
    icon: 'mic',
  },
  {
    id: 'cho-foundation',
    name: 'Cho Family Foundation',
    shortName: 'CFF',
    category: 'philanthropy',
    status: 'active',
    entityType: 'daf',
    tagline: 'Donor-Advised Fund',
    description: 'A Donor-Advised Fund (DAF) supporting environmental conservation, wildlife protection, and indigenous culture preservation.',
    location: 'Miami, FL',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'donor', notes: 'CV philanthropic arm' }],
    metrics: [
      { label: 'Type', value: 'DAF' },
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
    connections: ['cho-ventures', 'climate-hub', 'ximena-legacy-fund', 'friends-of-phxjax'],
    icon: 'heart',
  },
  {
    id: 'ximena-legacy-fund',
    name: 'Ximena Cho Legacy Fund',
    shortName: 'XCLF',
    category: 'philanthropy',
    status: 'active',
    entityType: 'daf',
    tagline: 'Legacy Philanthropic Fund',
    description: 'A Donor-Advised Fund (DAF) honoring the Ximena Cho legacy through targeted philanthropic investments in community development and cultural preservation.',
    location: 'Miami, FL',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'donor', notes: 'CV philanthropic arm' }],
    metrics: [
      { label: 'Type', value: 'DAF' },
      { label: 'Focus', value: 'Legacy Impact' },
      { label: 'Programs', value: 'Community & Culture' },
      { label: 'Impact', value: 'Growing' },
    ],
    aiApplications: [
      'Grant tracking and management',
      'Impact reporting automation',
      'Donor management',
      'Community needs analysis',
      'Success story generation',
    ],
    connections: ['cho-ventures', 'cho-foundation'],
    icon: 'heart',
  },
  {
    id: 'friends-of-phxjax',
    name: 'Friends of PHXJAX',
    shortName: 'FoP',
    category: 'philanthropy',
    status: 'active',
    entityType: 'nonprofit',
    tagline: 'Community Arts Nonprofit',
    description: 'A 501(c)(3) nonprofit supporting the PHXJAX community through programs including Bloom Labs and Spring Mural Jam. Drives arts, culture, and community engagement in the district.',
    location: 'Jacksonville, FL',
    affiliation: 'both',
    conglomerateRoles: [
      { conglomerate: 'cho-ventures', role: 'donor', notes: 'CV philanthropic support' },
      { conglomerate: 'future-of-cities', role: 'in-kind-donor', notes: 'FoC community programming partner' },
    ],
    metrics: [
      { label: 'Type', value: '501(c)(3)' },
      { label: 'Programs', value: 'Bloom Labs, Mural Jam' },
      { label: 'Focus', value: 'Arts & Community' },
      { label: 'Impact', value: 'Local' },
    ],
    aiApplications: [
      'Event marketing and outreach',
      'Community engagement tracking',
      'Impact story generation',
      'Volunteer coordination',
      'Grant application support',
    ],
    connections: ['cho-ventures', 'phx-jax', 'cho-foundation', 'future-of-cities'],
    icon: 'handshake',
  },
  // New entities
  {
    id: 'tony-cho-brand',
    name: 'Tony Cho Personal Brand',
    shortName: 'TC',
    category: 'authority',
    status: 'active',
    entityType: 'personal-brand',
    tagline: 'Regenerative Visionary & Thought Leader',
    description: 'Tony Cho\'s personal brand encompassing thought leadership, public speaking, media presence, and the regenerative living philosophy that connects the entire ecosystem.',
    location: 'Global',
    affiliation: 'cho-ventures',
    conglomerateRoles: [{ conglomerate: 'cho-ventures', role: 'authority', notes: 'Personal brand and thought leadership' }],
    metrics: [
      { label: 'Reach', value: 'Global' },
      { label: 'Focus', value: 'Regenerative Living' },
      { label: 'Influence', value: 'Growing' },
      { label: 'Platform', value: 'Multi-Channel' },
    ],
    aiApplications: [
      'Personal brand content strategy',
      'Social media automation',
      'Audience growth intelligence',
      'Media opportunity identification',
      'Brand sentiment monitoring',
    ],
    connections: ['cho-ventures', 'book-platform', 'course-platform', 'speaking-media'],
    icon: 'user',
  },
  {
    id: 'foc-portugal',
    name: 'Future of Cities Portugal',
    shortName: 'FoC-PT',
    category: 'development',
    status: 'planned',
    entityType: 'development',
    tagline: 'European Regenerative Development',
    description: 'Future of Cities expansion into Portugal and the European market. Applying regenerative placemaking principles to development projects in one of Europe\'s most dynamic markets.',
    location: 'Portugal',
    affiliation: 'future-of-cities',
    conglomerateRoles: [{ conglomerate: 'future-of-cities', role: 'developer', notes: 'FoC European development arm' }],
    metrics: [
      { label: 'Market', value: 'Portugal / Europe' },
      { label: 'Focus', value: 'Regenerative Dev' },
      { label: 'Status', value: 'Planning' },
      { label: 'Expansion', value: 'International' },
    ],
    aiApplications: [
      'Market analysis and site selection',
      'Regulatory compliance monitoring',
      'Cross-border partnership matching',
      'Multilingual stakeholder communications',
      'ESG impact projections',
    ],
    connections: ['future-of-cities'],
    icon: 'globe',
  },
];

export const connections: Connection[] = [
  // AI System to conglomerates
  { id: 'ai-cv', source: 'ai-system', target: 'cho-ventures', type: 'primary', bidirectional: true, relationshipRole: 'parent' },
  { id: 'ai-foc', source: 'ai-system', target: 'future-of-cities', type: 'primary', bidirectional: true, relationshipRole: 'parent' },

  // Cho Ventures parent-to-child connections
  { id: 'cv-m1', source: 'cho-ventures', target: 'metro-1', type: 'primary', bidirectional: true, relationshipRole: 'investor' },
  { id: 'cv-phx', source: 'cho-ventures', target: 'phx-jax', type: 'primary', bidirectional: true, relationshipRole: 'investor' },
  { id: 'cv-climate', source: 'cho-ventures', target: 'climate-hub', type: 'primary', bidirectional: true, relationshipRole: 'investor' },
  { id: 'cv-ccrl', source: 'cho-ventures', target: 'chozen-ccrl', type: 'primary', bidirectional: true, relationshipRole: 'donor' },
  { id: 'cv-czip', source: 'cho-ventures', target: 'chozen-ip', type: 'primary', bidirectional: true, relationshipRole: 'investor' },
  { id: 'cv-book', source: 'cho-ventures', target: 'book-platform', type: 'primary', bidirectional: true, relationshipRole: 'authority' },
  { id: 'cv-course', source: 'cho-ventures', target: 'course-platform', type: 'primary', bidirectional: true, relationshipRole: 'authority' },
  { id: 'cv-speaking', source: 'cho-ventures', target: 'speaking-media', type: 'primary', bidirectional: true, relationshipRole: 'authority' },
  { id: 'cv-foundation', source: 'cho-ventures', target: 'cho-foundation', type: 'primary', bidirectional: true, relationshipRole: 'donor' },
  { id: 'cv-ximena', source: 'cho-ventures', target: 'ximena-legacy-fund', type: 'primary', bidirectional: true, relationshipRole: 'donor' },
  { id: 'cv-fop', source: 'cho-ventures', target: 'friends-of-phxjax', type: 'primary', bidirectional: true, relationshipRole: 'donor' },
  { id: 'cv-tc', source: 'cho-ventures', target: 'tony-cho-brand', type: 'primary', bidirectional: true, relationshipRole: 'authority' },

  // Future of Cities parent-to-child connections
  { id: 'foc-phx', source: 'future-of-cities', target: 'phx-jax', type: 'primary', bidirectional: true, relationshipRole: 'developer' },
  { id: 'foc-climate', source: 'future-of-cities', target: 'climate-hub', type: 'primary', bidirectional: true, relationshipRole: 'developer' },
  { id: 'foc-ccrl', source: 'future-of-cities', target: 'chozen-ccrl', type: 'platform', label: 'ChoZen as FoC Program', bidirectional: true, relationshipRole: 'developer' },
  { id: 'foc-czip', source: 'future-of-cities', target: 'chozen-ip', type: 'secondary', label: 'IP Boundary', bidirectional: true },
  { id: 'foc-fop', source: 'future-of-cities', target: 'friends-of-phxjax', type: 'secondary', bidirectional: true, relationshipRole: 'in-kind-donor' },
  { id: 'foc-pt', source: 'future-of-cities', target: 'foc-portugal', type: 'primary', bidirectional: true, relationshipRole: 'parent' },

  // Real estate cluster
  { id: 'm1-climate', source: 'metro-1', target: 'climate-hub', type: 'secondary', bidirectional: true },

  // Regenerative cluster
  { id: 'ccrl-czip', source: 'chozen-ccrl', target: 'chozen-ip', type: 'ip-licensing', label: 'Brand & Platform License', bidirectional: true },
  { id: 'ccrl-course', source: 'chozen-ccrl', target: 'course-platform', type: 'secondary', bidirectional: true },

  // Authority cluster
  { id: 'book-course', source: 'book-platform', target: 'course-platform', type: 'secondary', bidirectional: true },
  { id: 'book-speaking', source: 'book-platform', target: 'speaking-media', type: 'secondary', bidirectional: true },
  { id: 'course-czip', source: 'course-platform', target: 'chozen-ip', type: 'secondary', bidirectional: true },
  { id: 'tc-book', source: 'tony-cho-brand', target: 'book-platform', type: 'secondary', bidirectional: true },
  { id: 'tc-course', source: 'tony-cho-brand', target: 'course-platform', type: 'secondary', bidirectional: true },
  { id: 'tc-speaking', source: 'tony-cho-brand', target: 'speaking-media', type: 'secondary', bidirectional: true },

  // Philanthropy cluster
  { id: 'foundation-ximena', source: 'cho-foundation', target: 'ximena-legacy-fund', type: 'secondary', bidirectional: true },
  { id: 'foundation-fop', source: 'cho-foundation', target: 'friends-of-phxjax', type: 'secondary', bidirectional: true },
  { id: 'foundation-climate', source: 'cho-foundation', target: 'climate-hub', type: 'secondary', bidirectional: true },
  { id: 'phx-fop', source: 'phx-jax', target: 'friends-of-phxjax', type: 'primary', bidirectional: true },

  // Cross-cluster data flows
  { id: 'ccrl-book', source: 'chozen-ccrl', target: 'book-platform', type: 'data-flow', label: 'Content', bidirectional: false },
];

export const categoryLabels: Record<EntityCategory, string> = {
  'conglomerate': 'Conglomerate',
  'real-estate': 'Real Estate & Development',
  'regenerative': 'Regenerative Living',
  'authority': 'Authority Platform',
  'philanthropy': 'Impact & Philanthropy',
  'development': 'Development',
};

export const categoryColors: Record<EntityCategory, { bg: string; text: string; border: string; glow: string }> = {
  'conglomerate': { bg: 'bg-conglomerate', text: 'text-conglomerate-light', border: 'border-conglomerate', glow: 'shadow-conglomerate/50' },
  'real-estate': { bg: 'bg-real-estate', text: 'text-real-estate-light', border: 'border-real-estate', glow: 'shadow-real-estate/50' },
  'regenerative': { bg: 'bg-regenerative', text: 'text-regenerative-light', border: 'border-regenerative', glow: 'shadow-regenerative/50' },
  'authority': { bg: 'bg-authority', text: 'text-authority-light', border: 'border-authority', glow: 'shadow-authority/50' },
  'philanthropy': { bg: 'bg-philanthropy', text: 'text-philanthropy-light', border: 'border-philanthropy', glow: 'shadow-philanthropy/50' },
  'development': { bg: 'bg-development', text: 'text-development-light', border: 'border-development', glow: 'shadow-development/50' },
};

// Helper functions
export function getEntitiesByConglomerate(conglomerateId: string): Entity[] {
  return entities.filter(
    (e) => e.affiliation === conglomerateId || e.affiliation === 'both' || e.id === conglomerateId
  );
}

export function getSharedEntities(): Entity[] {
  return entities.filter((e) => e.affiliation === 'both');
}

export function getConglomerates(): Entity[] {
  return entities.filter((e) => e.isConglomerate);
}

export const aiLayerConfig = {
  name: 'AI Communication Layer',
  description: 'Intelligent bridge connecting Cho Ventures and Future of Cities conglomerates through unified AI orchestration, data sharing, and cross-entity intelligence.',
  capabilities: [
    'Cross-conglomerate data synchronization',
    'Unified CRM intelligence',
    'Shared analytics and reporting',
    'AI-powered referral routing',
    'Content and brand consistency',
  ],
  colors: {
    primary: '#818CF8',
    light: '#A5B4FC',
    dark: '#6366F1',
    glow: 'rgba(129, 140, 248, 0.4)',
  },
};
