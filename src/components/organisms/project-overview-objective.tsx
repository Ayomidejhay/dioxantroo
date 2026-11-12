"use client";

import React, { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { GradientText } from "@/components/atoms/GradientText";
import {
  ShieldCheckIcon,
  CheckIcon,
} from "@/components/atoms/Icons";
import { cn } from "@/lib/utils";
import {
  OBJECTIVE_PILLARS,
  ObjectiveKey,
  ObjectivePillar,
} from "@/lib/project-overview-objective";

export interface ProjectOverviewObjectiveProps {
  initialPillar?: ObjectiveKey;
  onVerify?: (pillarId: ObjectiveKey) => Promise<boolean>;
  simulateFailureDefault?: boolean;
  className?: string;
}

export const ProjectOverviewObjective: React.FC<ProjectOverviewObjectiveProps> = ({
  initialPillar = "performance",
  onVerify,
  simulateFailureDefault = false,
  className,
}) => {
  const [activePillarId, setActivePillarId] = useState<ObjectiveKey>(initialPillar);
  const [loadingState, setLoadingState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [simulateFailure, setSimulateFailure] = useState(simulateFailureDefault);
  const [verifiedPillars, setVerifiedPillars] = useState<Record<string, boolean>>({
    performance: true,
  });

  const activePillar: ObjectivePillar =
    OBJECTIVE_PILLARS.find((p) => p.id === activePillarId) || OBJECTIVE_PILLARS[0];

  const handleVerifyPillar = async () => {
    setLoadingState("loading");
    setErrorMessage("");

    try {
      if (onVerify) {
        const ok = await onVerify(activePillarId);
        if (!ok) throw new Error("Telemetry verification service returned a non-success status.");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (simulateFailure) {
          throw new Error("Synthetic timeout: Validator node telemetry stream unreachable.");
        }
      }

      setVerifiedPillars((prev) => ({ ...prev, [activePillarId]: true }));
      setLoadingState("success");
    } catch (err: unknown) {
      setLoadingState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to verify objective metrics."
      );
    }
  };

  const handleResetError = () => {
    setLoadingState("idle");
    setErrorMessage("");
  };

  return (
    <section
      id="project-overview"
      aria-label="Project Overview and Objectives"
      className={cn("relative py-24 border-t border-white/5 bg-slate-950/80", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <Badge variant="cyan" size="md" ping>
            <ShieldCheckIcon size={14} className="text-cyan-400" />
            <span>Architecture Pillar 01</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Project Overview &amp; <GradientText variant="cyan">Strategic Objectives</GradientText>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Doxa is envisioned as a high-performance, conversion-optimized landing page designed for
            next-generation tech/crypto or enterprise SaaS platforms. Explore and verify each architectural pillar below.
          </p>
        </div>

        {/* Pillar Switcher Navigation */}
        <div
          role="tablist"
          aria-label="Objective Pillars"
          className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-xl mb-10"
        >
          {OBJECTIVE_PILLARS.map((pillar) => {
            const isSelected = pillar.id === activePillarId;
            const isVerified = verifiedPillars[pillar.id];

            return (
              <button
                key={pillar.id}
                role="tab"
                id={`tab-${pillar.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${pillar.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  setActivePillarId(pillar.id);
                  setLoadingState("idle");
                  setErrorMessage("");
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 select-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  isSelected
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <span>{pillar.title.split("&")[0].trim()}</span>
                {isVerified && (
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                      isSelected ? "bg-slate-950 text-cyan-400" : "bg-emerald-500/20 text-emerald-400"
                    )}
                    title="Verified Metric"
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div
          role="tabpanel"
          id={`panel-${activePillar.id}`}
          aria-labelledby={`tab-${activePillar.id}`}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="cyan" size="md">
                  {activePillar.badge}
                </Badge>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                  Specification Verified
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activePillar.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activePillar.summary}
              </p>

              {/* Checklist specs */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Technical Architecture Standards:
                </h4>
                <ul className="space-y-2">
                  {activePillar.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <CheckIcon size={13} />
                      </span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Interactive State & Verification Console */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Target Benchmark
                  </span>
                  <Badge variant="emerald" size="sm">
                    {activePillar.benchmark.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5">
                    <span className="text-[11px] text-slate-400 block font-medium">Target Spec</span>
                    <span className="text-lg font-bold font-mono text-slate-200 mt-1 block">
                      {activePillar.benchmark.target}
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5">
                    <span className="text-[11px] text-slate-400 block font-medium">Achieved Score</span>
                    <span className="text-lg font-bold font-mono text-cyan-400 mt-1 block">
                      {activePillar.benchmark.actual}
                    </span>
                  </div>
                </div>

                {/* Loading / Error / Success UI States */}
                {loadingState === "error" && (
                  <div
                    role="alert"
                    className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-4 text-xs text-rose-300 space-y-2"
                  >
                    <div className="flex items-center gap-2 font-semibold text-rose-200">
                      <span>Verification Error</span>
                    </div>
                    <p>{errorMessage}</p>
                    <button
                      onClick={handleResetError}
                      className="text-xs underline text-rose-300 hover:text-white"
                    >
                      Dismiss Error
                    </button>
                  </div>
                )}

                {loadingState === "success" && (
                  <div
                    role="status"
                    className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-xs text-emerald-200 flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <CheckIcon size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Verification Confirmed</p>
                      <p className="text-emerald-300/80">
                        Pillar telemetry validated against Core Web Vitals and WCAG 2.1 AA specs.
                      </p>
                    </div>
                  </div>
                )}

                {/* Interactive Action Controls */}
                <div className="pt-2 space-y-3">
                  <Button
                    onClick={handleVerifyPillar}
                    isLoading={loadingState === "loading"}
                    variant="glow"
                    size="md"
                    className="w-full font-semibold"
                  >
                    {loadingState === "loading"
                      ? "Verifying Telemetry..."
                      : `Verify ${activePillar.title.split("&")[0].trim()}`}
                  </Button>

                  {/* Test Toggle: Simulate Failure State */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-900">
                    <label htmlFor="simulate-toggle" className="cursor-pointer select-none">
                      Simulate Verification Failure
                    </label>
                    <input
                      id="simulate-toggle"
                      type="checkbox"
                      checked={simulateFailure}
                      onChange={(e) => setSimulateFailure(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverviewObjective;
