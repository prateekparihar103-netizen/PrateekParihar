/**
 * resume.ts — single source of truth for every word on the site.
 *
 * Content is synthesised from Career_Master_Profile.md and Master_CV.pdf.
 * Standing rules honoured here (from the master profile):
 *  - Cordon Encryption is never shown.
 *  - The ₹45 Cr figure always keeps its "alongside sales teams" qualifier.
 *  - D365 F&O is the live-implementation platform; Oracle is implementation
 *    support + certifications + self-built tools (SCCC).
 *  - Private data (phone, DOB, compensation) is deliberately excluded.
 *
 * To update the site, edit this file only — components render from it.
 */

/* ------------------------------------------------------------------ */
/* Shared types                                                        */
/* ------------------------------------------------------------------ */

/** The three professional pillars. Each maps to an accent colour token. */
export type Pillar = 'scm' | 'esg' | 'ai'
/** Accent keys usable by components (pillars + neutral ink). */
export type Accent = Pillar | 'ink'

export interface Metric {
  value: string
  label: string
}

export interface ArchitectureStep {
  title: string
  detail: string
}

export interface Project {
  slug: string
  title: string
  kicker: string
  context: string
  pillars: Pillar[]
  summary: string
  problem: string
  architecture: ArchitectureStep[]
  stack: string[]
  metrics: Metric[]
  highlights: string[]
  featured?: boolean
}

export interface TimelineTrack {
  label: string
  period: string
  points: string[]
}

export interface TimelineEntry {
  id: string
  kind: 'education' | 'work'
  pillar: Pillar
  period: string
  org: string
  orgNote?: string
  role: string
  location: string
  summary: string
  tags: string[]
  tracks: TimelineTrack[]
}

export interface Skill {
  name: string
  detail?: string
  /** Slugs of projects where this skill was applied (links into /projects). */
  projects: string[]
}

export interface SkillGroup {
  id: string
  title: string
  accent: Accent
  blurb: string
  skills: Skill[]
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Prateek Parihar',
  firstName: 'Prateek',
  title: 'Supply Chain & Enterprise AI Consultant',
  currentRole: 'Functional Consultant',
  company: 'Wipro Limited',
  location: 'Bengaluru, India',
  email: 'prateekparihar103@gmail.com',
  linkedin: 'https://www.linkedin.com/in/prateek-parihar-bik29',
  linkedinHandle: 'prateek-parihar-bik29',
  github: 'https://github.com/prateekparihar103-netizen',
  githubHandle: 'prateekparihar103-netizen',
  photo: 'photo.jpg',
  /** Greetings cycle through the languages Prateek speaks. */
  greetings: ['Namaste', 'Hello', 'Hallo'],
  headline: 'I build the AI layer on top of enterprise supply chains.',
  summary:
    'Techno-functional consultant with an IIM Mumbai MBA and three-plus years spanning supply-chain operations, enterprise technology delivery and AI agent development. At Wipro I work across Oracle Fusion SCM and Microsoft Dynamics 365 F&O while building the intelligence above them — agentic testing frameworks, retrieval-augmented generation systems and 20+ production AI agents — backed by six Oracle certifications. Before that, I owned a technical-textiles portfolio at Arvind Limited, and I bring ESG benchmarking depth from a Blackstone-owned real estate platform.',
  languages: [
    { name: 'Hindi', level: 'Native' },
    { name: 'English', level: 'Professional' },
    { name: 'German', level: 'Elementary' },
  ],
  interests: ['Astronomy', 'Cooking', 'Table tennis'],
}

/* ------------------------------------------------------------------ */
/* Pillars (home page)                                                 */
/* ------------------------------------------------------------------ */

export const pillars: {
  id: Pillar
  index: string
  title: string
  short: string
  platforms: string
  proof: string[]
}[] = [
  {
    id: 'scm',
    index: '01',
    title: 'Enterprise Supply Chain Transformation',
    short: 'Supply Chain',
    platforms: 'Oracle Fusion SCM · Dynamics 365 F&O',
    proof: [
      'Oracle Fusion SCM implementation support across Order-to-Cash, supply-planning validation and patch-impact analysis',
      'Certified in Oracle Planning & Collaboration, Warehouse Management and Order-to-Cash',
      'Two years running defence-grade technical-textile supply chains at Arvind Limited',
    ],
  },
  {
    id: 'esg',
    index: '02',
    title: 'Sustainability Frameworks',
    short: 'ESG',
    platforms: 'ESG · BRSR · GRI · TCFD',
    proof: [
      'MBA in Sustainability Management, IIM Mumbai — Distinction',
      '42-KPI ESG benchmark for a Blackstone-owned commercial real estate platform',
      'Co-authored a first-ever TCFD-aligned Sustainability Report alongside BRSR and GRI',
    ],
  },
  {
    id: 'ai',
    index: '03',
    title: 'Generative AI Engineering',
    short: 'GenAI',
    platforms: 'Copilot Studio · RAG · MCP · Vector Search',
    proof: [
      '20+ AI agents shipped in Microsoft Copilot Studio with Parent-Child orchestration',
      'MCP-powered chatbot over 9,892 Karnataka RERA projects; RAG on Oracle AI Vector Search',
      'OCI Generative AI Professional and Oracle AI Vector Search certified',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Headline stats (count-up band)                                      */
/* ------------------------------------------------------------------ */

export const stats: {
  value: number
  prefix?: string
  suffix?: string
  label: string
  note?: string
  accent: Accent
}[] = [
  { value: 20, suffix: '+', label: 'AI agents shipped', note: 'Microsoft Copilot Studio', accent: 'ai' },
  { value: 45, prefix: '₹', suffix: ' Cr', label: 'Commercialisation revenue', note: 'generated alongside sales teams', accent: 'scm' },
  { value: 60, suffix: '%', label: "Indian Army camouflage order", note: 'secured with DRDO & DMSRDE', accent: 'scm' },
  { value: 6, label: 'Oracle certifications', note: 'GenAI · Vector Search · SCM', accent: 'esg' },
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    slug: 'rera-chatbot',
    title: 'Karnataka RERA Chatbot',
    kicker: 'MCP server · Hybrid retrieval · GCP',
    context: 'Personal build · Deployed on Google Cloud',
    pillars: ['ai'],
    featured: true,
    summary:
      'An AI-led assistant that answers questions about any registered real-estate project in Karnataka, using a Model Context Protocol server to fetch live project and promoter details.',
    problem:
      'RERA registry data is spread across a captcha-gated state portal, which makes routine due-diligence questions about a project or promoter slow and manual.',
    architecture: [
      { title: 'Captcha-free scraper', detail: 'Extracts structured project data from the Karnataka RERA portal — 9,892 registered projects across 31 districts.' },
      { title: 'Structured store + semantic index', detail: 'Registration numbers, promoters and statuses kept queryable as structured records; filings embedded for semantic search.' },
      { title: 'MCP server', detail: 'Exposes project lookup, promoter search, status checks and semantic search as Model Context Protocol tools the LLM can call live.' },
      { title: 'Hybrid query router', detail: 'Routes exact lookups (registration number, promoter, status) to structured tools and open questions to semantic search.' },
      { title: 'Cited answers', detail: 'Every response traces back to the specific RERA filing or document for auditability.' },
      { title: 'Cloud deployment', detail: 'Served on Google Cloud Platform as a publicly queryable knowledge base spanning the full state portal.' },
    ],
    stack: ['Python', 'Model Context Protocol (MCP)', 'LLM tool-calling', 'Semantic search', 'Web scraping', 'SQL', 'Google Cloud Platform'],
    metrics: [
      { value: '9,892', label: 'registered projects indexed' },
      { value: '31', label: 'districts covered' },
      { value: '100%', label: 'answers source-cited' },
    ],
    highlights: [
      'Built a captcha-free scraper covering the entire Karnataka RERA portal.',
      'Designed a hybrid query-routing architecture combining structured lookups with semantic search.',
      'Implemented source-citation on every response for auditability.',
      'Deployed a production-ready, publicly queryable system on Google Cloud.',
    ],
  },
  {
    slug: 'd365-agents',
    title: 'Copilot Studio Agent Suite for D365 F&O',
    kicker: 'Parent-Child orchestration · Power Automate · MCP',
    context: 'Wipro · Microsoft Dynamics account · Mar 2026 – Present',
    pillars: ['ai', 'scm'],
    featured: true,
    summary:
      '20+ workflow-automation agents built in Microsoft Copilot Studio for Dynamics 365 Finance & Operations clients — streamlining procurement, inventory, master data and retail statement operations.',
    problem:
      'Associates were spending hours each day chasing stuck statements, uploading master data by hand and answering routine procurement and inventory status questions.',
    architecture: [
      { title: 'Dynamics 365 F&O', detail: 'Procurement, inventory, retail/commerce statements and master data as the system of record.' },
      { title: 'Power Automate layer', detail: '10+ flows connect agents to D365 F&O and run end-to-end business processes.' },
      { title: 'Specialised child agents', detail: 'Scheduler, Master Data Upload (via MCP), procurement & inventory and Project Health Classification agents, each owning one job.' },
      { title: 'Parent orchestrator', detail: 'A parent agent routes requests to the right child agent and stitches results into one workflow.' },
      { title: 'Human-in-the-loop checkpoint', detail: 'A person authenticates and validates AI outputs before anything is committed.' },
      { title: 'Delivery', detail: 'Natural-language answers in chat plus scheduled email reports to the business.' },
    ],
    stack: ['Microsoft Copilot Studio', 'Dynamics 365 F&O', 'Power Automate', 'Model Context Protocol (MCP)', 'Agentic orchestration', 'Prompt design'],
    metrics: [
      { value: '20+', label: 'agents shipped' },
      { value: '10+', label: 'Power Automate flows' },
      { value: '2–3 hrs', label: 'saved per associate, per day' },
    ],
    highlights: [
      'Scheduler Agent emails reports of unposted statements and answers where a statement is stuck — saving associates 2–3 hours a day.',
      'Master Data Upload Agent lets users load vendor, item or customer master data from Excel using MCP.',
      'Extended the suite to procurement and inventory operations, replacing manual lookups and exception chasing.',
      'Project Health Classification Agent flags projects Red/Amber/Green and matches specialised talent to requirements.',
      'Ran cost-benefit analysis of build/run cost against hours saved to set minimum-investment thresholds for new AI initiatives.',
      'Authored IP documentation for practice-owned agent solutions and delivered client-facing demos.',
    ],
  },
  {
    slug: 'sccc',
    title: 'Supply Chain Command Centre',
    kicker: 'Enterprise RAG · Oracle AI Vector Search',
    context: 'Wipro · Oracle Fusion SCM',
    pillars: ['ai', 'scm'],
    featured: true,
    summary:
      'A natural-language interface over Oracle Fusion supply-chain data, so operations users can ask about orders, inventory and planning status without writing SQL.',
    problem:
      'Routine status questions needed a data or IT request, because answers were locked behind SQL and planning screens.',
    architecture: [
      { title: 'Oracle Fusion SCM data', detail: 'Live order, inventory and planning-status data as the grounding source.' },
      { title: 'Oracle AI Vector Search', detail: 'Embeddings and similarity search inside the Oracle stack to retrieve relevant context.' },
      { title: 'Retrieval pipeline', detail: 'Grounds every response in current system state rather than static snapshots.' },
      { title: 'LLM answer layer', detail: 'Generates a natural-language answer from the retrieved context.' },
      { title: 'Self-serve for ops', detail: 'Non-technical users get status answers directly, with no ticket in between.' },
    ],
    stack: ['Retrieval-Augmented Generation', 'Oracle AI Vector Search', 'Oracle Fusion SCM', 'LLMs', 'NLP', 'OCI'],
    metrics: [
      { value: '0', label: 'SQL needed by ops users' },
      { value: 'Live', label: 'grounded in current system state' },
      { value: 'Self-serve', label: 'replaces data/IT requests' },
    ],
    highlights: [
      'Built a natural-language interface over Oracle Fusion supply-chain data using RAG and Oracle AI Vector Search.',
      'Architected the retrieval pipeline to ground answers in live order, inventory and planning-status data.',
      'Validated workflow accuracy and system performance ahead of release.',
    ],
  },
  {
    slug: 'agentic-accelerators',
    title: 'Agentic Delivery Accelerators',
    kicker: 'AI test automation · SQL-generation agents',
    context: 'Wipro · Oracle Fusion track · Jul – Nov 2025',
    pillars: ['ai', 'scm'],
    summary:
      'Agentic frameworks that sped up ERP delivery itself — automating regression testing and generating SQL for planning dashboards.',
    problem:
      'Manual regression suites slowed every Oracle Fusion release cycle, and hand-written SQL slowed dashboard data extraction.',
    architecture: [
      { title: 'Manual regression suite', detail: 'Repetitive test cases executed by hand on each quarterly patch.' },
      { title: 'Agentic test runner', detail: 'AI agents execute and validate the repetitive cases, flagging downstream effects on order orchestration and fulfilment.' },
      { title: 'SQL-generation agent', detail: 'Turns natural-language data requests into SQL against the reporting layer.' },
      { title: 'Redesigned reporting workflow', detail: 'Generated queries feed planning dashboards directly.' },
      { title: 'Scheduled reporting', detail: 'A daily scheduler agent emails the prior day’s transactions for reconciliation.' },
    ],
    stack: ['Agentic AI', 'SQL', 'Power BI', 'Oracle Fusion SCM', 'UAT & test automation'],
    metrics: [
      { value: '75%', label: 'repetitive tests automated' },
      { value: '60%', label: 'less dashboard extraction time' },
      { value: '5', label: 'Oracle certs earned in 12 months' },
    ],
    highlights: [
      'Migrated a manual regression suite to an agentic AI-driven testing framework, automating 75% of repetitive execution.',
      'Cut dashboard data-extraction time by 60% with AI-assisted SQL generation.',
      'Built a project/requirement tracking agent for the Talent Supply Chain team.',
      'Shaped GenAI use cases with pre-sales and consulting teams for enterprise transformation proposals.',
    ],
  },
  {
    slug: 'esg-benchmark',
    title: 'ESG Benchmarking Framework',
    kicker: '42 KPIs · GRESB · GRIHA · BREEAM · EDGE',
    context: 'Nucleus Office Parks (a Blackstone company) · Summer 2024',
    pillars: ['esg'],
    featured: true,
    summary:
      'A rigorous, multi-source ESG benchmark for commercial real estate that fed the company’s first TCFD-aligned Sustainability Report.',
    problem:
      'Leadership needed to know where the portfolio stood on sustainability against the best commercial real estate operators.',
    architecture: [
      { title: 'Universe', detail: '1,000+ companies screened as the starting set.' },
      { title: '5-step multi-cohort screen', detail: 'Progressive filters narrowed the field to a final cohort of 10 leaders.' },
      { title: '42-KPI framework', detail: 'Four ESG segments referencing GRESB, GRIHA, BREEAM and EDGE; 100+ reports analysed.' },
      { title: 'Green-premium analysis', detail: '20 years of JLL REIS rental data across 5 cities.' },
      { title: 'Primary research', detail: '70+ office tenants interviewed alongside an AS-IS practice review.' },
      { title: 'Reporting', detail: 'Findings informed the 3rd Sustainability Report — TCFD introduced alongside BRSR and GRI.' },
    ],
    stack: ['GRESB', 'GRIHA', 'BREEAM', 'EDGE', 'BRSR', 'GRI', 'TCFD', 'Advanced Excel'],
    metrics: [
      { value: '1,000+ → 10', label: 'companies screened to cohort' },
      { value: '20+', label: 'green-premium instances' },
      { value: '12+', label: 'recommendations to leadership' },
    ],
    highlights: [
      'Built a 42-KPI benchmarking framework across four ESG segments.',
      'Analysed 100+ sustainability and annual reports to codify industry best practice.',
      'Co-authored the company’s first TCFD-aligned Sustainability Report, covering BRSR and GRI.',
      'Presented benchmarking findings to asset-management stakeholders.',
    ],
  },
  {
    slug: 'defence-textiles',
    title: 'Defence Technical Textiles',
    kicker: 'NPD · Vendor diversification · Vertical integration',
    context: 'Arvind Limited · Advanced Materials Division · 2021 – 2023',
    pillars: ['scm', 'esg'],
    summary:
      'End-to-end product development and supply chain for human-protection textiles — from DRDO partnership to shop-floor economics.',
    problem:
      'Defence-grade product lines depended on a single fibre supplier and outsourced fabric, and the lamination business needed a relaunch from zero.',
    architecture: [
      { title: 'Joint development', detail: 'Partnered with DRDO and DMSRDE on human-protection clothing for defence personnel.' },
      { title: 'Vendor diversification', detail: 'International sourcing of Nomex/Kevlar-class fibres, removing single-supplier dependency.' },
      { title: 'Vertical integration', detail: 'Brought lamination and quilting in-house — 3.5 lakh metres of fabric no longer outsourced.' },
      { title: 'CRM-based NPD pipeline', detail: '1,200+ daily development requests managed through MS CRM.' },
      { title: 'Commercialisation', detail: '10+ new products across 10 lines, launched alongside sales teams.' },
    ],
    stack: ['New product development', 'S&OP', 'Capacity planning', 'Vendor management', 'MS CRM', 'Capex / ROI modelling'],
    metrics: [
      { value: '60%', label: 'of Indian Army camouflage order' },
      { value: '₹45 Cr', label: 'revenue alongside sales teams' },
      { value: '9 mo', label: 'breakeven on ₹30 L line' },
    ],
    highlights: [
      'Generated ₹45 Cr in commercialisation revenue alongside sales teams through 10 new product launches.',
      'Cut production cost by 20% and saved ₹35 Lakh through vertical integration.',
      'Relaunched lamination with 150+ new products and a 1.5 lakh-metre order worth ₹6.7 Cr.',
      'Reduced PFC content, adopted eco-friendly packaging and recycled manufacturing waste under a 3R programme.',
      'Represented the defence portfolio at DefExpo 2022.',
    ],
  },
  {
    slug: 'social-listening',
    title: 'Social Listening Dashboard',
    kicker: 'LLM sentiment pipeline · Conversational analytics',
    context: 'Personal build',
    pillars: ['ai'],
    summary:
      'An end-to-end brand-sentiment pipeline with a dashboard you can talk to.',
    problem: 'Brand and market sentiment signals were scattered across platforms and hard to interrogate.',
    architecture: [
      { title: 'Collection', detail: 'Scrapes posts across 2 social platforms.' },
      { title: 'LLM scoring', detail: 'A large language model scores sentiment per post.' },
      { title: 'Cloud datastore + API', detail: 'Aggregates results and serves them to the dashboard.' },
      { title: 'Conversational widget', detail: 'Business users ask natural-language questions about sentiment trends.' },
    ],
    stack: ['Python', 'LLMs', 'Cloud datastore', 'REST API', 'Dashboarding'],
    metrics: [
      { value: '2', label: 'social platforms' },
      { value: 'Real-time', label: 'monitoring' },
      { value: 'NL', label: 'query widget' },
    ],
    highlights: [
      'Built the full pipeline from scraping to LLM sentiment scoring.',
      'Exposed results through an API-backed dashboard for real-time monitoring.',
      'Added a conversational query widget for business users.',
    ],
  },
]

/** Short-format live consulting projects from the MBA years. */
export const liveProjects = [
  {
    org: 'Takshashila Consulting',
    role: 'Strategy Consultant',
    period: 'Aug – Sep 2024',
    pillar: 'esg' as Pillar,
    text: 'District-level benchmarking and an eco-tourism roadmap repositioning Barwani as a hub for sustainable and cultural tourism.',
  },
  {
    org: 'Stashfin',
    role: 'Business Analytics',
    period: 'Nov 2023 – Jan 2024',
    pillar: 'ai' as Pillar,
    text: 'A tiered, gamified referral programme and AI-chatbot engagement for an NBFC instant-loan product.',
  },
]

/* ------------------------------------------------------------------ */
/* Journey timeline                                                    */
/* ------------------------------------------------------------------ */

export const timeline: TimelineEntry[] = [
  {
    id: 'nit',
    kind: 'education',
    pillar: 'scm',
    period: '2017 – 2021',
    org: 'NIT Jalandhar',
    orgNote: 'Dr. B. R. Ambedkar National Institute of Technology',
    role: 'B.Tech, Textile Technology',
    location: 'Jalandhar, India',
    summary: 'Learned how materials are engineered and manufactured — 77.20%, ranked 5th in cohort.',
    tags: ['Textile engineering', 'Manufacturing', 'Leadership'],
    tracks: [
      {
        label: 'Positions of responsibility',
        period: '2019 – 2021',
        points: [
          'Placement Coordinator — 30+ recruiters across 20+ HR relationships, 100% batch placement.',
          'Coordinator, techNITi ’19 — technical fest with 5,000+ footfall.',
          'Head, Rajbhasha Samiti; Hostel Secretary for 200+ students.',
        ],
      },
    ],
  },
  {
    id: 'himatsingka',
    kind: 'work',
    pillar: 'scm',
    period: 'Jun – Dec 2020',
    org: 'Himatsingka Linens',
    role: 'Graduate Engineering Trainee',
    location: 'Hassan, India',
    summary: 'Productivity improvement on a weaving manufacturing line.',
    tags: ['Kaizen', 'Power BI', 'Value stream mapping'],
    tracks: [
      {
        label: 'Weaving line productivity',
        period: '24 weeks',
        points: [
          'Reduced weft breakage by 30% and lifted line efficiency by 5% through Kaizen.',
          'Analysed 10,000 loom-hours in Power BI; applied VSM, fishbone and Pareto analysis.',
          'Recognised as Best Intern among 60 peers.',
        ],
      },
    ],
  },
  {
    id: 'arvind',
    kind: 'work',
    pillar: 'scm',
    period: '2021 – Jun 2023',
    org: 'Arvind Limited',
    orgNote: 'Advanced Materials Division',
    role: 'Graduate Engineering Trainee → Assistant Manager',
    location: 'Ahmedabad, India',
    summary: 'Product development and supply chain for defence and industrial technical textiles; promoted within 13 months.',
    tags: ['NPD', 'Supply chain', 'P&L ownership', 'Defence'],
    tracks: [
      {
        label: 'Assistant Manager, Product Development',
        period: 'Aug 2022 – Jun 2023',
        points: [
          'Generated ₹45 Cr in commercialisation revenue alongside sales teams across 10 product lines.',
          'Secured ~60% of the Indian Army’s digital-camouflage uniform order with DRDO and DMSRDE.',
          'Cut production cost by 20% and saved ₹35 Lakh by vertically integrating lamination and quilting.',
          'Reached breakeven within 9 months on a ₹30 Lakh production line.',
          'Employee of the Month (June 2023); represented the portfolio at DefExpo 2022.',
        ],
      },
      {
        label: 'Graduate Engineering Trainee',
        period: '2021 – Aug 2022',
        points: [
          'Ran supply-chain planning and production for lamination and quilting — demand planning, procurement and shop-floor execution.',
        ],
      },
    ],
  },
  {
    id: 'iim',
    kind: 'education',
    pillar: 'esg',
    period: '2023 – 2025',
    org: 'IIM Mumbai',
    orgNote: 'formerly NITIE · NIRF #6 (2025)',
    role: 'MBA, Sustainability Management',
    location: 'Mumbai, India',
    summary: 'Graduated with Distinction — CGPA 8.44. Electives in Investment Banking, Financial Markets and ESG Strategies for Business.',
    tags: ['ESG strategy', 'Sustainable finance', 'Consulting'],
    tracks: [
      {
        label: 'Summer intern, Sustainability & ESG — Nucleus Office Parks (a Blackstone company)',
        period: 'Summer 2024',
        points: [
          'Built a 42-KPI ESG benchmark; screened 1,000+ companies to a cohort of 10.',
          'Identified 20+ green-premium instances across 20 years of rental data in 5 cities.',
          'Co-authored the first TCFD-aligned Sustainability Report alongside BRSR and GRI.',
        ],
      },
      {
        label: 'Campus leadership & competitions',
        period: '2023 – 2025',
        points: [
          'Coordinator, Branding Cell — flash mobs across 3 locations, quarterly newsletter, “FinTech Unplugged” series.',
          'National Finalist, Bharti AXA Ideate Insight Insure; Finalist, Reckitt Career Compass.',
        ],
      },
    ],
  },
  {
    id: 'wipro',
    kind: 'work',
    pillar: 'ai',
    period: 'Jul 2025 – Present',
    org: 'Wipro Limited',
    orgNote: 'Microsoft Dynamics account',
    role: 'Functional Consultant',
    location: 'Bengaluru, India',
    summary: 'Enterprise ERP delivery with an AI layer on top — Oracle Fusion SCM first, then Dynamics 365 F&O and Copilot Studio.',
    tags: ['Oracle Fusion SCM', 'D365 F&O', 'Copilot Studio', 'GenAI'],
    tracks: [
      {
        label: 'Track 2 · Copilot Studio agents for Dynamics 365 F&O',
        period: 'Mar 2026 – Present',
        points: [
          'Developed 20+ AI agents across client engagements with Parent-Child orchestration and human-in-the-loop checkpoints.',
          'Built 10+ Power Automate flows integrated with agents for end-to-end automation.',
          'Delivered client demos and cost-benefit analyses that set AI investment thresholds.',
        ],
      },
      {
        label: 'Track 1 · Oracle Fusion SCM / Financials implementation',
        period: 'Jul – Nov 2025',
        points: [
          'Supported Order-to-Cash, supply-planning validation and quarterly patch-impact analysis.',
          'Automated 75% of repetitive regression testing; cut dashboard extraction time by 60%.',
          'Earned five Oracle certifications within 12 months; Best New Joinee award.',
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Recognition                                                         */
/* ------------------------------------------------------------------ */

export const awards = [
  { title: 'Best New Joinee', org: 'Wipro · Microsoft Dynamics account', year: '2026' },
  { title: 'MBA with Distinction', org: 'IIM Mumbai', year: '2025' },
  { title: 'National Finalist', org: 'Bharti AXA Ideate Insight Insure', year: '2024' },
  { title: 'Finalist', org: 'Reckitt Career Compass — FMCG supply chain', year: '2023' },
  { title: 'Employee of the Month', org: 'Arvind Limited', year: '2023' },
  { title: 'Best Intern of 60', org: 'Himatsingka Linens', year: '2020' },
  { title: 'District Table Tennis Champion', org: 'Table Tennis Association, Bikaner', year: '2014' },
  { title: 'Champion', org: 'Arvind Premier League (cricket)', year: '' },
]

/* ------------------------------------------------------------------ */
/* Skills matrix                                                       */
/* ------------------------------------------------------------------ */

export const skillGroups: SkillGroup[] = [
  {
    id: 'erp',
    title: 'ERP & Platforms',
    accent: 'scm',
    blurb: 'The enterprise systems I configure, test and build on.',
    skills: [
      { name: 'Oracle Fusion SCM', detail: 'O2C · Planning & Collaboration · WMS', projects: ['sccc', 'agentic-accelerators'] },
      { name: 'Dynamics 365 F&O', detail: 'Live client implementation', projects: ['d365-agents'] },
      { name: 'Copilot Studio', detail: 'Agent development', projects: ['d365-agents'] },
      { name: 'Power Automate', detail: '10+ production flows', projects: ['d365-agents'] },
      { name: 'Oracle AI Vector Search', projects: ['sccc'] },
      { name: 'Oracle Cloud Infrastructure', projects: ['sccc'] },
      { name: 'Google Cloud Platform', projects: ['rera-chatbot'] },
      { name: 'Microsoft CRM', projects: ['defence-textiles'] },
    ],
  },
  {
    id: 'tech',
    title: 'Tech & Code',
    accent: 'ai',
    blurb: 'How I build the AI and data layer.',
    skills: [
      { name: 'Python', projects: ['rera-chatbot', 'social-listening'] },
      { name: 'SQL / PostgreSQL', projects: ['agentic-accelerators', 'rera-chatbot'] },
      { name: 'LLMs & RAG', projects: ['sccc', 'rera-chatbot', 'social-listening'] },
      { name: 'Model Context Protocol', detail: 'MCP servers & tools', projects: ['rera-chatbot', 'd365-agents'] },
      { name: 'Agentic orchestration', detail: 'Parent-Child, human-in-the-loop', projects: ['d365-agents', 'agentic-accelerators'] },
      { name: 'Power BI & Advanced Excel', projects: ['agentic-accelerators', 'esg-benchmark'] },
      { name: 'Git & GitHub', projects: [] },
      { name: 'Overleaf / LaTeX', projects: [] },
    ],
  },
  {
    id: 'domain',
    title: 'Domain Practices',
    accent: 'esg',
    blurb: 'The business problems the technology serves.',
    skills: [
      { name: 'ESG benchmarking', detail: 'GRESB · GRIHA · BREEAM · EDGE', projects: ['esg-benchmark'] },
      { name: 'BRSR · GRI · TCFD reporting', projects: ['esg-benchmark'] },
      { name: 'Sales & Operations Planning', detail: 'S&OP', projects: ['defence-textiles'] },
      { name: 'Order-to-Cash lifecycle', detail: 'O2C', projects: ['agentic-accelerators', 'sccc'] },
      { name: 'Demand & supply planning', projects: ['sccc', 'defence-textiles'] },
      { name: 'Procurement & vendor management', projects: ['d365-agents', 'defence-textiles'] },
      { name: 'NPD & commercialisation', projects: ['defence-textiles'] },
      { name: 'Lean — Kaizen, VSM, Six Sigma tools', projects: [] },
    ],
  },
  {
    id: 'soft',
    title: 'Leadership & Collaboration',
    accent: 'ink',
    blurb: 'How the work gets adopted.',
    skills: [
      { name: 'Client demos & solutioning', projects: ['d365-agents'] },
      { name: 'Pre-sales use-case design', projects: ['agentic-accelerators'] },
      { name: 'P&L ownership', projects: ['defence-textiles'] },
      { name: 'Business cases & capex/ROI', projects: ['defence-textiles', 'd365-agents'] },
      { name: 'Partnering with DRDO & DMSRDE', projects: ['defence-textiles'] },
      { name: 'Primary research & stakeholder interviews', projects: ['esg-benchmark'] },
      { name: 'Team & event leadership', projects: [] },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export const certifications: { name: string; issuer: string; date?: string; pillar: Pillar }[] = [
  { name: 'Planning and Collaboration Cloud 2026 Certified Implementation Professional', issuer: 'Oracle', date: 'Jun 2026', pillar: 'scm' },
  { name: 'Warehouse Management Cloud 2026 Certified Implementation Professional', issuer: 'Oracle', date: 'Jun 2026', pillar: 'scm' },
  { name: 'AI Vector Search Certified Professional', issuer: 'Oracle', date: 'Jan 2026', pillar: 'ai' },
  { name: 'OCI 2025 Certified Generative AI Professional', issuer: 'Oracle', date: 'Jan 2026', pillar: 'ai' },
  { name: 'Order Management Cloud Order-to-Cash 2025 Certified Implementation Professional', issuer: 'Oracle', date: '2025', pillar: 'scm' },
  { name: 'OCI AI and Data Platform Foundations Associate', issuer: 'Oracle', date: '2025', pillar: 'ai' },
  { name: 'Fusion Cloud Applications ERP / SCM / CX / HCM Process Essentials', issuer: 'Oracle', pillar: 'scm' },
  { name: 'Principles of Sustainable Finance', issuer: 'Stanford · Coursera', pillar: 'esg' },
  { name: 'Advanced Valuation and Strategy', issuer: 'Arizona State University · Coursera', pillar: 'esg' },
  { name: 'Adaptive Markets: Financial Market Dynamics and Human Behavior', issuer: 'MIT · edX', pillar: 'esg' },
  { name: 'Product Management Professional Certificate', issuer: 'Aha! · LinkedIn Learning', pillar: 'ai' },
  { name: 'Introduction to ESG', issuer: 'LinkedIn Learning', pillar: 'esg' },
  { name: 'Learning Design for Sustainability / Sustainability Strategies', issuer: 'LinkedIn Learning', pillar: 'esg' },
  { name: 'Game Theory', issuer: 'LinkedIn Learning', pillar: 'esg' },
  { name: 'BCG Climate & Sustainability Virtual Experience', issuer: 'Forage', pillar: 'esg' },
]

/** Lookup helper used by the skills matrix to resolve project titles. */
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
