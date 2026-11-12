export const SITE_CONFIG = {
  name: "Doxa",
  tagline: "The Hyper-Scale Zero-Knowledge Consensus & Agent Cloud",
  description:
    "Doxa is the next-generation decentralized infrastructure engineered for institutional DeFi, autonomous AI agent execution, and sub-second deterministic settlement.",
  url: "https://doxa.network",
  ogImage: "https://doxa.network/og.png",
  links: {
    docs: "#docs",
    github: "https://github.com/doxa-network",
    twitter: "https://x.com/doxanetwork",
    discord: "https://discord.gg/doxa",
  },
};

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Performance", href: "#metrics" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const METRICS = [
  {
    id: "lcp",
    value: "< 38ms",
    label: "Block Finality",
    description: "Sub-second deterministic cryptographic settlement",
    change: "+480% vs Tendermint",
    trend: "up",
  },
  {
    id: "tps",
    value: "140,000+",
    label: "Peak Scaled TPS",
    description: "Multi-threaded pipelined ZK-SNARK verifier",
    change: "Parallelized",
    trend: "up",
  },
  {
    id: "uptime",
    value: "99.999%",
    label: "Edge Reliability",
    description: "Global decentralized validator mesh across 42 regions",
    change: "Institutional SLA",
    trend: "neutral",
  },
  {
    id: "volume",
    value: "$14.8B+",
    label: "Verified Asset Volume",
    description: "Total cross-chain institutional TVS secured",
    change: "+124% QoQ",
    trend: "up",
  },
];

export const FEATURES = [
  {
    id: "zk-prover",
    badge: "Cryptographic Core",
    title: "Sub-40ms ZK Proof Engine",
    description:
      "Hardware-accelerated recursive STARK-to-SNARK folding pipelines yielding verifiable zero-knowledge state transitions at enterprise volume.",
    icon: "ShieldCheck",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderHighlight: "group-hover:border-cyan-500/50",
    metricsHighlight: "38ms proofs",
  },
  {
    id: "ai-agents",
    badge: "Autonomous Execution",
    title: "Verifiable AI Agent Sandbox",
    description:
      "Run autonomous off-chain LLM agents whose reasoning trajectories, external API calls, and smart contract executions are deterministically attested on-chain.",
    icon: "Cpu",
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    borderHighlight: "group-hover:border-violet-500/50",
    metricsHighlight: "TEE + ZK Attested",
  },
  {
    id: "mpc-vault",
    badge: "Institutional Security",
    title: "MPC Threshold Key Sharding",
    description:
      "Stateless Multi-Party Computation with zero single point of failure. Compliant with SOC2 Type II, ISO 27001, and FIPS 140-3 Level 4 HSM specifications.",
    icon: "KeyRound",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderHighlight: "group-hover:border-emerald-500/50",
    metricsHighlight: "SOC2 Type II",
  },
  {
    id: "edge-mesh",
    badge: "Global Edge",
    title: "Global Low-Latency Validator Mesh",
    description:
      "Geo-distributed validator clusters spanning 42 tier-4 data centers worldwide, delivering low-jitter peer-to-peer gossip protocol over QUIC and WireGuard.",
    icon: "Globe",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderHighlight: "group-hover:border-amber-500/50",
    metricsHighlight: "42 Edge PoPs",
  },
  {
    id: "developer-dx",
    badge: "Developer Experience",
    title: "One-Click EVM & Rust Interoperability",
    description:
      "Write smart contracts in Solidity, Rust, or TypeScript. Ship to production with instant hot-reloading, automated test mocks, and CLI telemetry.",
    icon: "Terminal",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    borderHighlight: "group-hover:border-pink-500/50",
    metricsHighlight: "Full EVM Equivalence",
  },
  {
    id: "compliance",
    badge: "Institutional Audit",
    title: "Cryptographic Privacy with Selective Disclosure",
    description:
      "Zero-knowledge compliance proofs verify KYC/AML credentials without leaking confidential customer wallet balances or proprietary transaction metadata.",
    icon: "Lock",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    borderHighlight: "group-hover:border-indigo-500/50",
    metricsHighlight: "ZK-KYC Ready",
  },
];

export const ARCHITECTURE_STEPS = [
  {
    step: "01",
    phase: "State Ingestion",
    title: "Zero-Overhead QUIC Telemetry",
    description:
      "High-throughput transactions and AI agent execution intents arrive via multiplexed QUIC streams with cryptographic signature validation at the edge.",
    codeSnippet: `// 1. Ingest batch intent over QUIC
const session = await doxa.connect({
  transport: "quic",
  cluster: "eu-central-edge",
  credentials: mpcKey.ephemeral()
});
const stream = session.openIntentStream();`,
  },
  {
    step: "02",
    phase: "Parallel Execution",
    title: "Deterministic Multi-Threaded VM",
    description:
      "Transactions are parallelized across optimistic execution pipelines using conflict-free replicated data types (CRDT) and speculative branching.",
    codeSnippet: `// 2. Schedule parallel execution graph
const dag = compiler.buildExecutionGraph(batch);
const evaluated = await vm.evaluateParallel(dag, {
  threads: 64,
  stateRoot: currentEpoch.merkleRoot
});`,
  },
  {
    step: "03",
    phase: "Zero-Knowledge Prover",
    title: "Recursive Proof Folding",
    description:
      "Execution state transitions are folded into recursive Halo2 / STARK circuits, compressing 50,000 operations into a tiny 48-byte proof certificate.",
    codeSnippet: `// 3. Generate recursive succinct proof
const zkProof = await prover.foldTransitions({
  witness: evaluated.witness,
  publicInputs: evaluated.stateCommitments
});
console.log("Proof size:", zkProof.byteLength, "bytes"); // 48B`,
  },
  {
    step: "04",
    phase: "Consensus & Finality",
    title: "Instant Global Settlement",
    description:
      "The compressed proof is broadcasted to the decentralized validator consensus layer, achieving irreversible sub-40ms finality with cryptographic receipts.",
    codeSnippet: `// 4. Broadcast proof & verify finality
const receipt = await consensus.finalizeBlock(zkProof);
assert(receipt.latencyMs < 40);
console.log("Tx finalized at epoch:", receipt.epoch);`,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Doxa allowed our quantitative trading infrastructure to migrate from centralized order books to a decentralized zero-knowledge mesh without losing a single millisecond of execution latency.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Aetherial Capital",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verifiedBadge: "Institutional Partner",
  },
  {
    quote:
      "Building verifiable AI agents was a nightmare until we integrated Doxa. Being able to cryptographically attest that our autonomous models executed exactly as prompt-constrained is game-changing.",
    author: "Marcus Chen",
    role: "Head of Decentralized AI",
    company: "Synapse Protocol",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verifiedBadge: "Ecosystem Builder",
  },
  {
    quote:
      "The developer experience is unmatched. We migrated our entire Solidity smart contract stack over a weekend, ran the ZK-verifier test suites, and achieved 100x gas efficiency on day one.",
    author: "Sarah Lindqvist",
    role: "Lead Protocol Architect",
    company: "Nexus Liquidity",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    verifiedBadge: "Core Contributor",
  },
];

export const FAQS = [
  {
    question: "How does Doxa achieve sub-40ms finality compared to traditional blockchains?",
    answer:
      "Doxa separates optimistic parallel execution from zero-knowledge proof aggregation. Transactions are processed over low-latency QUIC edge protocols, and state transitions are folded into recursive STARKs that can be verified in microseconds by any standard validator node.",
  },
  {
    question: "Is Doxa compatible with existing EVM and Web3 tooling?",
    answer:
      "Yes. Doxa features full EVM equivalence at the bytecode level. You can use standard Ethereum tools like Hardhat, Foundry, ethers.js, viem, and MetaMask without rewriting your existing smart contracts.",
  },
  {
    question: "How are autonomous AI agents attested on the network?",
    answer:
      "Agents run inside confidential hardware enclaves (TEEs) paired with lightweight ZK-SNARK verifiers. Every inference step, tool invocation, and decision threshold generates a verifiable cryptographic trace that is validated before triggering contract actions.",
  },
  {
    question: "What compliance standards does Doxa support for enterprise clients?",
    answer:
      "Doxa supports SOC2 Type II, ISO 27001, and zero-knowledge selective disclosure proofs. This allows regulated institutions to prove KYC/AML adherence and asset solvency to auditors without exposing underlying client data.",
  },
  {
    question: "Can I deploy a dedicated private subnet or appchain?",
    answer:
      "Yes. Doxa Sovereign Subnets allow enterprise teams to spin up dedicated execution environments with custom gas tokens, permissioned validator sets, and sovereign compliance rules while inheriting global L1 security.",
  },
];

