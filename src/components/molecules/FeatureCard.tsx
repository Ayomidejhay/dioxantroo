import React from "react";
import { Badge } from "@/components/atoms/Badge";
import { IconResolver } from "@/components/atoms/Icons";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  borderHighlight: string;
  metricsHighlight?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  badge,
  title,
  description,
  icon,
  borderHighlight,
  metricsHighlight,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-slate-900/80",
        borderHighlight,
        className
      )}
    >
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 transition-all duration-300">
            <IconResolver name={icon} size={22} />
          </div>
          <Badge variant="cyan" size="sm">
            {badge}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-cyan-200 transition-colors duration-200">
          {title}
        </h3>

        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {metricsHighlight && (
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-cyan-400 font-medium">
            {metricsHighlight}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-slate-500">
            Validated
          </span>
        </div>
      )}
    </div>
  );
};

