export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Product Design" | "Creative Development" | "Data Experience" | "Mobile Product" | "AI Product" | "Commerce";
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
  status: string;
}

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

export const sampleProjects: Project[] = [
  {
    id: "quantum-ux",
    slug: "quantum-ux",
    title: "Quantum UX",
    category: "Product Design",
    summary: "A sample design-system and dashboard case study.",
    challenge: "Fragmented UI components across cross-platform product teams led to visual discrepancies, accessibility defects, and high maintenance overhead.",
    role: "UI/UX Design and Frontend Architecture",
    services: ["Design System", "Component Architecture", "WCAG 2.1 AA Audit"],
    tools: ["Figma", "React", "TypeScript", "Tailwind CSS"],
    deliverables: [
      "Mathematical type and spacing scale with semantic token map",
      "50+ accessible React components with automated Jest unit tests",
      "Zero-runtime design token export engine",
    ],
    outcome: "Outcome details to be added.",
    image: "/projects/quantum-ux.svg",
    accent: "#98F238",
    featured: true,
    status: "Sample project",
  },
  {
    id: "aura-webgl",
    slug: "aura-webgl",
    title: "Aura WebGL",
    category: "Creative Development",
    summary: "A sample interactive product experience focused on careful WebGL performance.",
    challenge: "Complex particle geometry and spatial lighting caused frame throttling on mobile chipsets and integrated GPUs.",
    role: "Creative Development and 3D Interaction",
    services: ["WebGL Development", "Shader Engineering", "Performance Optimization"],
    tools: ["React Three Fiber", "Three.js", "GSAP", "GLSL"],
    deliverables: [
      "InstancedMesh geometry pipeline rendering 10,000 particles at 60 FPS",
      "Custom vertex/fragment shaders with offscreen culling",
      "Graceful 2D vector fallback for battery-saving mode",
    ],
    outcome: "Outcome details to be added.",
    image: "/projects/aura-webgl.svg",
    accent: "#98F238",
    featured: false,
    status: "Sample project",
  },
  {
    id: "nexus-data",
    slug: "nexus-data",
    title: "Nexus Data",
    category: "Data Experience",
    summary: "A sample analytics interface designed for fast scanning and complex workflows.",
    challenge: "Quantitative analysts struggled with visual clutter, slow table virtualization, and latency when tracking multi-stream tickers.",
    role: "Product Design and Data Visualization",
    services: ["Information Architecture", "Dashboard Design", "Data Virtualization"],
    tools: ["React", "TypeScript", "charting library", "Canvas API"],
    deliverables: [
      "Sub-millisecond data table virtualization with zero layout shift",
      "High-contrast color-blind friendly data visualization palettes",
      "Custom time-series charting engine running in Web Workers",
    ],
    outcome: "Outcome details to be added.",
    image: "/projects/nexus-dashboard.svg",
    accent: "#98F238",
    featured: false,
    status: "Sample project",
  },
  {
    id: "field-notes",
    slug: "field-notes",
    title: "Field Notes",
    category: "Mobile Product",
    summary: "A sample offline-ready field-work application concept.",
    challenge: "Field engineers working in remote industrial areas required reliable, zero-connectivity inspection logging with local sync.",
    role: "Product Strategy and UI Engineering",
    services: ["PWA Architecture", "Offline Sync", "Mobile UX"],
    tools: ["Next.js", "PWA", "local storage", "IndexedDB"],
    deliverables: [
      "Offline-first Service Worker cache with background sync",
      "Touch-optimized input controls meeting 48px minimum target size",
      "Local conflict-resolution log for multi-operator entries",
    ],
    outcome: "Outcome details to be added.",
    image: "/projects/field-notes.svg",
    accent: "#98F238",
    featured: false,
    status: "Sample project",
  },
  {
    id: "signal-ai",
    slug: "signal-ai",
    title: "Signal AI",
    category: "AI Product",
    summary: "A sample human-centered AI workspace with transparent interaction states.",
    challenge: "Users felt alienated by opaque non-deterministic AI generation states and lacked actionable editing controls.",
    role: "AI UX and Frontend Engineering",
    services: ["AI Interaction Design", "Streaming UI", "Prompt Studio"],
    tools: ["React", "TypeScript", "local sample data", "Framer Motion"],
    deliverables: [
      "Transparent multi-step reasoning drawer with cancel/replay hooks",
      "Streaming markdown parser with zero layout jitter",
      "Confidence-score visual indicators and provenance inspection",
    ],
    outcome: "Outcome details to be added.",
    image: "/projects/signal-ai.svg",
    accent: "#98F238",
    featured: false,
    status: "Sample project",
  },
  {
    id: "northstar-commerce",
    slug: "northstar-commerce",
    title: "Northstar Commerce",
    category: "Commerce",
    summary: "A sample premium shopping and product-discovery experience.",
    challenge: "High cart abandonment due to complex checkout steps and slow image transitions between variant views.",
    role: "UX Direction and Interaction Design",
    services: ["E-Commerce UX", "Micro-Interactions", "Checkout Architecture"],
    tools: ["Next.js", "TypeScript", "Motion", "Tailwind CSS"],
    deliverables: [
      "Streamlined two-step drawer checkout flow with express payment integration",
      "Subtle spring-physics product gallery with touch-friendly scrubbing",
      "Optimized Core Web Vitals scoring 99 on PageSpeed Insights",
    ],
    outcome: "Outcome details to be added.",
    image: "/projects/northstar-commerce.svg",
    accent: "#98F238",
    featured: false,
    status: "Sample project",
  },
];
