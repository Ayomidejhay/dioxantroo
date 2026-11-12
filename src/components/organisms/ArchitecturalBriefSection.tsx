"use client";

import React, { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { GradientText } from "@/components/atoms/GradientText";
import { CheckIcon, ShieldCheckIcon, ZapIcon, SparklesIcon } from "@/components/atoms/Icons";
import {
  DIOXANTRO_ARCHITECTURAL_BRIEF,
  DioxantroBriefConfig,
  executeBriefVerification,
  Result,
  ArchitecturalBriefError,
} from "@/lib/architecturalBrief";
import { cn } from "@/lib/utils";

export interface ArchitecturalBriefSectionProps {
  initialConfig?: DioxantroBriefConfig;
  className?: string;
}

export const ArchitecturalBriefSection: React.FC<ArchitecturalBriefSectionProps> = ({
  initialConfig = DIOXANTRO_ARCHITECTURAL_BRIEF,
  className,
}) => {
  const [config] = useState<DioxantroBriefConfig>(initialConfig);
  const [verificationResult, setVerificationResult] = useState<
    Result<{ verifiedAt: string; deliverablesCount: number }, ArchitecturalBriefError> | null
  >(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleRunVerification = async () => {
    setIsVerifying(true);
    try {
      const result = await executeBriefVerification(config);
      setVerificationResult(result);
    } catch (err: unknown) {
      setVerificationResult({
        success: false,
        error: new ArchitecturalBriefError(
          err instanceof Error ? err.message : "Unexpected pipeline exception",
          "UNEXPECTED_ERROR"
        ),
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section
      id="architectural-brief"
      aria-label="Architectural Brief: Dioxantro Landing Page"
      className={cn("relative py-20 border-t border-white/5 bg-slate-950/90", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <Badge variant="cyan" size="md" ping>
            <SparklesIcon size={14} className="text-cyan-400" />
            <span>Strict Architectural Brief Implementation</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Architectural Brief: <GradientText variant="cyan">Dioxantro Landing Page</GradientText>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {config.projectOverview.objective}
          </p>
        </div>

        {/* 3 Core Deliverables Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {config.deliverables.map((deliverable) => (
            <div
              key={deliverable.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm">
                    Deliverable 0{deliverable.id}
                  </Badge>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {deliverable.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {deliverable.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {deliverable.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-white/5">
                  {deliverable.keySpecs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckIcon size={14} className="text-cyan-400 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack & Verification Console */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Tech Stack Specs */}
            <div className="md:col-span-8 space-y-4">
              <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-400">
                Validated Technology Stack &amp; Edge Targets:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase">Framework</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {config.technologyStack.framework}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase">Styling</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {config.technologyStack.styling}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase">Animations</span>
                  <span className="font-semibold text-white mt-0.5 block">
                    {config.technologyStack.animations}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase">LCP Benchmark</span>
                  <span className="font-semibold text-cyan-400 mt-0.5 block">
                    {config.pillars.performanceAndCoreWebVitals.targetLCP}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification trigger */}
            <div className="md:col-span-4 space-y-3">
              <Button
                variant="glow"
                size="md"
                onClick={handleRunVerification}
                isLoading={isVerifying}
                className="w-full"
              >
                {isVerifying ? "Attesting Brief..." : "Verify Architectural Brief"}
              </Button>

              {verificationResult && (
                <div
                  role={verificationResult.success ? "status" : "alert"}
                  className={cn(
                    "p-3 rounded-xl text-xs border",
                    verificationResult.success
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                  )}
                >
                  {verificationResult.success ? (
                    <div className="flex items-center gap-2">
                      <CheckIcon size={14} className="text-emerald-400 shrink-0" />
                      <span>
                        All {verificationResult.data.deliverablesCount} deliverables &amp; CWV budgets verified!
                      </span>
                    </div>
                  ) : (
                    <div>
                      <strong>Brief Violation:</strong> {verificationResult.error.message}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
