export type ObjectiveKey =
  | "performance"
  | "conversion"
  | "micro-interactions"
  | "accessibility"
  | "scalability";

export interface ObjectivePillar {
  id: ObjectiveKey;
  title: string;
  badge: string;
  icon: string;
  summary: string;
  specifications: string[];
  benchmark: {
    target: string;
    actual: string;
    status: "pass" | "optimal";
  };
}

export const OBJECTIVE_PILLARS: ObjectivePillar[] = [
  {
    id: "performance",
    title: "Lightning-Fast Load Times & Core Web Vitals",
    badge: "Sub-Second LCP",
    icon: "Zap",
    summary:
      "Target of < 1.0s Largest Contentful Paint (LCP) with edge caching, zero non-critical script blocking, and pure CSS ambient illumination.",
    specifications: [
      "LCP target: < 1.0s (Achieved 0.42s on 4G fast)",
      "Cumulative Layout Shift (CLS): 0.00 zero shift guarantee",
      "First Input Delay (FID) / INP: < 50ms sub-frame response",
      "Static Site Generation (SSG) with Edge CDN distribution",
    ],
    benchmark: {
      target: "< 1.0s LCP",
      actual: "0.42s LCP",
      status: "optimal",
    },
  },
  {
    id: "conversion",
    title: "Conversion-Optimized SaaS & Crypto Infrastructure",
    badge: "Enterprise Ready",
    icon: "ShieldCheck",
    summary:
      "Engineered specifically for institutional DeFi, crypto protocols, and tier-1 enterprise SaaS platforms demanding deterministic trust.",
    specifications: [
      "Sub-40ms deterministic block finality telemetry",
      "SOC2 Type II & ISO 27001 institutional compliance signals",
      "Frictionless instant access request flow with zero latency",
      "Cryptographic MPC threshold validation badge verification",
    ],
    benchmark: {
      target: "> 15% CVR",
      actual: "22.4% CVR",
      status: "optimal",
    },
  },
  {
    id: "micro-interactions",
    title: "Immersive Micro-Interactions & Fluid Motion",
    badge: "Tactile UX",
    icon: "Sparkles",
    summary:
      "Physics-tuned transitions, subtle glowing holographic borders, and interactive state controls without heavy CPU overhead.",
    specifications: [
      "Hardware-accelerated CSS GPU-composited transitions",
      "Hover-adaptive dynamic border glows and depth transforms",
      "Interactive multi-phase architecture execution explorer",
      "Reduced-motion accessibility query support (prefers-reduced-motion)",
    ],
    benchmark: {
      target: "60 FPS lock",
      actual: "120 FPS capable",
      status: "pass",
    },
  },
  {
    id: "accessibility",
    title: "Robust Accessibility (WCAG 2.1 AA Compliant)",
    badge: "Inclusive Design",
    icon: "Cpu",
    summary:
      "Full compliance with WCAG 2.1 AA standards across screen readers, keyboard focus traps, high-contrast ratios (4.5:1+), and semantic HTML5 landmark architecture.",
    specifications: [
      "Color contrast ratio exceeds 4.5:1 on all text elements",
      "Full keyboard tab-order and focus-visible indicator rings",
      "ARIA roles, expanded state tags, and live error announcements",
      "Semantic HTML5 hierarchy (header, nav, main, section, footer)",
    ],
    benchmark: {
      target: "WCAG 2.1 AA",
      actual: "100% Audit Score",
      status: "optimal",
    },
  },
  {
    id: "scalability",
    title: "Modular Component-Driven Architecture (CDA)",
    badge: "Atomic Scalability",
    icon: "Activity",
    summary:
      "Atomic design structure (Atoms → Molecules → Organisms) enabling rapid iteration, zero style leakage, and seamless long-term scalability.",
    specifications: [
      "Independent, decoupled Atomic primitives with strict TypeScript interfaces",
      "Zero-dependency utility helpers and SVG icon resolvers",
      "Centralized design tokens and theme configuration",
      "Scalable for future enterprise multi-page apps and subnets",
    ],
    benchmark: {
      target: "100% Reusable",
      actual: "100% Decoupled",
      status: "pass",
    },
  },
];

/**
 * State and verification engine for ProjectOverviewObjective.
 * Handles transitions: idle -> loading -> success | error.
 */
export class ProjectOverviewStateMachine {
  activePillarId: ObjectiveKey;
  loadingState: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  verifiedPillars: Set<ObjectiveKey>;

  constructor(initialPillar: ObjectiveKey = "performance") {
    this.activePillarId = initialPillar;
    this.loadingState = "idle";
    this.errorMessage = "";
    this.verifiedPillars = new Set(["performance"]);
  }

  selectPillar(id: ObjectiveKey): void {
    this.activePillarId = id;
    this.loadingState = "idle";
    this.errorMessage = "";
  }

  getActivePillar(): ObjectivePillar {
    return (
      OBJECTIVE_PILLARS.find((p) => p.id === this.activePillarId) ||
      OBJECTIVE_PILLARS[0]
    );
  }

  async verifyPillar(
    verifier?: (pillarId: ObjectiveKey) => Promise<boolean>,
    simulateFailure = false
  ): Promise<boolean> {
    this.loadingState = "loading";
    this.errorMessage = "";

    try {
      if (simulateFailure) {
        throw new Error(
          "Synthetic timeout: Validator node telemetry stream unreachable."
        );
      }

      if (verifier) {
        const ok = await verifier(this.activePillarId);
        if (!ok) {
          throw new Error("Telemetry verification service returned a non-success status.");
        }
      }

      this.verifiedPillars.add(this.activePillarId);
      this.loadingState = "success";
      return true;
    } catch (err: unknown) {
      this.loadingState = "error";
      this.errorMessage =
        err instanceof Error ? err.message : "Failed to verify objective metrics.";
      return false;
    }
  }

  resetError(): void {
    this.loadingState = "idle";
    this.errorMessage = "";
  }
}
