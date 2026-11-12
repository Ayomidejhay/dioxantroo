import React from "react";
import { METRICS } from "@/lib/constants";
import { MetricCard } from "@/components/molecules/MetricCard";

export const MetricsBar: React.FC = () => {
  return (
    <section id="metrics" className="relative py-12 border-y border-white/5 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric) => (
            <MetricCard
              key={metric.id}
              value={metric.value}
              label={metric.label}
              description={metric.description}
              change={metric.change}
              trend={metric.trend as "up" | "neutral"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

