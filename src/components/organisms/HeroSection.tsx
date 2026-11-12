"use client";

import React from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { GradientText } from "@/components/atoms/GradientText";
import { ArrowRightIcon, TerminalIcon, ZapIcon, SparklesIcon, ShieldCheckIcon } from "@/components/atoms/Icons";
import { WaitlistForm } from "@/components/molecules/WaitlistForm";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-cyan-500/20 via-violet-600/15 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-10 -left-20 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 -right-20 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 mesh-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Subheadline, CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="cyan" size="md" ping className="px-3.5 py-1.5 shadow-lg shadow-cyan-500/10">
                <SparklesIcon size={14} className="text-cyan-400" />
                <span>Next-Gen Deterministic Execution Mesh</span>
              </Badge>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              The Hyper-Scale <br />
              <GradientText variant="cyan">ZK Consensus</GradientText> &amp; <br />
              Agent Cloud.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Engineered for institutional finance and autonomous AI agents. 
              Sub-40ms deterministic block finality with hardware-accelerated recursive zero-knowledge state transitions.
            </p>

            {/* Waitlist / Early Access Form */}
            <div id="waitlist" className="pt-2 flex justify-center lg:justify-start">
              <WaitlistForm
                buttonText="Request Mainnet Access"
                placeholder="developer@enterprise.com"
              />
            </div>

            {/* Trust markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon size={16} className="text-emerald-400" />
                <span>SOC2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ZapIcon size={16} className="text-cyan-400" />
                <span>&lt; 38ms Finality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Full EVM &amp; Rust Interop</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Holographic Terminal / Node Widget */}
          <div className="lg:col-span-5 relative">
            {/* Glow Aura */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 to-violet-600/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

            <div className="relative rounded-2xl bg-slate-950/90 border border-white/10 p-5 shadow-2xl backdrop-blur-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    doxa-node-daemon :: v2.4.0
                  </span>
                </div>
                <Badge variant="emerald" size="sm" ping>
                  Synced
                </Badge>
              </div>

              {/* Real-time Telemetry Stats inside widget */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                    Current Block Latency
                  </span>
                  <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                    36.4 ms
                  </div>
                  <span className="text-[10px] text-emerald-400">● 0 drops / 100k tx</span>
                </div>

                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                    Active Prover Circuits
                  </span>
                  <div className="text-xl font-bold font-mono text-violet-300 mt-1">
                    1,024 Cores
                  </div>
                  <span className="text-[10px] text-cyan-400">● Halo2 GPU Cluster</span>
                </div>
              </div>

              {/* Live Simulated Console logs */}
              <div className="rounded-xl bg-slate-900/90 p-3.5 font-mono text-[11px] text-slate-300 space-y-1.5 border border-slate-800/80">
                <div className="flex items-center justify-between text-slate-500 text-[10px]">
                  <span>EVENT STREAM</span>
                  <span className="text-cyan-400">QUIC ACTIVE</span>
                </div>
                <p className="text-emerald-400/90">
                  <span className="text-slate-500">[12:26:01]</span> ✓ Batch #8,941,200 committed
                </p>
                <p className="text-cyan-300">
                  <span className="text-slate-500">[12:26:02]</span> ⚡ STARK folded into 48-byte SNARK
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-500">[12:26:02]</span> 🤖 AI Agent #4092 attested (TEE-ZK)
                </p>
                <p className="text-purple-300">
                  <span className="text-slate-500">[12:26:03]</span> 🔒 MPC validator threshold 64/64 signed
                </p>
                <p className="text-emerald-400">
                  <span className="text-slate-500">[12:26:03]</span> ✦ Finality achieved in 37.1ms
                </p>
              </div>

              {/* Bottom Quick Test Run */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <TerminalIcon size={14} className="text-cyan-400" />
                  <span className="font-mono text-[11px]">curl -s https://rpc.doxa.network</span>
                </div>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                  200 OK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

