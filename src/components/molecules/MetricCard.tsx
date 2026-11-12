import React from "react";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  value: string;
  label: string;
  description: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  description,
  change,
  trend = "up",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-500 pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          {label}
        </span>
        {change && (
          <Badge
            variant={trend === "up" ? "cyan" : "neutral"}
            size="sm"
            className="font-mono text-[11px]"
          >
            {change}
          </Badge>
        )}
      </div>

      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono group-hover:text-cyan-300 transition-colors duration-200">
        {value}
      </div>

      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

