"use client";

import React from "react";
import { GradientText } from "@/components/atoms/GradientText";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ArrowRightIcon, TerminalIcon, SparklesIcon } from "@/components/atoms/Icons";
import { WaitlistForm } from "@/components/molecules/WaitlistForm";

export const CtaSection: React.FC = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background aurora lights */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-violet-600/20 to-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Inner ambient shine */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <Badge variant="cyan" size="md" ping>
              <SparklesIcon size={14} className="text-cyan-400" />
              <span>Mainnet Alpha Cohort 04 Open</span>
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Build on the <br />
              <GradientText variant="cyan">Fastest ZK Mesh</GradientText> in Web3?
            </h2>

            <p className="text-base sm:text-lg text-slate-300">
              Join over 250+ protocols, quantitative trading desks, and AI development labs already deployed on Doxa.
            </p>

            {/* Waitlist Form */}
            <div className="pt-4 flex justify-center">
              <WaitlistForm buttonText="Get Started Now" />
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <a
                href="#docs"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors underline underline-offset-4"
              >
                <TerminalIcon size={14} className="text-cyan-400" />
                <span>Read API Reference &amp; Quickstart</span>
              </a>
              <span className="text-slate-600">•</span>
              <span>Zero setup fees</span>
              <span className="text-slate-600">•</span>
              <span>Dedicated Enterprise Slack support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

