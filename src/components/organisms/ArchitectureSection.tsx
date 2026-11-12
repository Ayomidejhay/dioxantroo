"use client";

import React, { useState } from "react";
import { ARCHITECTURE_STEPS } from "@/lib/constants";
import { ArchitectureStep } from "@/components/molecules/ArchitectureStep";
import { CodeWindow } from "@/components/molecules/CodeWindow";
import { Badge } from "@/components/atoms/Badge";
import { GradientText } from "@/components/atoms/GradientText";
import { ZapIcon, CheckIcon } from "@/components/atoms/Icons";

export const ArchitectureSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = ARCHITECTURE_STEPS[activeStepIndex];

  return (
    <section id="architecture" className="relative py-28 border-t border-white/5 bg-slate-950/70">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="violet" size="md">
            <ZapIcon size={14} className="text-violet-400" />
            <span>Interactive Protocol Flow</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            How Doxa Executes in <GradientText variant="purple">Under 40 Milliseconds</GradientText>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Follow the lifecycle of an intent from QUIC ingestion at the edge through recursive ZK proof folding to global consensus finality.
          </p>
        </div>

        {/* Step Selector & Live Code Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps list (Left) */}
          <div className="lg:col-span-5 space-y-4">
            {ARCHITECTURE_STEPS.map((step, idx) => (
              <ArchitectureStep
                key={step.step}
                step={step.step}
                phase={step.phase}
                title={step.title}
                description={step.description}
                isActive={idx === activeStepIndex}
                onClick={() => setActiveStepIndex(idx)}
              />
            ))}
          </div>

          {/* Interactive Code Preview (Right) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  Active Phase: <strong className="text-white">{currentStep.phase}</strong>
                </span>
                <span className="font-mono text-cyan-400">Step {activeStepIndex + 1} of 4</span>
              </div>

              <CodeWindow
                filename={`doxa-${currentStep.phase.toLowerCase().replace(/\s+/g, "-")}.ts`}
                code={currentStep.codeSnippet}
              />

              {/* Highlights below the code window */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl bg-slate-900/60 border border-white/5 p-3 flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckIcon size={16} className="text-emerald-400 shrink-0" />
                  <span>Hardware verified through AVX-512 &amp; CUDA</span>
                </div>
                <div className="rounded-xl bg-slate-900/60 border border-white/5 p-3 flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckIcon size={16} className="text-cyan-400 shrink-0" />
                  <span>Deterministic gasless witness validation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

