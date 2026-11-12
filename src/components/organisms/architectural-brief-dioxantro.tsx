"use client";

import React, { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { GradientText } from "@/components/atoms/GradientText";
import { CheckIcon, SparklesIcon } from "@/components/atoms/Icons";
import {
  ARCHITECTURAL_BRIEF_DIOXANTRO,
  ArchitecturalBriefDioxantroConfig,
  executeDioxantroBriefAttestation,
  BriefResult,
  ArchitecturalBriefDioxantroError,
} from "@/lib/architectural-brief-dioxantro";
import { cn } from "@/lib/utils";

export interface ArchitecturalBriefDioxantroProps {
  initialConfig?: ArchitecturalBriefDioxantroConfig;
  className?: string;
}

export const ArchitecturalBriefDioxantro: React.FC<ArchitecturalBriefDioxantroProps> = ({
  initialConfig = ARCHITECTURAL_BRIEF_DIOXANTRO,
  className,
}) => {
  const [config] = useState<ArchitecturalBriefDioxantroConfig>(initialConfig);
  const [result, setResult] = useState<
    BriefResult<{ attestedAt: string; deliverablesVerified: number }, ArchitecturalBriefDioxantroError> | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAttest = async () => {
    setIsLoading(true);
    try {
      const res = await executeDioxantroBriefAttestation(config);
      setResult(res);
    } catch (err: unknown) {
      setResult({
        success: false,
        error: new ArchitecturalBriefDioxantroError(
          err instanceof Error ? err.message : "Pipeline attestation failure",
          "UNEXPECTED_ERROR"
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="architectural-brief-dioxantro"
      aria-label="Architectural Brief: Dioxantro Landing Page"
      className={cn("relative py-20 border-t border-white/5 bg-slate-950/90", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="cyan" size="md" ping>
            <SparklesIcon size={14} className="text-cyan-400" />
            <span>Strict Architectural Specification</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Architectural Brief: <GradientText variant="cyan">Dioxantro Landing Page</GradientText>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {config.projectOverview.objective}
          </p>
        </div>

        {/* 3 Core Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {config.deliverables.map((d) => (
            <div
              key={d.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="sm">
                    Deliverable 0{d.id}
                  </Badge>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {d.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{d.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{d.description}</p>
                <ul className="space-y-1.5 pt-2 border-t border-white/5">
                  {d.keySpecs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckIcon size={14} className="text-cyan-400 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Action button & telemetry alert */}
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="glow"
            size="md"
            onClick={handleAttest}
            isLoading={isLoading}
            className="font-semibold"
          >
            {isLoading ? "Attesting Brief..." : "Verify Architectural Brief: Dioxantro"}
          </Button>

          {result && (
            <div
              role={result.success ? "status" : "alert"}
              className={cn(
                "p-4 rounded-xl border text-xs max-w-lg w-full",
                result.success
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              )}
            >
              {result.success ? (
                <div className="flex items-center gap-2">
                  <CheckIcon size={16} className="text-emerald-400 shrink-0" />
                  <span>
                    All {result.data.deliverablesVerified} deliverables &amp; Core Web Vitals targets verified!
                  </span>
                </div>
              ) : (
                <div>
                  <strong>Attestation Error:</strong> {result.error.message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalBriefDioxantro;

