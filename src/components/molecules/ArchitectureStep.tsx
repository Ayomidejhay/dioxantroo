import React from "react";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";

export interface ArchitectureStepProps {
  step: string;
  phase: string;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const ArchitectureStep: React.FC<ArchitectureStepProps> = ({
  step,
  phase,
  title,
  description,
  isActive,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "group cursor-pointer rounded-2xl p-6 transition-all duration-300 border text-left",
        isActive
          ? "bg-slate-900/90 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30"
          : "bg-slate-950/40 border-white/5 hover:bg-slate-900/50 hover:border-slate-700",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span
          className={cn(
            "font-mono text-sm font-bold transition-colors",
            isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-400"
          )}
        >
          {step}
        </span>
        <Badge variant={isActive ? "cyan" : "neutral"} size="sm">
          {phase}
        </Badge>
      </div>

      <h4
        className={cn(
          "text-lg font-semibold tracking-tight transition-colors",
          isActive ? "text-white" : "text-slate-300 group-hover:text-white"
        )}
      >
        {title}
      </h4>

      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

