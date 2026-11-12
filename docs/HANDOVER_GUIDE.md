# Doxa Protocol — Technical Architecture & Handover Guide

## 1. Project Overview & Objectives
**Doxa** is a high-performance, conversion-optimized landing page engineered for a next-generation decentralized zero-knowledge consensus layer and autonomous AI agent cloud.

### Core Technical Targets
* **Target LCP**: < 1.0s on 4G and edge connections
* **Lighthouse Score**: > 90 across Performance, Accessibility, Best Practices, and SEO
* **Accessibility**: Full compliance with **WCAG 2.1 AA** (high contrast ratios, keyboard navigation, visible focus rings, ARIA landmarks, screen-reader friendly states)
* **Architecture**: Component-Driven Architecture (CDA) using the Atomic Design methodology

---

## 2. Component-Driven Architecture (CDA) Matrix

```
src/
├── app/
│   ├── layout.tsx         # Root layout with SEO metadata & JSON-LD schema
│   ├── page.tsx           # Assembled high-conversion landing page
│   └── globals.css        # Tailwind tokens, glassmorphism, glow utilities
├── components/
│   ├── atoms/             # Fundamental building blocks
│   │   ├── Badge.tsx      # Multi-variant status badge with ping animation
│   │   ├── Button.tsx     # Polymorphic button (primary, glow, outline, ghost)
│   │   ├── Card.tsx       # Glassmorphism container with hover effects
│   │   ├── GradientText.tsx # Accessible high-contrast gradient text
│   │   ├── Input.tsx      # Accessible form input with leading/trailing icons
│   │   └── Icons.tsx      # Zero-dependency, tree-shaken SVG icon library
│   ├── molecules/         # Composed UI elements
│   │   ├── MetricCard.tsx # Animated stat with trend indicator
│   │   ├── FeatureCard.tsx# Bento-grid card with glowing backdrop & tags
│   │   ├── ArchitectureStep.tsx # Interactive step selector
│   │   ├── CodeWindow.tsx # macOS/terminal code display with clipboard copy
│   │   ├── TestimonialCard.tsx # Institutional review card with verified badge
│   │   ├── FaqItem.tsx    # Accessible collapsible accordion
│   │   └── WaitlistForm.tsx # Conversion form with instant validation & feedback
│   └── organisms/         # Full page sections
│       ├── Navbar.tsx     # Sticky glassmorphic nav with mobile drawer & live TPS
│       ├── HeroSection.tsx# High-impact headline, CTAs, and live node simulator
│       ├── MetricsBar.tsx # 4-column credibility metrics grid
│       ├── BentoFeatures.tsx # 6-card bento grid highlighting protocol capabilities
│       ├── ArchitectureSection.tsx # Interactive 4-phase protocol flow + live code
│       ├── TestimonialsSection.tsx # Institutional partner validation
│       ├── FaqSection.tsx # Interactive developer accordion
│       ├── CtaSection.tsx # Glowing aurora conversion banner
│       └── Footer.tsx     # Semantic multi-column footer & network health
└── lib/
    ├── constants.ts       # Centralized brand, navigation, metric, and feature data
    └── utils.ts           # Class merging (cn) and number formatting helpers
```

---

## 3. Component Prop Tables & Design Tokens

### 3.1 `Button`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'glow' \| 'outline' \| 'ghost'` | `'primary'` | Visual style treatment |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding and font size |
| `isLoading` | `boolean` | `false` | Displays accessible loading spinner |
| `leftIcon` | `ReactNode` | `undefined` | Icon element before label |
| `rightIcon` | `ReactNode` | `undefined` | Icon element after label |
| `disabled` | `boolean` | `false` | Disables interaction and dims opacity |

### 3.2 `Badge`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'cyan' \| 'violet' \| 'emerald' \| 'amber' \| 'neutral' \| 'outline'` | `'cyan'` | Background and border color token |
| `size` | `'sm' \| 'md'` | `'md'` | Compact or standard sizing |
| `ping` | `boolean` | `false` | Displays an animated pulsing radar dot |

### 3.3 `FeatureCard`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Required** | Unique identifier |
| `badge` | `string` | **Required** | Category tag |
| `title` | `string` | **Required** | Feature heading |
| `description`| `string` | **Required** | Feature explanation |
| `icon` | `string` | **Required** | Icon name resolved by `IconResolver` |
| `metricsHighlight` | `string` | `undefined` | Key benchmark stat (e.g. `38ms proofs`) |

---

## 4. Local Environment Setup & Run Guide

### Prerequisites
* **Node.js**: v20+ (tested on Node v24.13.0)
* **npm**: v10+

### Step-by-Step Execution
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Navigate to http://localhost:3000
```

### Production Build & Linting
```bash
# Run ESLint validation
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 5. Performance Optimization & Core Web Vitals Checklist

1. **Largest Contentful Paint (LCP) < 1.0s**:
   - Above-the-fold hero content is rendered via Server Components with pure CSS-driven ambient glow effects instead of heavy raster images.
   - Zero blocking JavaScript in the initial HTML document payload.
2. **First Input Delay (FID) / Interaction to Next Paint (INP)**:
   - Interactive components (`WaitlistForm`, `FaqItem`, `ArchitectureSection`) are client-hydrated with minimal bundle footprint.
3. **Cumulative Layout Shift (CLS) = 0.00**:
   - Fixed aspect-ratio containers and explicit dimension boundaries across hero cards and typography.
4. **Search Engine Optimization (SEO)**:
   - Automated JSON-LD structured schema (`SoftwareApplication`).
   - Dynamic Open Graph and Twitter Card tags.
   - Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`).

---

## 6. Deployment Pipelines (Vercel & Cloudflare Pages)

### Vercel Deployment (Recommended)
1. Push your branch to GitHub.
2. Connect the repository in the Vercel Dashboard.
3. Configure settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

