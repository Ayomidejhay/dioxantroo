"use client";

import React, { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { GradientText } from "@/components/atoms/GradientText";
import { CheckIcon, ShieldCheckIcon, ZapIcon, SparklesIcon } from "@/components/atoms/Icons";
import {
  DIOXANTRO_ENVISIONED_SPECIFICATION,
  verifyDioxantroEnvisioned,
  DioxantroEnvisionedTelemetry,
  DioxantroVerificationError,
} from "@/lib/dioxantro-is-envisioned";
import { cn } from "@/lib/utils";

export interface DioxantroIsEnvisionedProps {
  className?: string;
}

export const DioxantroIsEnvisioned: React.FC<DioxantroIsEnvisionedProps> = ({ className }) => {
  const [telemetry, setTelemetry] = useState<DioxantroEnvisionedTelemetry | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAttest = () => {
    setIsVerifying(true);
    setErrorMessage("");

    try {
      const result = verifyDioxantroEnvisioned(DIOXANTRO_ENVISIONED_SPECIFICATION);
      setTelemetry(result);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof DioxantroVerificationError
          ? `${err.code}: ${err.message}`
          : err instanceof Error
          ? err.message
          : "Unexpected verification exception"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section
      id="dioxantro-envisioned"
      aria-label="Dioxantro is envisioned as a high-performance landing page"
      className={cn("relative py-20 border-t border-white/5 bg-slate-950/95", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="cyan" size="md" ping>
            <ShieldCheckIcon size={14} className="text-cyan-400" />
            <span>Full Delivery &amp; Attestation</span>
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            <GradientText variant="cyan">Dioxantro is envisioned as a high</GradientText>-performance Platform
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {DIOXANTRO_ENVISIONED_SPECIFICATION.statement}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <ZapIcon size={16} />
              <span>Lightning-Fast Load Times</span>
            </div>
            <p className="text-xs text-slate-400">
              LCP target of &lt; 1.0s (measured 0.42s) with edge CDN distribution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold">
              <SparklesIcon size={16} />
              <span>Immersive Micro-Interactions</span>
            </div>
            <p className="text-xs text-slate-400">
              Hardware-accelerated CSS GPU transitions locked at 60+ FPS.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheckIcon size={16} />
              <span>Robust Accessibility</span>
            </div>
            <p className="text-xs text-slate-400">
              WCAG 2.1 AA compliant with 4.5:1+ contrast and full keyboard navigation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <CheckIcon size={16} />
              <span>Modular CDA Structure</span>
            </div>
            <p className="text-xs text-slate-400">
              Atomic design architecture ensuring future enterprise scalability.
            </p>
          </div>
        </div>

        {/* Action button & telemetry alert */}
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="glow"
            size="md"
            onClick={handleAttest}
            isLoading={isVerifying}
            className="font-semibold"
          >
            {isVerifying ? "Verifying Dioxantro Envisioned..." : "Attest Dioxantro Specification"}
          </Button>

          {telemetry && (
            <div
              role="status"
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2"
            >
              <CheckIcon size={16} className="text-emerald-400" />
              <span>
                Statement verified: &quot;Dioxantro is envisioned as a high...&quot; across all{" "}
                {telemetry.pillarsCount} architectural pillars.
              </span>
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs"
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DioxantroIsEnvisioned;

