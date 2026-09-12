export const PROJECT_CATEGORIES = [
  "All",
  "Product Design",
  "Creative Development",
  "Data Experience",
  "Mobile Product",
  "AI Product",
  "Commerce",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectItemCategory = Exclude<ProjectCategory, "All">;

export type ProjectStatus = "Completed" | "In Production" | "Case Study" | "Active";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectItemCategory;
  summary: string;
  challenge: string;
  role: string;
  services: string[];
  tools: string[];
  deliverables: string[];
  outcome: string;
  image: string;
  accent: string;
  featured: boolean;
  status: ProjectStatus;
}

/**
 * Normalizes a potentially partial or undefined project object, ensuring all
 * array fields (tools, services, deliverables) and string values are safely populated.
 */
export function normalizeProject(project?: Partial<Project> | null): Project {
  return {
    id: project?.id ?? "untitled-project",
    slug: project?.slug ?? "untitled-project",
    title: project?.title ?? "Untitled Case Study",
    category: project?.category ?? "Product Design",
    summary: project?.summary ?? "Comprehensive digital product case study and systems architecture.",
    challenge: project?.challenge ?? "Detailed architectural challenge analysis and constraints.",
    role: project?.role ?? "Design Systems & Frontend Architecture",
    services: Array.isArray(project?.services) ? [...project.services] : [],
    tools: Array.isArray(project?.tools) ? [...project.tools] : [],
    deliverables: Array.isArray(project?.deliverables) ? [...project.deliverables] : [],
    outcome: project?.outcome ?? "Delivered measurable engineering and user experience improvements.",
    image: project?.image ?? "/projects/quantum-ux.svg",
    accent: project?.accent ?? "#98F238",
    featured: Boolean(project?.featured),
    status: (project?.status ?? "Completed") as ProjectStatus,
  };
}

/**
 * Safely extracts the tools array from a project with fallback to an empty array.
 */
export function getProjectTools(project?: Partial<Project> | null): string[] {
  if (!project || !Array.isArray(project.tools)) {
    return [];
  }
  return project.tools.filter((tool): tool is string => typeof tool === "string" && tool.trim().length > 0);
}

/**
 * Safely extracts the services array from a project with fallback to an empty array.
 */
export function getProjectServices(project?: Partial<Project> | null): string[] {
  if (!project || !Array.isArray(project.services)) {
    return [];
  }
  return project.services.filter((service): service is string => typeof service === "string" && service.trim().length > 0);
}

/**
 * Safely extracts the deliverables array from a project with fallback to an empty array.
 */
export function getProjectDeliverables(project?: Partial<Project> | null): string[] {
  if (!project || !Array.isArray(project.deliverables)) {
    return [];
  }
  return project.deliverables.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

/**
 * Returns a guaranteed valid list of projects filtered by category.
 */
export function getProjectsByCategory(
  category: ProjectCategory = "All",
  projects: Project[] = sampleProjects
): Project[] {
  const safeList = Array.isArray(projects) ? projects.map(normalizeProject) : [];
  if (category === "All") {
    return safeList;
  }
  return safeList.filter((p) => p.category === category);
}

/**
 * Retrieves the featured project from a list with fallback to the first item or a normalized default.
 */
export function getFeaturedProject(projects: Project[] = sampleProjects): Project {
  if (!Array.isArray(projects) || projects.length === 0) {
    return normalizeProject(sampleProjects[0]);
  }
  const found = projects.find((p) => p && p.featured);
  return normalizeProject(found ?? projects[0]);
}

export const sampleProjects: Project[] = [
  {
    id: "quantum-ux",
    slug: "quantum-ux",
    title: "Quantum UX",
    category: "Product Design",
    summary: "Comprehensive enterprise design system and analytical dashboard.",
    challenge: "Fragmented UI components across cross-platform product teams led to visual discrepancies, accessibility defects, and high maintenance overhead.",
    role: "Lead UI/UX Design & Frontend Architecture",
    services: ["Design System Architecture", "Accessible Component Library", "WCAG 2.1 AA Audit", "Design Token Engine"],
    tools: ["Figma", "React 19", "TypeScript", "Tailwind CSS", "Storybook"],
    deliverables: [
      "Mathematical type and spacing scale with semantic token mapping",
      "50+ accessible React components with automated regression tests",
      "Zero-runtime design token compilation engine for web and mobile",
    ],
    outcome: "Reduced UI regression defects by 85% and accelerated engineering velocity across 4 cross-functional product teams.",
    image: "/projects/quantum-ux.svg",
    accent: "#98F238",
    featured: true,
    status: "Completed",
  },
  {
    id: "aura-webgl",
    slug: "aura-webgl",
    title: "Aura WebGL",
    category: "Creative Development",
    summary: "Interactive 3D product visualizer optimized for fluid WebGL performance and spatial interaction.",
    challenge: "Complex particle geometry and spatial lighting calculations caused severe frame throttling on mobile chipsets and integrated GPUs.",
    role: "Creative Development & 3D Interaction Engineering",
    services: ["WebGL Experience Design", "Custom GLSL Shader Engineering", "Runtime Performance Profiling"],
    tools: ["React Three Fiber", "Three.js", "GSAP ScrollTrigger", "GLSL Shaders"],
    deliverables: [
      "InstancedMesh geometry pipeline rendering 10,000 interactive particles at 60 FPS",
      "Custom vertex and fragment shaders with dynamic offscreen frustum culling",
      "Graceful SVG vector fallback path for low-power battery-saving modes",
    ],
    outcome: "Maintained sustained 60 FPS rendering across mobile hardware, increasing average session duration by 140%.",
    image: "/projects/aura-webgl.svg",
    accent: "#98F238",
    featured: false,
    status: "Completed",
  },
  {
    id: "nexus-data",
    slug: "nexus-data",
    title: "Nexus Data",
    category: "Data Experience",
    summary: "High-density financial intelligence interface designed for rapid scanning and multi-stream telemetry.",
    challenge: "Quantitative analysts struggled with interface lag, unoptimized DOM virtualization, and high latency when tracking live market data.",
    role: "Product Design & High-Frequency Data Visualization",
    services: ["Information Architecture", "Telemetry Dashboard Design", "Virtual DOM Optimization"],
    tools: ["React 19", "TypeScript", "Apache ECharts", "HTML5 Canvas API", "Web Workers"],
    deliverables: [
      "Sub-millisecond data table virtualization handling 50,000 rows with zero layout shift",
      "High-contrast, accessible color-blind compliant data visualization themes",
      "Dedicated time-series calculation pipeline executing on Web Worker threads",
    ],
    outcome: "Eliminated UI thread blocking during high-volume data bursts, enabling analysts to monitor 3x more concurrent feeds.",
    image: "/projects/nexus-dashboard.svg",
    accent: "#98F238",
    featured: false,
    status: "Completed",
  },
  {
    id: "field-notes",
    slug: "field-notes",
    title: "Field Notes",
    category: "Mobile Product",
    summary: "Mission-critical, offline-first inspection and telemetry logging platform for remote industrial sites.",
    challenge: "Field service technicians operating in remote industrial zones required reliable offline telemetry entry with seamless background reconciliation.",
    role: "Product Strategy & Full-Stack UI Engineering",
    services: ["PWA System Architecture", "Offline State Synchronization", "Industrial Ergonomics UX"],
    tools: ["Next.js", "PWA Service Workers", "IndexedDB", "Dexie.js", "Tailwind CSS"],
    deliverables: [
      "Deterministic offline Service Worker caching with background sync queue",
      "Touch-optimized ergonomic controls exceeding 48px minimum hit-target standards",
      "Local differential conflict-resolution algorithm for multi-operator logs",
    ],
    outcome: "Achieved 100% data fidelity across zero-connectivity shifts, replacing error-prone paper workflows entirely.",
    image: "/projects/field-notes.svg",
    accent: "#98F238",
    featured: false,
    status: "Completed",
  },
  {
    id: "signal-ai",
    slug: "signal-ai",
    title: "Signal AI",
    category: "AI Product",
    summary: "Human-centered generative AI workspace emphasizing transparent cognitive states and deterministic control.",
    challenge: "Enterprises experienced low user adoption due to opaque LLM latency states, hallucination ambiguity, and lack of granular editing controls.",
    role: "AI UX Design & Streaming Architecture",
    services: ["AI Interaction Systems", "Streaming Response Architecture", "Prompt Inspection Studio"],
    tools: ["React 19", "TypeScript", "Vercel AI SDK", "Framer Motion", "Server-Sent Events"],
    deliverables: [
      "Transparent multi-phase reasoning drawer with interactive step inspection and cancellation hooks",
      "Chunk-buffered streaming markdown renderer with zero cumulative layout shift (CLS)",
      "Visual confidence scores and source provenance citation inspector",
    ],
    outcome: "Elevated user trust scores by 42% through clear explainability patterns and predictable streaming ergonomics.",
    image: "/projects/signal-ai.svg",
    accent: "#98F238",
    featured: false,
    status: "Completed",
  },
  {
    id: "northstar-commerce",
    slug: "northstar-commerce",
    title: "Northstar Commerce",
    category: "Commerce",
    summary: "Ultra-fast headless luxury commerce experience engineered for instant product discovery and frictionless checkout.",
    challenge: "Stagnant conversion rates driven by multi-second page loads, jarring layout jumps during image switches, and cumbersome checkout friction.",
    role: "UX Direction & Headless Frontend Engineering",
    services: ["Headless E-Commerce UX", "Fluid Micro-Interactions", "Checkout Funnel Optimization"],
    tools: ["Next.js App Router", "TypeScript", "Framer Motion", "Tailwind CSS", "Stripe Elements"],
    deliverables: [
      "Streamlined two-click modal drawer checkout flow supporting Apple Pay and Google Pay",
      "Spring-physics multi-angle image gallery with touch-friendly carousel scrubbers",
      "99/100 Core Web Vitals rating with sub-800ms Time to First Byte (TTFB)",
    ],
    outcome: "Boosted conversion rates by 24% and dropped average checkout duration to under 40 seconds.",
    image: "/projects/northstar-commerce.svg",
    accent: "#98F238",
    featured: false,
    status: "Completed",
  },
];
