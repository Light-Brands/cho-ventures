// Master Plan Data - Cho Ventures AI Ecosystem
// Source: Brand Factory - https://github.com/Light-Brands/brand-factory

export interface PlanSection {
  id: string;
  title: string;
  icon: string;
  content: PlanContent[];
}

export interface PlanContent {
  type: 'paragraph' | 'heading' | 'list' | 'table' | 'diagram' | 'quote' | 'metrics';
  data: any;
}

export const masterPlanMeta = {
  title: 'Cho Ventures AI Ecosystem: Master Plan',
  subtitle: 'Unifying a visionary portfolio into an AI-powered regenerative empire.',
  sourceUrl: 'https://github.com/Light-Brands/brand-factory/blob/main/brands/cho-ventures-ai/spec/MASTER-PLAN.md',
  lastUpdated: '2024',
};

export const executiveSummary = {
  opportunity: {
    title: 'The Opportunity',
    intro: 'Tony Cho has built something remarkable: a portfolio of ventures that span real estate, climate innovation, hospitality, wellness, and philanthropy—all connected by a singular vision of regenerative living. But like many visionary portfolios, each entity operates somewhat independently, with untapped potential for synergy.',
    points: [
      { label: 'Unification', description: 'Connect all entities through a central AI-powered hub' },
      { label: 'Amplification', description: 'Use AI to multiply the impact and efficiency of every venture' },
      { label: 'Authority', description: 'Position Tony as the definitive voice in regenerative placemaking' },
    ],
  },
  stakes: {
    title: 'The Stakes',
    intro: 'Tony is at an inflection point:',
    points: [
      'Book coming — A chance to codify his philosophy for a global audience',
      'Course to launch — An opportunity to teach regenerative principles at scale',
      'Growing portfolio — More entities means more coordination complexity',
      'Climate urgency — The world needs his message now more than ever',
    ],
    outcomes: [
      'Operate more efficiently across all entities',
      'Engage communities at unprecedented depth',
      'Scale impact without proportional overhead',
      'Lead the narrative in regenerative development',
    ],
  },
  solution: {
    title: 'The Solution',
    description: 'A dual-conglomerate architecture with an AI Communication Layer bridging Cho Ventures and Future of Cities:',
    layers: [
      { name: 'Cho Ventures (Family Office)', items: ['Portfolio Management', 'Authority Platform', 'Philanthropic Arms', 'Tony Cho Personal Brand'] },
      { name: 'AI Communication Layer', items: ['Cross-Conglomerate Intelligence', 'Unified CRM', 'Content Engine', 'Analytics Bridge', 'Shared Data'] },
      { name: 'Future of Cities (Developer)', items: ['Regenerative Placemaking', 'Development Pipeline', 'PHX-JAX & HUB Projects', 'FoC Portugal'] },
      { name: 'Community Layer', items: ['ChoZen App', 'Member Portal', 'Events & Retreats', 'Learning Platform', 'Community Forums'] },
      { name: 'Authority Layer', items: ['Book Launch', 'Course Platform', 'Speaking/Media', 'Tony Cho Brand', 'Newsletter'] },
      { name: 'Data Layer', items: ['Unified Database', 'Cross-Entity Analytics', 'Community Insights', 'Impact Metrics'] },
    ],
  },
};

export const entityProfiles = [
  { entity: 'Cho Ventures', type: 'Holding Company', location: 'Miami', function: 'Portfolio management, strategic direction' },
  { entity: 'Metro 1 Commercial', type: 'Real Estate Brokerage', location: 'Miami', function: 'Commercial property sales, leasing, tenant rep' },
  { entity: 'Future of Cities', type: 'Regenerative Placemaking IP & Development', location: 'Multi-City', function: 'FoC IP & Assets, regenerative placemaking framework, global development pipeline' },
  { entity: 'PHX-JAX District', type: 'Arts & Innovation District', location: 'Jacksonville', function: 'Real estate investment, commercial + residential leasing, affordable housing' },
  { entity: 'Climate + Innovation HUB', type: 'Innovation Center', location: 'Miami (Little Haiti)', function: 'Climate tech incubation, programming' },
  { entity: 'ChoZen Center for Regenerative Living', type: '501(c)(3) Nonprofit', location: 'Sebastian, FL', function: 'Artisan Market, Farm Volunteer Days, Leadership Training, Artist Residency, Youth Summer Camp' },
  { entity: 'ChoZen IP', type: 'IP Holder', location: 'Miami', function: 'Brand identity, residential, hospitality, membership platform, Casa Colibri, Sacred Items Gift Shop' },
  { entity: 'Cho Family Foundation', type: 'Donor-Advised Fund (DAF)', location: 'Miami', function: 'Environmental & cultural philanthropy' },
  { entity: 'Ximena Cho Legacy Fund', type: 'Donor-Advised Fund (DAF)', location: 'Miami', function: 'Legacy philanthropic investments, community development' },
  { entity: 'Friends of PHXJAX', type: '501(c)(3) Nonprofit', location: 'Jacksonville', function: 'Bloom Labs, Spring Mural Jam, arts & community engagement' },
  { entity: 'Tony Cho Personal Brand', type: 'Personal Brand', location: 'Miami', function: 'Thought leadership, keynote speaking, media presence, authority positioning' },
  { entity: 'Future of Cities Portugal', type: 'International Development', location: 'Portugal', function: 'European regenerative placemaking, international expansion pipeline' },
];

export const unifiedStory = {
  mission: 'Every entity serves the same mission: demonstrating that regenerative development creates superior returns for people, planet, and profit.',
  entities: [
    { name: 'Metro 1', role: 'proves it in commercial real estate transactions' },
    { name: 'Future of Cities', role: 'builds it into new developments' },
    { name: 'PHX-JAX', role: 'creates community through it' },
    { name: 'Climate HUB', role: 'incubates innovation for it' },
    { name: 'CCRL', role: 'embodies it as a living laboratory and educational center' },
    { name: 'Foundations', role: 'extend its benefits to underserved communities' },
  ],
};

export const currentStatePainPoints = [
  {
    category: 'Entity Silos',
    issues: ['Separate systems', 'No shared CRM', 'Data doesn\'t flow', 'Duplicate work'],
  },
  {
    category: 'Community Gaps',
    issues: ['No unified app', 'Manual engagement', 'Event booking manual', 'Members scattered'],
  },
  {
    category: 'Content Fragmentation',
    issues: ['Multiple websites', 'Inconsistent branding', 'No central content hub', 'Social fragmented'],
  },
  {
    category: 'Authority Gaps',
    issues: ['No book platform', 'Course not built', 'Speaking ad-hoc', 'List not unified'],
  },
  {
    category: 'Operations',
    issues: ['Manual processes', 'Email overwhelm', 'Follow-up gaps', 'Scheduling friction'],
  },
  {
    category: 'Analytics',
    issues: ['No unified dashboard', 'Entity silos', 'Impact unmeasured', 'Insights limited'],
  },
];

export const integrationChallenges = [
  { challenge: 'Siloed entities', impact: 'Lost synergies, duplicate effort', state: 'Each entity operates independently' },
  { challenge: 'No unified CRM', impact: 'Relationships fragmented', state: 'Contacts scattered across systems' },
  { challenge: 'Manual community management', impact: 'Limited engagement at scale', state: 'Email lists, manual follow-up' },
  { challenge: 'Content scattered', impact: 'Diluted brand impact', state: 'Multiple sites, no central hub' },
  { challenge: 'Book/course infrastructure absent', impact: 'Launch delays', state: 'Not yet built' },
  { challenge: 'No unified analytics', impact: 'Blind spots in performance', state: 'Entity-specific tracking only' },
];

export const hiddenPotential = {
  intro: 'Every person who interacts with any Cho entity is a potential:',
  potentials: [
    'ChoZen retreat guest interested in wellness',
    'Metro 1 client looking for regenerative commercial space',
    'Course student wanting to learn regenerative principles',
    'Book reader sharing Tony\'s vision',
    'Community member joining the movement',
    'Donor supporting foundation work',
  ],
  conclusion: 'Currently, these connections are made manually, if at all. AI changes everything.',
};

export const coreCapabilities = [
  { capability: 'Unified Contact Hub', description: 'Every relationship across all entities in one system', impact: 'Complete visibility, no lost connections' },
  { capability: 'Cross-Entity Intelligence', description: 'AI identifies synergies between entities', impact: 'Right opportunity, right entity' },
  { capability: 'Community Platform', description: 'ChoZen app as the heart of engagement', impact: 'Scalable community at depth' },
  { capability: 'Authority Engine', description: 'Book, course, newsletter, speaking integrated', impact: 'Thought leadership amplification' },
  { capability: 'AI Content Generation', description: 'Consistent content across all entities', impact: 'Brand cohesion, reduced effort' },
  { capability: 'Unified Dashboard', description: 'Real-time visibility across portfolio', impact: 'Informed decisions, impact tracking' },
  { capability: 'Automated Engagement', description: 'Intelligent follow-up across all touchpoints', impact: 'No one falls through cracks' },
];

export const centralHubLayers = [
  {
    name: 'CRM & Contact Management',
    components: ['All Contacts Database', 'Smart Segments', 'Customer Journeys'],
  },
  {
    name: 'AI Orchestration',
    components: ['Intelligent Routing', 'Content Generation', 'Lead & Opportunity Scoring', 'Personalization Engine'],
  },
  {
    name: 'Content Hub',
    components: ['Asset Library', 'Templates', 'Multi-Channel Publishing'],
  },
  {
    name: 'Analytics & Insights',
    components: ['Unified Dashboard', 'Cross-Entity Reports', 'Impact Metrics'],
  },
];

export const techStackRecommendations = [
  { layer: 'Frontend Framework', tools: 'Next.js 14+ with React 18+', purpose: 'Server-side rendering, app router, full-stack capabilities' },
  { layer: 'Backend Runtime', tools: 'Node.js with Next.js API Routes', purpose: 'Scalable API layer, serverless functions, microservices-ready' },
  { layer: 'Database', tools: 'PostgreSQL + Prisma ORM', purpose: 'Enterprise-grade data layer, type-safe queries, migrations' },
  { layer: 'CRM Module', tools: 'Custom-built React CRM', purpose: 'Contact management, automation, pipeline — fully owned' },
  { layer: 'AI Layer', tools: 'Claude API, OpenAI API (Direct Integration)', purpose: 'Content, intelligence, personalization — no middleware' },
  { layer: 'Community Platform', tools: 'Custom Next.js App (ChoZen)', purpose: 'Member portal, forums, events — 100% customizable' },
  { layer: 'Learning Management', tools: 'Custom LMS built on Next.js', purpose: 'Courses, certifications, book companion — fully owned' },
  { layer: 'Analytics Dashboard', tools: 'Custom React Dashboard', purpose: 'Real-time cross-entity visibility, custom metrics' },
  { layer: 'Websites', tools: 'Next.js with Shared Design System', purpose: 'Unified branding, component library, SSR/SSG' },
  { layer: 'Email/SMS', tools: 'Custom integration (SendGrid/Twilio APIs)', purpose: 'Multi-channel communication, full control' },
  { layer: 'Authentication', tools: 'NextAuth.js + Custom RBAC', purpose: 'Secure auth, role-based access, SSO-ready' },
  { layer: 'Hosting/DevOps', tools: 'Vercel or AWS (ECS/Lambda)', purpose: 'Auto-scaling, edge deployment, CI/CD' },
  { layer: 'State Management', tools: 'React Query + Zustand', purpose: 'Server state, client state, optimistic updates' },
  { layer: 'UI Framework', tools: 'Tailwind CSS + Radix UI', purpose: 'Consistent design system, accessible components' },
];

export const aiPriorities = [
  {
    priority: 1,
    title: 'Unified CRM with Cross-Entity Intelligence',
    problem: 'Contacts and relationships siloed across entities',
    solution: 'Single CRM with AI that identifies cross-entity opportunities',
    example: 'A Metro 1 client interested in sustainable buildings gets invited to ChoZen retreat and Climate HUB events',
  },
  {
    priority: 2,
    title: 'Community Platform with AI Engagement',
    problem: 'Community engagement requires manual effort that doesn\'t scale',
    solution: 'ChoZen app with AI that personalizes member experience',
    example: 'AI recommends retreats, events, and content based on member interests and behavior',
  },
  {
    priority: 3,
    title: 'Authority Content Engine',
    problem: 'Tony\'s message isn\'t reaching its full audience',
    solution: 'AI-powered content system that amplifies book, course, and thought leadership',
    example: 'AI generates social content, newsletter segments, and podcast prep from Tony\'s core teachings',
  },
  {
    priority: 4,
    title: 'Operational Automation',
    problem: 'Manual processes consume time across all entities',
    solution: 'AI handles scheduling, follow-up, and routine communications',
    example: 'AI books retreat tours, follows up with event attendees, manages newsletter sequences',
  },
];

export const authorityFlywheel = [
  { step: 'Book Launch', leads_to: 'Readers' },
  { step: 'Readers', leads_to: 'Online Course' },
  { step: 'Online Course', leads_to: 'Students' },
  { step: 'Students', leads_to: 'Community App' },
  { step: 'Community App', leads_to: 'Active Members' },
  { step: 'Active Members', leads_to: 'Retreats & Events' },
  { step: 'Retreats & Events', leads_to: 'Retreat Guests' },
  { step: 'Retreat Guests', leads_to: 'Advocates' },
  { step: 'Advocates', leads_to: 'Referrals' },
  { step: 'Referrals', leads_to: 'Book Launch' },
];

export const bookLaunchStrategy = [
  { component: 'Pre-Launch List Building', aiRole: 'AI segments and nurtures leads from all entities' },
  { component: 'Launch Sequencing', aiRole: 'Automated email campaigns, social content' },
  { component: 'Book Companion', aiRole: 'AI chatbot answers questions about book concepts' },
  { component: 'Reader to Student Conversion', aiRole: 'AI identifies readers ready for course' },
];

export const speakingMediaEngine = [
  { component: 'Speaking Kit', description: 'AI-generated and maintained speaker one-sheet, topics, bio variations' },
  { component: 'Podcast Prep', description: 'AI researches host, suggests talking points, prepares questions' },
  { component: 'Media Follow-up', description: 'Automated thank-you and stay-in-touch sequences' },
  { component: 'Content Repurposing', description: 'AI turns speaking content into articles, social, newsletter' },
];

export const threePhases = [
  {
    phase: 1,
    name: 'Discovery & Strategy',
    duration: '2-3 weeks',
    deliverable: 'Comprehensive Master Plan',
    sessions: [
      { session: 1, focus: 'Vision Alignment & Ecosystem Overview', participants: 'Tony, Leadership' },
      { session: 2, focus: 'Entity Deep-Dives (Metro 1, FoC, PHX-JAX)', participants: 'Entity Leaders' },
      { session: 3, focus: 'ChoZen & Community Vision', participants: 'Retreat Team, Community Leads' },
      { session: 4, focus: 'Authority Platform (Book, Course, Speaking)', participants: 'Tony, Content Team' },
      { session: 5, focus: 'Technology Audit & Integration Requirements', participants: 'IT/Operations' },
      { session: 6, focus: 'Roadmap Presentation & Decision', participants: 'All Stakeholders' },
    ],
    deliverables: [
      'Ecosystem Audit Report — Current state of all entities, systems, and processes',
      'AI Opportunity Matrix — Prioritized opportunities across all entities',
      'Unified Architecture Design — Target state system diagram',
      'Community Platform Specification — ChoZen app requirements',
      'Authority Platform Plan — Book, course, speaking integration',
      'Implementation Roadmap — Phased plan with dependencies',
      'Investment Framework — Costs, timeline, ROI projections',
    ],
  },
  {
    phase: 2,
    name: 'Implementation',
    duration: '4-6 months',
    deliverable: 'Operational AI-Powered Infrastructure',
    components: [
      { component: 'Central Hub', description: 'CRM setup, unified database, core workflows', dependencies: 'None' },
      { component: 'Entity Integrations', description: 'Connect all entities to central hub', dependencies: 'Central Hub' },
      { component: 'Website Revamps', description: 'Unified design system, connected to hub', dependencies: 'Central Hub' },
      { component: 'Community Platform MVP', description: 'ChoZen app core functionality', dependencies: 'Central Hub' },
      { component: 'AI Layer', description: 'Intelligence, automation, personalization', dependencies: 'All Above' },
      { component: 'Dashboard', description: 'Cross-entity visibility', dependencies: 'All Above' },
    ],
  },
  {
    phase: 3,
    name: 'Authority Launch',
    duration: '4-6 months',
    deliverable: 'Full Authority Platform + Community Engagement',
    components: [
      { component: 'Book Launch', description: 'Pre-launch, launch, post-launch automation' },
      { component: 'Course Platform', description: 'Modules, AI companion, certification' },
      { component: 'Community Scale', description: 'ChoZen app full features, engagement programs' },
      { component: 'Speaking Engine', description: 'Booking, prep, follow-up automation' },
      { component: 'Content Amplification', description: 'Multi-channel, AI-generated content strategy' },
    ],
  },
];

export const entityStrategies = [
  {
    entity: 'Metro 1 Commercial',
    flow: ['Lead Capture', 'AI Qualification', 'Property Matching', 'Automated Follow-up', 'Deal Support', 'Cross-Entity Referral'],
    applications: [
      { application: 'Lead Qualification', description: 'AI scores and routes incoming inquiries' },
      { application: 'Property Matching', description: 'AI matches clients to properties based on criteria' },
      { application: 'Market Intelligence', description: 'AI monitors market for client opportunities' },
      { application: 'Cross-Referral', description: 'AI identifies clients for other entities (FoC development, ChoZen visits)' },
    ],
  },
  {
    entity: 'Future of Cities',
    applications: [
      { application: 'Project Intelligence', description: 'AI tracks ESG trends, funding opportunities' },
      { application: 'Community Engagement', description: 'AI manages stakeholder communications' },
      { application: 'Sustainability Reporting', description: 'AI generates impact reports' },
      { application: 'Investor Relations', description: 'AI personalizes investor communications' },
    ],
  },
  {
    entity: 'PHX-JAX District',
    applications: [
      { application: 'Tenant Prospecting', description: 'AI identifies ideal creative tenants' },
      { application: 'Event Promotion', description: 'AI generates and targets event marketing' },
      { application: 'Community Building', description: 'AI facilitates connections between tenants' },
      { application: 'Space Optimization', description: 'AI analyzes usage patterns for programming' },
    ],
  },
  {
    entity: 'Climate + Innovation HUB',
    applications: [
      { application: 'Startup Matching', description: 'AI connects startups with resources, mentors' },
      { application: 'Program Personalization', description: 'AI tailors programs to participant needs' },
      { application: 'Impact Measurement', description: 'AI tracks and reports climate impact' },
      { application: 'Network Intelligence', description: 'AI identifies collaboration opportunities' },
    ],
  },
  {
    entity: 'ChoZen Center for Regenerative Living',
    applications: [
      { application: 'Booking Optimization', description: 'AI manages availability, pricing, upsells' },
      { application: 'Guest Personalization', description: 'AI tailors retreat experience to guest profile' },
      { application: 'Follow-up & Nurture', description: 'AI maintains guest relationships post-visit' },
      { application: 'Event Promotion', description: 'AI targets ideal guests for specific programs' },
    ],
  },
  {
    entity: 'Foundations',
    applications: [
      { application: 'Grant Management', description: 'AI tracks applications, deadlines, reporting' },
      { application: 'Donor Relations', description: 'AI personalizes donor communications' },
      { application: 'Impact Reporting', description: 'AI generates impact narratives and metrics' },
      { application: 'Program Matching', description: 'AI connects donors with aligned programs' },
    ],
  },
];

export const successMetrics = {
  ecosystem: [
    { metric: 'Unified Contact Database', current: 'Siloed', target: '100% in one system' },
    { metric: 'Cross-Entity Referrals', current: 'Manual/rare', target: 'Automated, 10x increase' },
    { metric: 'Community Members (App)', current: 'N/A', target: '10,000+ active' },
    { metric: 'Newsletter Subscribers', current: 'Fragmented', target: 'Unified, 50,000+' },
    { metric: 'Content Velocity', current: 'Manual, slow', target: 'AI-assisted, 5x faster' },
  ],
  authority: [
    { metric: 'Book Pre-Launch List', target: '25,000+' },
    { metric: 'Course Enrollments (Year 1)', target: '1,000+' },
    { metric: 'Speaking Engagements', target: '24+/year' },
    { metric: 'Podcast Appearances', target: '50+/year' },
    { metric: 'Media Mentions', target: '100+/year' },
  ],
  entity: [
    { entity: 'Metro 1', metric: 'Lead response time < 5 minutes' },
    { entity: 'Future of Cities', metric: 'Stakeholder engagement 3x' },
    { entity: 'PHX-JAX', metric: 'Tenant occupancy 95%+' },
    { entity: 'Climate HUB', metric: 'Startup success rate 2x' },
    { entity: 'CCRL', metric: 'Repeat guest rate 40%+' },
    { entity: 'Foundations', metric: 'Donor retention 80%+' },
  ],
  impact: [
    { metric: 'Regenerative Projects', description: 'Number of developments using regenerative principles' },
    { metric: 'Community Impact', description: 'People directly served by foundations' },
    { metric: 'Climate Innovation', description: 'Startups launched from Climate HUB' },
    { metric: 'Wellness Reach', description: 'Lives touched through ChoZen programs' },
    { metric: 'Philosophy Spread', description: 'People exposed to regenerative placemaking principles' },
  ],
};

export const planSections = [
  { id: 'executive-summary', title: 'Executive Summary', icon: 'sparkles' },
  { id: 'ecosystem', title: 'The Ecosystem', icon: 'network' },
  { id: 'current-state', title: 'Current State', icon: 'chart' },
  { id: 'transformation', title: 'Transformation Vision', icon: 'rocket' },
  { id: 'central-hub', title: 'Central Hub', icon: 'hub' },
  { id: 'ai-integration', title: 'AI Integration', icon: 'brain' },
  { id: 'authority', title: 'Authority Platform', icon: 'crown' },
  { id: 'phases', title: 'Three Phases', icon: 'layers' },
  { id: 'entity-strategies', title: 'Entity Strategies', icon: 'building' },
  { id: 'metrics', title: 'Success Metrics', icon: 'target' },
];
